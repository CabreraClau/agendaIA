import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// Exercise the real application handlers without a browser or dependencies.
// The minimal DOM only supplies APIs needed by these state and rendering checks.
const source = readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');
const storageKey = 'agendaia-demo-v1';

function boot({ stored = null, failSave = false } = {}) {
  const listeners = new Map();
  const elements = new Map();
  const storage = new Map();
  if (stored !== null) storage.set(storageKey, stored);

  function element(id) {
    if (!elements.has(id)) {
      elements.set(id, {
        innerHTML: '', textContent: '', hidden: false,
        addEventListener() {}, setAttribute() {}, close() {}, showModal() {}
      });
    }
    return elements.get(id);
  }

  const context = vm.createContext({
    document: {
      getElementById: element,
      addEventListener(type, handler) { listeners.set(type, handler); }
    },
    localStorage: {
      getItem(key) { return storage.get(key) ?? null; },
      setItem(key, value) {
        if (failSave) throw new Error('Storage blocked for this test');
        storage.set(key, value);
      }
    },
    window: { scrollTo() {} },
    FormData: class {
      constructor(form) { this.values = form.values; }
      get(key) { return this.values[key] ?? null; }
      has(key) { return Object.hasOwn(this.values, key); }
    },
    setTimeout: () => 0,
    clearTimeout() {},
    Intl, Date, Math, Blob, URL
  });

  vm.runInContext(`${source}\n;globalThis.smoke = {
    selectedCase: () => selectedCase(),
    state: () => db,
    client: () => renderClient(),
    review: () => renderReview(selectedCase()),
    render: () => render(),
    ui: () => ui
  };`, context);

  function submit(formId, values) {
    listeners.get('submit')({
      preventDefault() {},
      target: {
        // A hidden input named "id" masks HTMLFormElement.id in the browser.
        id: { tagName: 'INPUT' },
        getAttribute(name) { return name === 'id' ? formId : null; },
        closest() { return element('action-dialog'); },
        values
      }
    });
  }

  return { app: context.smoke, element, storage, submit };
}

const test = boot();
const caseData = test.app.selectedCase();
const eventFields = {
  type: 'Solicitud de conciliación', date: '2026-10-08',
  detail: 'Nuevo hito ficticio para la prueba.',
  document: 'Segundo comprobante de solicitud',
  createControl: 'on', shared: 'on'
};

// Rejected submissions must not create an event or document before validation.
const beforeInvalidEvent = JSON.stringify(caseData);
test.submit('event-form', { ...eventFields, controlTitle: '' });
assert.equal(JSON.stringify(caseData), beforeInvalidEvent, 'Invalid event mutated the case');
assert.match(test.element('form-error').textContent, /nombre del control interno/);

// A repeated event type must retain its own source event and backing document.
test.submit('event-form', {
  ...eventFields, controlTitle: 'Control del segundo hito',
  clientTask: 'on', taskTitle: 'Aportar contrato de ejemplo'
});
const control = caseData.controls.at(-1);
const event = caseData.events.at(-1);
const task = caseData.tasks.at(-1);
assert.equal(control.originEventId, event.id);
assert.equal(control.documentId, event.documentId);
assert.equal(caseData.documents.find(d => d.id === control.documentId).title, eventFields.document);
assert.equal(task.controlId, control.id);
assert.equal(task.date, control.date);
const newReview = test.app.review().slice(test.app.review().indexOf(control.title));
assert.ok(newReview.includes(eventFields.document), 'Control shows the wrong source document');

// Reviewing must work even when form.id is masked, and update the client date.
test.submit('review-form', {
  id: control.id, date: '2026-10-16', reviewer: 'Dra. Demo',
  justification: 'Antecedentes revisados para organizar la actuación.',
  acknowledge: 'on'
});
assert.equal(control.status, 'validated');
assert.equal(control.date, '2026-10-16');
assert.equal(task.date, control.date);
assert.equal(control.history.at(-1).status, 'pending');
assert.ok(test.app.client().includes('16 de octubre'));
assert.ok(test.app.review().includes(control.justification));

// Editing preserves the preceding review and makes the new date provisional.
test.submit('control-form', {
  id: control.id, title: control.title, start: '2026-10-09',
  days: '3', mode: 'calendar', exclusions: '',
  assumptions: 'Replanificación ficticia para la prueba.'
});
assert.equal(control.status, 'pending');
assert.equal(control.reviewer, '');
assert.equal(control.history.at(-1).reviewer, 'Dra. Demo');
assert.equal(control.history.at(-1).justification, 'Antecedentes revisados para organizar la actuación.');
assert.equal(control.originEventId, event.id);
assert.equal(event.date, '2026-10-08', 'Editing planning altered the original event');
assert.equal(task.date, control.date);
assert.ok(test.app.client().includes('pendiente de confirmación'));

// Saved source relationships and history survive a new application session.
const reloaded = boot({ stored: test.storage.get(storageKey) });
const reloadedControl = reloaded.app.selectedCase().controls.at(-1);
assert.equal(reloadedControl.originEventId, event.id);
assert.equal(reloadedControl.documentId, control.documentId);
assert.equal(reloadedControl.history.length, control.history.length);
assert.equal(reloaded.app.selectedCase().tasks.at(-1).date, control.date);

// The client sees the next shared hearing and has no whole-study export button.
caseData.events.unshift(
  { id: 'private-hearing', type: 'Audiencia de conciliación', date: '2026-10-09', time: '15:41', detail: 'Interno', document: 'Interno', shared: false },
  { id: 'past-hearing', type: 'Audiencia de conciliación', date: '2026-10-01', time: '15:42', detail: 'Pasado', document: 'Pasado', shared: true }
);
const clientHtml = test.app.client();
assert.ok(!clientHtml.includes('15:41'), 'Private hearing leaked into the client view');
assert.ok(!clientHtml.includes('15:42'), 'Past hearing was shown as the next hearing');
assert.ok(clientHtml.includes('10:30'));
test.app.ui().role = 'client';
test.app.render();
assert.ok(!test.element('app').innerHTML.includes('data-action="export"'));

// Corrupt stored data falls back to the demo; blocked writes retain a warning.
const corrupt = boot({ stored: '{"version":1,"cases":[{}]}' });
assert.equal(corrupt.app.state().cases.length, 3);
const blocked = boot({ failSave: true });
blocked.submit('review-form', {
  id: 'p1', date: '2026-10-14', reviewer: 'Dra. Demo',
  justification: 'Revisión ficticia de prueba.', acknowledge: 'on'
});
assert.equal(blocked.app.selectedCase().controls[0].status, 'validated');
assert.match(blocked.element('toast').textContent, /solo esta sesión/);

console.log('PASS: atomicidad, referencias de origen, revisión, historia, fechas del cliente, persistencia y vista compartida.');
