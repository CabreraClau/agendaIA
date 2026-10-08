/* AgendaIA — a browser-local demonstration. No AI/API calls or legal deadline engine. */
'use strict';

const STORAGE_KEY = 'agendaia-demo-v1';
const DEMO_TODAY = '2026-10-08';
const LAW = {
  laboral: { label: 'Ley Nº 18.572 · proceso laboral', url: 'https://www.impo.com.uy/bases/leyes/18572-2009' },
  civil: { label: 'Código General del Proceso · Ley Nº 15.982', url: 'https://www.impo.com.uy/bases/codigo-general-proceso/15982-1988' }
};
const SEED = {
  version: 1,
  cases: [
    { id: 'lab-001', number: 'LAB · 2026 / 014', title: 'Méndez c/ Sur Logística', client: 'Lucía Méndez', matter: 'laboral', phase: 'Conciliación previa', office: 'MTSS · instancia de conciliación', responsible: 'Dra. Valentina Ríos', initials: 'LM', color: 'mint', notes: 'Nota interna de ejemplo: contrastar recibos y períodos reclamados. No compartir esta nota con la cliente.',
      events: [
        { id: 'e1', type: 'Entrevista inicial', date: '2026-10-02', time: '', detail: 'Relevamiento del reclamo y solicitud de antecedentes.', document: 'Resumen de entrevista', shared: false },
        { id: 'e2', documentId: 'd1', type: 'Solicitud de conciliación', date: '2026-10-06', time: '', detail: 'Solicitud presentada. El comprobante se conserva como respaldo.', document: 'Comprobante de solicitud', shared: true },
        { id: 'e3', type: 'Audiencia de conciliación', date: '2026-10-19', time: '10:30', detail: 'Audiencia agendada. Acta y eventual constancia se registrarán por separado.', document: 'Citación de audiencia', shared: true }
      ],
      controls: [{ id: 'p1', originEventId: 'e2', documentId: 'd1', title: 'Revisar documentación para la audiencia', origin: 'Solicitud de conciliación', start: '2026-10-06', days: 5, mode: 'work', exclusions: [], date: '2026-10-13', status: 'pending', rule: 'Planificación interna · 5 días de trabajo', version: 'Plantilla interna v1', assumptions: 'Ejemplo de organización del estudio. No determina un plazo para demandar ni una prescripción.', reviewer: '', reviewedAt: '', justification: '', previousDates: [], history: [] }],
      documents: [
        { id: 'd1', title: 'Comprobante de solicitud', kind: 'Comprobante · ejemplo', received: true, shared: true, content: 'Documento ficticio. Solicitud de conciliación registrada el 6 de octubre de 2026. Se utiliza exclusivamente para recorrer la demo.' },
        { id: 'd2', title: 'Recibos de sueldo', kind: 'Documentación de la cliente', received: false, shared: true, content: '' },
        { id: 'd3', title: 'Citación de audiencia', kind: 'Citación · ejemplo', received: true, shared: true, content: 'Citación ficticia. Audiencia de conciliación: 19 de octubre de 2026 a las 10:30. Lugar: oficina de ejemplo del MTSS. Esta citación no corresponde a un trámite real.' },
        { id: 'd4', title: 'Liquidación preliminar', kind: 'Trabajo interno del estudio', received: true, shared: false, content: 'Documento interno ficticio. Pendiente de revisión por la profesional responsable.' }
      ],
      tasks: [{ id: 't1', title: 'Aportar los últimos seis recibos de sueldo', why: 'Nos ayudan a preparar la documentación para tu audiencia.', date: '2026-10-13', status: 'pending', docId: 'd2', shared: true, controlId: 'p1' }],
      activity: [{ text: 'Solicitud y citación incorporadas al expediente.', date: '2026-10-06T14:20:00-03:00' }]
    },
    { id: 'civ-002', number: 'CIV · 2026 / 008', title: 'Pereira c/ Costa Servicios', client: 'Martín Pereira', matter: 'civil', phase: 'Preparación de actuación', office: 'Juzgado Letrado Civil · ejemplo', responsible: 'Dra. Valentina Ríos', initials: 'MP', color: 'blue', notes: 'Nota interna ficticia: revisar el alcance de la documentación aportada.',
      events: [{ id: 'e4', documentId: 'd5', type: 'Notificación', date: '2026-10-05', time: '', detail: 'Notificación de ejemplo registrada con su documento de respaldo.', document: 'Notificación de ejemplo', shared: true }],
      controls: [{ id: 'p2', originEventId: 'e4', documentId: 'd5', title: 'Reunir antecedentes de la actuación', origin: 'Notificación', start: '2026-10-05', days: 7, mode: 'calendar', exclusions: [], date: '2026-10-12', status: 'validated', rule: 'Planificación interna · 7 días corridos', version: 'Plantilla interna v1', assumptions: 'Fecha de organización interna. La vía y cualquier plazo procesal deben ser definidos por la profesional.', reviewer: 'Dra. Valentina Ríos', reviewedAt: '2026-10-07T11:15:00-03:00', justification: 'Control interno confirmado para organizar los antecedentes.', previousDates: [], history: [] }],
      documents: [{ id: 'd5', title: 'Notificación de ejemplo', kind: 'Actuación · ejemplo', received: true, shared: true, content: 'Notificación ficticia de fecha 5 de octubre de 2026. No se representa una resolución ni un expediente real.' }, { id: 'd6', title: 'Contrato y comprobantes', kind: 'Documentación del cliente', received: false, shared: true, content: '' }],
      tasks: [{ id: 't2', title: 'Aportar contrato y comprobantes', why: 'Necesitamos los antecedentes para revisar la próxima actuación.', date: '2026-10-12', status: 'pending', docId: 'd6', shared: true, controlId: 'p2' }],
      activity: [{ text: 'Control interno validado por Dra. Valentina Ríos.', date: '2026-10-07T11:15:00-03:00' }]
    },
    { id: 'lab-003', number: 'LAB · 2026 / 017', title: 'Silva c/ Taller del Este', client: 'Camila Silva', matter: 'laboral', phase: 'Relevamiento inicial', office: 'Instancia por definir', responsible: 'Dra. Valentina Ríos', initials: 'CS', color: 'sand', notes: 'Falta comprobar el hito de inicio antes de proponer una fecha.', events: [], controls: [], documents: [{ id: 'd7', title: 'Antecedentes del vínculo laboral', kind: 'Documentación de la cliente', received: false, shared: true, content: '' }], tasks: [], activity: [{ text: 'Expediente creado; fecha del hito pendiente.', date: '2026-10-08T09:00:00-03:00' }] }
  ]
};

const icons = {
  home: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  folder: '<path d="M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/><path d="M3 8h18"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2M8 18h2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
  back: '<path d="M19 12H5m5-5-5 5 5 5"/>',
  check: '<path d="m5 12 4 4 10-10"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  download: '<path d="M12 3v12m-4-4 4 4 4-4M5 17v4h14v-4"/>',
  edit: '<path d="m16 3 5 5L9 20l-6 1 1-6L16 3ZM14 5l5 5"/>',
  external: '<path d="M15 3h6v6M10 14 21 3M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v3"/>',
  play: '<path d="m8 4 13 8-13 8V4Z"/>',
  reset: '<path d="M3 10a9 9 0 1 1 1 7M3 4v6h6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.file}</svg>`;
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const clone = value => JSON.parse(JSON.stringify(value));
function validCase(c) {
  if (!c || !['id', 'title', 'client', 'number', 'responsible', 'initials', 'phase', 'office', 'notes'].every(k => typeof c[k] === 'string') || !['laboral', 'civil'].includes(c.matter)) return false;
  if (!['events', 'controls', 'documents', 'tasks', 'activity'].every(k => Array.isArray(c[k]))) return false;
  return c.events.every(e => e && ['id', 'type', 'document', 'detail'].every(k => typeof e[k] === 'string') && parseDate(e.date))
    && c.controls.every(p => p && ['id', 'title', 'origin', 'version', 'assumptions', 'reviewer', 'justification'].every(k => typeof p[k] === 'string') && ['pending', 'validated'].includes(p.status) && parseDate(p.start) && parseDate(p.date) && Number.isInteger(p.days) && p.days > 0 && p.days <= 365 && ['work', 'calendar'].includes(p.mode) && Array.isArray(p.exclusions) && p.exclusions.every(parseDate) && Array.isArray(p.previousDates) && (p.status !== 'validated' || Number.isFinite(Date.parse(p.reviewedAt))))
    && c.documents.every(d => d && ['id', 'title', 'kind', 'content'].every(k => typeof d[k] === 'string') && typeof d.received === 'boolean' && typeof d.shared === 'boolean')
    && c.tasks.every(t => t && ['id', 'title', 'why', 'docId', 'controlId'].every(k => typeof t[k] === 'string') && parseDate(t.date) && ['pending', 'done'].includes(t.status))
    && c.activity.every(a => a && typeof a.text === 'string' && Number.isFinite(Date.parse(a.date)));
}
function loadState() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const valid = value?.version === 1 && Array.isArray(value.cases) && value.cases.length && value.cases.every(validCase);
    if (valid) return value;
  } catch (_) { /* A blocked or stale browser store does not prevent the demo. */ }
  return clone(SEED);
}
let db = loadState();
let ui = { page: 'overview', caseId: 'lab-001', role: 'study', tab: 'overview', filter: 'all', query: '', tour: -1 };
let toastTimer;
const $app = document.getElementById('app');
const $dialog = document.getElementById('action-dialog');
function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(db)); return true; } catch (_) { return false; } }
function savedToast(saved, message) { toast(saved ? message : `${message} El navegador bloquea el almacenamiento; los cambios duran solo esta sesión.`); }
function toast(message) { const el = document.getElementById('toast'); el.textContent = message; el.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.hidden = true; }, 4800); }
function uid(prefix) { return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`; }
function parseDate(value) { const d = new Date(`${value}T12:00:00Z`); return Number.isFinite(d.getTime()) && d.toISOString().slice(0, 10) === value ? d : null; }
function fmt(value, long = false) { const d = parseDate(String(value).slice(0, 10)); return d ? new Intl.DateTimeFormat('es-UY', { day: 'numeric', month: long ? 'long' : 'short', timeZone: 'UTC' }).format(d) : 'Por definir'; }
function prettyTime(value) { return new Intl.DateTimeFormat('es-UY', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'America/Montevideo' }).format(new Date(value)); }
function addDays(start, days, mode = 'work', exclusions = []) {
  const d = parseDate(start);
  if (!d || !Number.isInteger(days) || days < 1 || days > 365) throw new Error('Indicá una fecha válida y entre 1 y 365 días.');
  let added = 0; const excluded = [];
  while (added < days) {
    d.setUTCDate(d.getUTCDate() + 1);
    const date = d.toISOString().slice(0, 10);
    if ((mode === 'work' && [0, 6].includes(d.getUTCDay())) || exclusions.includes(date)) excluded.push(date);
    else added++;
  }
  return { date: d.toISOString().slice(0, 10), excluded };
}
function selectedCase() { return db.cases.find(c => c.id === ui.caseId) || db.cases[0]; }
function stateOf(c) { return !c.events.length || !c.controls.length ? 'incomplete' : c.controls.some(p => p.status === 'pending') ? 'pending' : 'validated'; }
function badge(status) { return `<span class="badge ${status}">${{ pending: 'Pendiente de revisión', validated: 'Revisado por el estudio', incomplete: 'Faltan datos', draft: 'Control interno' }[status] || esc(status)}</span>`; }
function avatar(c) { return `<span class="avatar ${c.color}">${esc(c.initials)}</span>`; }
function btn(label, action, css = 'secondary', i = '', extra = '') { return `<button class="button ${css}" data-action="${action}" ${extra}>${i ? icon(i) : ''}${label}</button>`; }
function heading(eyebrow, title, subtitle, actions = '') { return `<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1 class="page-title">${title}</h1><p class="page-subtitle">${subtitle}</p></div><div class="heading-actions">${actions}</div></div>`; }
function activity(c, text) { c.activity.unshift({ text, date: new Date().toISOString() }); }
function snapshotControl(p, reason) { const { history, previousDates, ...snapshot } = p; p.history ||= []; p.history.push({ ...clone(snapshot), reason, changedAt: new Date().toISOString() }); }
function originFor(c, p) { return c.events.find(e => e.id === p.originEventId) || c.events.find(e => e.type === p.origin && e.date === p.start); }
function nextHearing(c, sharedOnly = false) { return [...c.events].filter(e => /audiencia/i.test(e.type) && e.date >= DEMO_TODAY && (!sharedOnly || e.shared)).sort((a, b) => a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || ''))[0]; }

function render() {
  const labels = { overview: 'Vista general', cases: 'Expedientes', case: 'Expediente', agenda: 'Agenda', clients: 'Clientes' };
  const pending = db.cases.flatMap(c => c.controls).filter(p => p.status === 'pending').length;
  $app.innerHTML = `<div class="app-shell">
    <aside class="sidebar" aria-label="Navegación principal">
      <a class="brand" href="#inicio" data-action="nav" data-page="overview"><span class="brand-symbol"><svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M9 31 20 8l11 23M14 24h12" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 9v7m-3.5-3.5h7" stroke="currentColor" stroke-width="1.5"/></svg></span><div><div class="brand-name">Agenda<span>IA</span></div><div class="brand-caption">Cada plazo, con respaldo</div></div></a>
      <p class="sidebar-section-label">Tu espacio de trabajo</p>
      <ul class="nav-list">${[['overview', 'home', 'Vista general'], ['cases', 'folder', 'Expedientes'], ['agenda', 'calendar', 'Agenda'], ['clients', 'users', 'Clientes']].map(([page, i, name]) => `<li><button class="nav-link ${ui.role === 'study' && (ui.page === page || page === 'cases' && ui.page === 'case') ? 'active' : ''}" data-action="nav" data-page="${page}" ${ui.role === 'study' && ui.page === page ? 'aria-current="page"' : ''}><span class="nav-icon">${icon(i)}</span>${name}${page === 'cases' ? `<span class="nav-count">${db.cases.length}</span>` : page === 'overview' && pending ? `<span class="nav-count">${pending}</span>` : ''}</button></li>`).join('')}</ul>
      <div style="margin-top:30px"><p class="sidebar-section-label">Enfoque inicial</p><div style="padding:0 14px;font-size:11px;color:#a7bbaf;line-height:1.9">Laboral y civil<br><span style="font-size:10px;color:#78968a">Derecho uruguayo</span></div></div>
      <div class="sidebar-footer"><span class="workspace-avatar">ER</span><div class="workspace-info"><strong>Estudio Ríos</strong><span>Espacio de demostración</span></div></div><div class="sidebar-bottom"><span class="demo-dot"></span>Innova Day 2026 · Uruguay</div>
    </aside>
    <div class="main-shell">
      <header class="topbar"><div class="breadcrumb">${icon('folder')}<span>Mi estudio</span><span>/</span><strong>${ui.role === 'client' ? 'Portal de la cliente' : labels[ui.page]}</strong></div><div class="topbar-actions"><span class="topbar-date">8 oct 2026 · fecha del escenario</span><div class="role-switch" aria-label="Vista de demostración"><button data-action="role" data-role="study" class="${ui.role === 'study' ? 'active' : ''}" aria-pressed="${ui.role === 'study'}">Estudio</button><button data-action="role" data-role="client" class="${ui.role === 'client' ? 'active' : ''}" aria-pressed="${ui.role === 'client'}">Cliente</button></div><span class="avatar mint" title="Profesional ficticia">VR</span></div></header>
      <main id="main-content" class="page-content" tabindex="-1">
        <div class="demo-banner"><span class="demo-dot"></span><strong>Demostración</strong><span>Datos ficticios · asistencia IA simulada · fechas de control interno</span><button data-action="tour">${ui.tour >= 0 ? 'Reiniciar recorrido' : 'Recorrer demo'} ↗</button></div>
        ${ui.role === 'client' ? renderClient() : ({ overview: renderOverview, cases: renderCases, case: renderCase, agenda: renderAgenda, clients: renderClients }[ui.page] || renderOverview)()}
        <div class="export-bar" style="margin-top:30px">${ui.role === 'study' ? btn('Exportar datos de la demo', 'export', 'ghost small', 'download') : ''}${btn('Restablecer demo', 'reset', 'ghost small', 'reset')}<span style="font-size:10px;color:#839081;margin-left:auto">Los cambios se guardan en este navegador.</span></div>
      </main>
    </div><nav class="mobile-navigation" aria-label="Navegación móvil">${[['overview', 'home', 'Inicio'], ['cases', 'folder', 'Expedientes'], ['agenda', 'calendar', 'Agenda'], ['clients', 'users', 'Clientes']].map(([page, i, label]) => `<button class="${ui.role === 'study' && (ui.page === page || ui.page === 'case' && page === 'cases') ? 'active' : ''}" data-action="nav" data-page="${page}">${icon(i)}<span>${label}</span></button>`).join('')}</nav>${ui.tour >= 0 ? renderTour() : ''}
  </div>`;
}

function renderOverview() {
  const c = db.cases.find(c => c.id === 'lab-001') || db.cases[0];
  const pending = db.cases.flatMap(c => c.controls).filter(p => p.status === 'pending').length;
  const missing = db.cases.flatMap(c => c.documents).filter(d => !d.received && d.shared).length;
  const tasks = db.cases.flatMap(c => c.tasks.filter(t => t.status !== 'done').map(t => ({ ...t, c }))).sort((a, b) => a.date.localeCompare(b.date));
  return `${heading('TU ESTUDIO, EN ORDEN', 'Cada plazo, con respaldo.', 'Una mirada clara a tus expedientes, tus próximos pasos y lo que necesita revisión.', btn('Nuevo expediente', 'new-case', 'primary', 'plus'))}
    <div class="stats-grid">${[[pending, 'Controles por revisar', 'La última palabra es del profesional.', 'shield'], [db.cases.length, 'Expedientes activos', 'Laboral y civil, en un mismo lugar.', 'folder'], [missing, 'Documentos pendientes', 'Pedidos claros para cada cliente.', 'file']].map(([n, label, note, i]) => `<div class="stat-card"><span class="stat-icon">${icon(i)}</span><p class="stat-label">${label}</p><div class="stat-value">${String(n).padStart(2, '0')}</div><p class="stat-note">${note}</p></div>`).join('')}</div>
    <div class="dashboard-grid"><section class="card hero-card"><div class="card-heading"><div><h2 class="card-title">Tu atención, donde hace falta</h2><p class="card-subtitle">Un control con antecedentes listos para revisar.</p></div>${icon('spark')}</div>
      <div class="case-spotlight"><div class="case-topline"><div class="case-meta">${avatar(c)}<span>${esc(c.number)}</span></div>${badge(stateOf(c))}</div><span class="tag laboral">LABORAL</span><h3 class="case-title" style="margin-top:10px">${esc(c.title)}</h3><p class="case-caption">Conciliación previa · un hito a la vez, sin perder el contexto.</p><div class="spotlight-meta"><div class="meta-item"><span>Último hito registrado</span><strong>Solicitud · 6 oct</strong></div><div class="meta-item"><span>Próxima audiencia</span><strong>19 oct · 10:30</strong></div></div><div class="attention-note">${icon('info')}<div><strong>${c.controls[0]?.status === 'validated' ? 'Revisión registrada' : 'Una fecha propuesta necesita tu criterio'}</strong><br>La documentación se organiza antes de la audiencia. El hito, la plantilla y la revisión quedan registrados.</div></div><div class="spotlight-footer"><span>${icon('shield')} Revisión profesional y trazabilidad</span>${btn(c.controls[0]?.status === 'validated' ? 'Ver expediente' : 'Revisar propuesta', 'open-case', 'primary small', 'arrow', `data-id="${c.id}"`)}</div></div>
    </section><section class="card"><div class="card-heading"><div><h2 class="card-title">Próximos pasos</h2><p class="card-subtitle">Preparación a tiempo, sin consultas repetidas.</p></div>${btn('Ver agenda', 'nav', 'ghost small', 'arrow', 'data-page="agenda"')}</div><div class="task-list">${tasks.slice(0, 3).map(t => `<div class="task-row"><span class="task-icon">${icon('file')}</span><div class="task-copy"><p class="task-title">${esc(t.title)}</p><p class="task-subtitle">${esc(t.c.client)} · ${t.c.controls.find(p => p.id === t.controlId)?.status === 'validated' ? 'Fecha revisada' : 'Fecha pendiente de revisión'}</p></div><div class="task-trailing"><span class="date-chip">${fmt(t.date)}</span>${btn('Abrir', 'open-case', 'ghost small', '', `data-id="${t.c.id}"`)}</div></div>`).join('') || '<div class="empty-state">Todo al día. No quedan tareas pendientes.</div>'}</div></section></div>
    <div class="section-grid" style="margin-top:22px"><section class="card"><div class="card-heading"><div><h2 class="card-title">Esta semana</h2><p class="card-subtitle">5–9 de octubre · controles internos y actuaciones separados</p></div><span class="tag neutral">OCTUBRE 2026</span></div><div class="week-grid">${[['LUN', 5, 'Notificación', 'Civil'], ['MAR', 6, 'Solicitud', 'Laboral'], ['MIÉ', 7, 'Revisión', 'Estudio'], ['JUE', 8, '', ''], ['VIE', 9, '', '']].map(([day, n, event, type]) => `<div class="week-day ${n === 8 ? 'today' : ''}">${day}<div class="week-number">${n}</div>${event ? `<div class="calendar-event ${n === 6 ? 'hearing' : 'control'}">${event}<br><strong>${type}</strong></div>` : '<span style="font-size:8px;color:#a9b29f">Sin eventos</span>'}</div>`).join('')}</div></section><section class="card"><div class="card-heading"><div><h2 class="card-title">El criterio queda en tus manos</h2><p class="card-subtitle">Asistencia con un alcance claro.</p></div>${icon('shield')}</div><div class="detail-list"><div class="detail-row"><span class="detail-label">AgendaIA organiza</span><span class="detail-value">Hitos, tareas y antecedentes</span></div><div class="detail-row"><span class="detail-label">El profesional decide</span><span class="detail-value">Vía, regla y vencimiento</span></div><div class="detail-row"><span class="detail-label">El cliente entiende</span><span class="detail-value">Qué aportar y hasta cuándo</span></div></div></section></div>`;
}

function renderCases() {
  const cases = db.cases.filter(c => (ui.filter === 'all' || c.matter === ui.filter) && `${c.title} ${c.client} ${c.number}`.toLowerCase().includes(ui.query.toLowerCase()));
  return `${heading('EXPEDIENTES', 'Cada asunto, en su contexto.', 'Materia, actuaciones y documentos reunidos para decidir con información.', btn('Nuevo expediente', 'new-case', 'primary', 'plus'))}<section class="card"><div class="card-heading"><div class="search-box">${icon('search')}<input aria-label="Buscar expedientes" id="case-search" placeholder="Buscar por cliente, asunto o número" value="${esc(ui.query)}"></div><div class="filters" aria-label="Filtrar por materia">${[['all', 'Todos'], ['laboral', 'Laboral'], ['civil', 'Civil']].map(([value, label]) => `<button class="${ui.filter === value ? 'active' : ''}" data-action="filter" data-filter="${value}" aria-pressed="${ui.filter === value}">${label}</button>`).join('')}</div></div><div id="case-results" class="case-list">${renderCaseRows(cases)}</div></section>`;
}
function renderCaseRows(cases) { return cases.map(c => `<div class="case-row"><div class="case-row-main">${avatar(c)}<div><h2 class="task-title">${esc(c.title)}</h2><p class="task-subtitle">${esc(c.number)} · ${esc(c.phase)}</p></div></div><div class="case-row-meta"><span class="tag ${c.matter}">${c.matter}</span>${badge(stateOf(c))}${btn('Abrir expediente', 'open-case', 'ghost small', 'arrow', `data-id="${c.id}"`)}</div></div>`).join('') || '<div class="empty-state">No encontramos expedientes con esos filtros.</div>'; }

function renderCase() {
  const c = selectedCase();
  return `${btn('Expedientes', 'nav', 'ghost small', 'back', 'data-page="cases"')}<div class="case-detail-header" style="margin-top:16px">${heading(`${esc(c.number)} · ${c.matter.toUpperCase()}`, esc(c.title), `${esc(c.client)} · ${esc(c.phase)}`, btn('Registrar hito', 'new-event', 'primary', 'plus') + btn('Vista del cliente', 'role', 'secondary', 'users', 'data-role="client"'))}</div><div class="tabs" role="tablist" aria-label="Contenido del expediente">${[['overview', 'Resumen y revisión'], ['documents', `Documentos (${c.documents.length})`], ['activity', 'Actividad']].map(([tab, label]) => `<button class="tab ${ui.tab === tab ? 'active' : ''}" role="tab" aria-selected="${ui.tab === tab}" data-action="tab" data-tab="${tab}">${label}</button>`).join('')}</div><div class="case-detail-grid"><div class="case-detail-main">${ui.tab === 'overview' ? renderReview(c) + renderTimeline(c) : ui.tab === 'documents' ? renderDocuments(c) : renderActivity(c)}</div><aside class="case-detail-side"><section class="card"><div class="card-heading"><h2 class="card-title">El expediente</h2>${avatar(c)}</div><div class="detail-list">${[['Cliente', c.client], ['Materia', c.matter === 'laboral' ? 'Derecho laboral' : 'Civil · CGP'], ['Instancia', c.office], ['Responsable', c.responsible], ['Estado', stateOf(c) === 'incomplete' ? 'Completar antecedentes' : stateOf(c) === 'pending' ? 'Revisión pendiente' : 'Controles revisados']].map(([label, value]) => `<div class="detail-row"><span class="detail-label">${label}</span><span class="detail-value">${esc(value)}</span></div>`).join('')}</div></section><section class="card"><div class="card-heading"><div><h2 class="card-title">Documentación</h2><p class="card-subtitle">${c.documents.filter(d => d.received).length} de ${c.documents.length} documentos reunidos</p></div>${icon('file')}</div><div class="progress-bar"><span style="width:${c.documents.length ? c.documents.filter(d => d.received).length / c.documents.length * 100 : 0}%"></span></div><div class="document-list">${c.documents.slice(0, 3).map(d => `<div class="document-row"><span class="document-icon">${icon(d.received ? 'check' : 'clock')}</span><div class="document-copy"><p class="document-title">${esc(d.title)}</p><p class="document-meta">${d.received ? 'Recibido' : 'Pendiente'}${!d.shared ? ' · interno' : ''}</p></div></div>`).join('')}</div>${btn('Ver documentos', 'tab', 'ghost small', 'arrow', 'data-tab="documents"')}</section><section class="card"><div class="card-heading"><h2 class="card-title">Notas internas</h2>${icon('lock')}</div><p class="notes-block">${esc(c.notes)}</p><p class="card-subtitle" style="margin-top:12px">Solo visibles en la vista del estudio.</p>${btn('Editar nota', 'edit-note', 'ghost small', 'edit')}</section><section class="card"><h2 class="card-title">Referencia de la materia</h2><p class="card-subtitle" style="margin:12px 0">Consulta informativa. La plantilla de control interno no aplica automáticamente esta norma.</p><a class="source-link" href="${LAW[c.matter].url}" target="_blank" rel="noopener noreferrer">${LAW[c.matter].label} ${icon('external')}</a>${c.matter === 'laboral' ? '<a class="source-link" style="margin-top:12px" href="https://www.gub.uy/tramites/audiencias-conciliacion" target="_blank" rel="noopener noreferrer">MTSS · audiencias de conciliación ↗</a>' : ''}</section></aside></div>`;
}

function renderReview(c) {
  if (!c.controls.length) return `<section class="card"><div class="card-heading"><h2 class="card-title">Primero, el hito que inicia todo</h2>${badge('incomplete')}</div><p class="page-subtitle">Registrá la actuación, su fecha y el documento de respaldo. Con esos datos podés preparar un control interno para revisar.</p><div style="margin-top:20px">${btn('Registrar primer hito', 'new-event', 'primary', 'plus')}</div></section>`;
  return c.controls.map(p => {
    let excluded = []; let templateDate = p.date; try { const result = addDays(p.start, p.days, p.mode, p.exclusions); excluded = result.excluded; templateDate = result.date; } catch (_) { /* Historical records remain readable. */ }
    return `<section class="card review-card" data-control-id="${p.id}"><div class="review-heading"><div><p class="eyebrow">${p.status === 'validated' ? 'CONTROL REVISADO' : 'PROPUESTA PARA REVISAR'}</p><h2 class="card-title">${esc(p.title)}</h2></div>${badge(p.status)}</div><div class="review-summary"><div><p class="review-label">${p.status === 'validated' ? 'Fecha confirmada de control interno' : 'Fecha propuesta de control interno'}</p><p class="review-date">${fmt(p.date, true)} <span style="font-family:inherit;font-size:16px;color:#98a58c">${esc(p.date.slice(0, 4))}</span></p></div><span class="tag neutral">CONTROL INTERNO</span></div><div class="trace-grid">${[['Hito de inicio', p.origin], ['Inicio del conteo interno', fmt(p.start, true)], ['Plantilla y versión', p.version], ['Conteo desde el día siguiente', `${p.days} ${p.mode === 'work' ? 'días de trabajo · lun–vie' : 'días corridos'}`], ['Fecha inicial de la actuación', fmt(originFor(c, p)?.date || p.start, true)], ['Propuesta de la plantilla', fmt(templateDate, true)], ['Días excluidos del ejemplo', excluded.length ? excluded.map(d => fmt(d)).join(', ') : 'Ninguno'], ['Respaldo', originFor(c, p)?.document || 'Registro del hito']].map(([label, value]) => `<div class="trace-item"><span class="trace-label">${label}</span><span class="trace-value">${esc(value)}</span></div>`).join('')}</div><div class="review-note">${icon('info')}<p>${esc(p.assumptions)} Ferias, Turismo, suspensiones e interrupciones requieren evaluación del abogado; este control no calcula esos efectos jurídicos.</p></div>${p.status === 'validated' ? `<div class="validation-stamp">${icon('shield')}<div><strong>${esc(p.reviewer)}</strong><p>${prettyTime(p.reviewedAt)} · ${esc(p.justification)}</p></div></div>` : ''}<div class="review-actions">${p.date !== templateDate ? `<p class="card-subtitle" style="width:100%;margin-bottom:8px">La fecha ${p.status === 'validated' ? 'confirmada' : 'propuesta'} difiere de la plantilla. La justificación de la revisión explica el ajuste.</p>` : ''}${btn(p.status === 'validated' ? 'Revisar nuevamente' : 'Revisar y confirmar', 'review', 'primary', 'check', `data-id="${p.id}"`)}${btn('Editar control', 'edit-control', 'secondary', 'edit', `data-id="${p.id}"`)}</div></section>`;
  }).join('');
}
function renderTimeline(c) {
  return `<section class="card"><div class="card-heading"><div><h2 class="card-title">Historia del expediente</h2><p class="card-subtitle">${c.matter === 'laboral' ? 'Solicitud, audiencia, acta y constancia son hitos distintos.' : 'Cada actuación conserva su fecha y respaldo.'}</p></div>${btn('Agregar hito', 'new-event', 'ghost small', 'plus')}</div><ol class="timeline">${[...c.events].sort((a, b) => a.date.localeCompare(b.date)).map(e => `<li class="timeline-item"><span class="timeline-dot ${e.date <= DEMO_TODAY ? 'done' : 'next'}"></span><div class="timeline-content"><span class="timeline-date">${fmt(e.date, true)}${e.time ? ` · ${e.time}` : ''}</span><h3 class="timeline-title">${esc(e.type)}</h3><p class="timeline-copy">${esc(e.detail)}</p><span class="timeline-kind">${icon('file')} ${esc(e.document)}${e.date > DEMO_TODAY ? ' · previsto' : ''}</span></div></li>`).join('') || '<li class="empty-state">Todavía no hay hitos registrados.</li>'}</ol>${c.matter === 'laboral' ? '<p class="card-subtitle" style="padding-top:15px;border-top:1px solid #e5e9e2">La audiencia no genera automáticamente una fecha para demandar. El acta y la eventual constancia se incorporan cuando corresponda.</p>' : ''}</section>`;
}
function renderDocuments(c) {
  return `<section class="card"><div class="card-heading"><div><h2 class="card-title">Documentos y antecedentes</h2><p class="card-subtitle">Archivos de ejemplo. Los documentos internos se excluyen de la vista del cliente.</p></div>${btn('Agregar documento', 'add-doc', 'secondary small', 'plus')}</div><div class="document-list">${c.documents.map(d => `<div class="document-row"><span class="document-icon">${icon(d.received ? 'file' : 'clock')}</span><div class="document-copy"><p class="document-title">${esc(d.title)}</p><p class="document-meta">${esc(d.kind)} · ${d.shared ? 'Compartido con el cliente' : 'Solo estudio'}</p></div><span class="badge ${d.received ? 'validated' : 'pending'}">${d.received ? 'Recibido' : 'Pendiente'}</span>${btn(d.received ? 'Ver ejemplo' : 'Marcar recibido', d.received ? 'view-doc' : 'receive-doc', 'ghost small', d.received ? 'external' : 'check', `data-id="${d.id}"`)}</div>`).join('') || '<div class="empty-state">Este expediente todavía no tiene documentos.</div>'}</div></section>`;
}
function renderActivity(c) { return `<section class="card"><div class="card-heading"><div><h2 class="card-title">Registro de actividad</h2><p class="card-subtitle">Cambios y revisiones conservados en este navegador.</p></div>${icon('shield')}</div><div class="activity-list">${c.activity.map(a => `<div class="activity-item"><span class="activity-dot"></span><div><p class="activity-text">${esc(a.text)}</p><span class="activity-time">${prettyTime(a.date)}</span></div></div>`).join('')}</div></section>`; }

function allAgenda() { return db.cases.flatMap(c => [...c.controls.map(p => ({ date: p.date, title: p.title, type: 'Control interno', c, status: p.status, time: '' })), ...c.events.filter(e => /audiencia/i.test(e.type)).map(e => ({ ...e, title: e.type, type: 'Audiencia', c, status: 'event' }))]).sort((a, b) => a.date.localeCompare(b.date)); }
function renderAgenda() { const events = allAgenda(); return `${heading('AGENDA', 'Anticipate al próximo paso.', 'Audiencias y controles internos identificados por separado, con acceso al expediente.', btn('Exportar agenda', 'calendar-export', 'secondary', 'download'))}<section class="card"><div class="card-heading"><h2 class="card-title">Fechas del escenario de demostración</h2><div class="case-meta"><span class="tag neutral">CONTROL INTERNO</span><span class="tag laboral">AUDIENCIA</span></div></div><div class="agenda-list">${events.map(e => `<div class="agenda-event"><div class="agenda-day"><strong>${e.date.slice(8)}</strong><span>${new Intl.DateTimeFormat('es-UY', { month: 'short', timeZone: 'UTC' }).format(parseDate(e.date))}</span><small>${e.date.slice(0, 4)}</small></div><div class="task-copy"><h3 class="task-title">${esc(e.title)}</h3><p class="task-subtitle">${esc(e.c.title)}${e.time ? ` · ${e.time} · hora Uruguay` : ''}</p></div><div class="task-trailing">${e.type === 'Audiencia' ? '<span class="tag laboral">Audiencia</span>' : badge(e.status)}${btn('Ver expediente', 'open-case', 'ghost small', 'arrow', `data-id="${e.c.id}"`)}</div></div>`).join('') || '<div class="empty-state">Todavía no hay fechas registradas.</div>'}</div></section>`; }
function renderClients() { return `${heading('CLIENTES', 'Información que se entiende.', 'Cada cliente ve sus próximas acciones y los documentos compartidos con él.')}<section class="card"><div class="case-list">${db.cases.map(c => `<div class="case-row"><div class="case-row-main">${avatar(c)}<div><h2 class="task-title">${esc(c.client)}</h2><p class="task-subtitle">${esc(c.title)} · ${c.tasks.filter(t => t.status !== 'done').length} tareas pendientes</p></div></div><div class="case-row-meta">${btn('Ver portal de ejemplo', 'client-case', 'secondary small', 'users', `data-id="${c.id}"`)}</div></div>`).join('')}</div></section>`; }
function renderClient() {
  const c = selectedCase();
  const hearing = nextHearing(c, true);
  return `${heading('PORTAL DEL CLIENTE · VISTA DE EJEMPLO', `Hola, ${esc(c.client.split(' ')[0])}.`, 'Tu asunto, explicado en pasos claros. Acá podés ver qué sigue y cómo prepararte.', btn('Volver al estudio', 'role', 'secondary', 'back', 'data-role="study"'))}<div class="portal-banner">${icon('shield')}<div><strong>Tu información compartida, en un solo lugar.</strong><p class="card-subtitle">Esta vista muestra tareas y documentos del cliente seleccionado. El cambio de vista es parte de la demo; todavía no hay cuentas de usuario.</p></div></div><div class="client-layout"><div><section class="card client-case"><div class="case-topline"><span class="tag ${c.matter}">${c.matter}</span><span class="badge draft">${esc(c.phase)}</span></div><h2 class="case-title">${esc(c.title)}</h2><p class="case-caption">Te acompaña ${esc(c.responsible)}.</p><div class="client-next-step"><p class="eyebrow">${hearing ? 'PRÓXIMA AUDIENCIA' : 'PRÓXIMO PASO'}</p><h3 class="card-title">${hearing ? `${fmt(hearing.date, true)} · ${hearing.time || 'hora por confirmar'}` : 'Reunir los antecedentes de tu asunto'}</h3><p class="page-subtitle">${hearing ? 'Tu profesional te indicará cómo prepararte y confirmará los detalles de la audiencia.' : 'Tu estudio te indicará qué documentación hace falta y confirmará las fechas.'}</p></div></section><section class="card"><div class="card-heading"><h2 class="card-title">Lo que podés hacer ahora</h2>${icon('check')}</div>${c.tasks.filter(t => t.shared).map(t => {
    const p = c.controls.find(p => p.id === t.controlId); const reviewed = p?.status === 'validated';
    return `<div class="client-task"><div class="task-row"><span class="task-icon">${icon(t.status === 'done' ? 'check' : 'file')}</span><div class="task-copy"><h3 class="task-title">${esc(t.title)}</h3><p class="task-subtitle">${esc(t.why)}</p><p class="client-status">${t.status === 'done' ? '✓ Documentación recibida por el estudio' : reviewed ? `Aportar antes del ${fmt(t.date, true)} · fecha de organización confirmada` : `Fecha de control propuesta: ${fmt(t.date, true)} · pendiente de confirmación del estudio`}</p></div></div>${t.status !== 'done' ? btn('Adjuntar documento de ejemplo', 'client-upload', 'primary small', 'plus', `data-id="${t.id}"`) : '<span class="badge validated">Completado</span>'}</div>`;
  }).join('') || '<div class="empty-state">Tu estudio todavía no te asignó tareas. Te avisará cuando haya un próximo paso.</div>'}</section></div><aside><section class="card"><div class="card-heading"><h2 class="card-title">Tus documentos</h2>${icon('file')}</div><div class="document-list">${c.documents.filter(d => d.shared).map(d => `<div class="document-row"><span class="document-icon">${icon(d.received ? 'check' : 'clock')}</span><div class="document-copy"><p class="document-title">${esc(d.title)}</p><p class="document-meta">${d.received ? 'Disponible para consultar' : 'Pendiente de aportar'}</p></div>${d.received ? btn('Ver', 'view-doc', 'ghost small', '', `data-id="${d.id}"`) : ''}</div>`).join('') || '<p class="card-subtitle">Todavía no hay documentos compartidos.</p>'}</div></section><section class="card client-help"><h2 class="card-title">¿Tenés una duda?</h2><p class="page-subtitle">Tu estudio es quien define la estrategia y confirma los plazos de tu asunto.</p><div style="margin-top:16px">${btn('Preparar consulta', 'client-question', 'secondary', 'mail')}</div></section></aside></div>`;
}

const TOUR = [
  { title: '1. Un expediente con contexto', text: 'Empezamos en un asunto laboral. La solicitud y la audiencia tienen su propio registro y respaldo.' },
  { title: '2. Una fecha que se puede explicar', text: 'Abrí “Revisar y confirmar”: podés ajustar la fecha y dejar la justificación del control interno.' },
  { title: '3. La revisión queda registrada', text: 'El estudio confirma el control. La fecha y la responsable quedan visibles junto a sus antecedentes.' },
  { title: '4. El cliente sabe qué hacer', text: 'Acá se ve qué documento aportar, por qué y hasta cuándo. Probá adjuntar el documento de ejemplo.' }
];
function renderTour() { const step = TOUR[ui.tour]; return `<aside class="demo-guide" aria-label="Recorrido guiado"><div class="card-heading"><p class="eyebrow" style="margin:0">RECORRIDO · ${ui.tour + 1} / 4</p>${btn('', 'tour-close', 'ghost small icon-button', 'close', 'aria-label="Cerrar recorrido"')}</div><h2 class="card-title">${step.title}</h2><p class="page-subtitle">${step.text}</p><div class="guide-actions" style="margin-top:18px">${ui.tour > 0 ? btn('Anterior', 'tour-prev', 'ghost small', 'back') : ''}${btn(ui.tour === 3 ? 'Finalizar' : 'Siguiente', 'tour-next', 'primary small', 'arrow')}</div></aside>`; }
function goTour(step) { ui.tour = step; ui.caseId = db.cases.find(c => c.id === 'lab-001')?.id || db.cases[0].id; ui.page = 'case'; ui.tab = 'overview'; ui.role = step === 3 ? 'client' : 'study'; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }

function openDialog(title, body, footer = '', formId = '') {
  $dialog.innerHTML = `${formId ? `<form id="${formId}">` : ''}<div class="dialog-header"><div><h2 id="dialog-title" class="card-title">${title}</h2></div>${btn('', 'dialog-close', 'ghost icon-button', 'close', 'type="button" aria-label="Cerrar ventana"')}</div><div class="dialog-body">${body}<p id="form-error" class="form-error" role="alert" hidden></p></div><div class="dialog-footer">${btn('Cancelar', 'dialog-close', 'secondary', '', 'type="button"')}${footer}</div>${formId ? '</form>' : ''}`;
  $dialog.setAttribute('aria-labelledby', 'dialog-title'); $dialog.showModal();
}
function field(label, name, value = '', type = 'text', extra = '', cls = '') { return `<div class="field ${cls}"><label for="f-${name}">${label}</label><input id="f-${name}" name="${name}" type="${type}" value="${esc(value)}" ${extra}></div>`; }
function error(message) { const e = document.getElementById('form-error'); e.textContent = message; e.hidden = false; }
function reviewDialog(id) {
  const p = selectedCase().controls.find(p => p.id === id); if (!p) return;
  openDialog('Revisar y confirmar el control', `<p class="modal-subtitle">${esc(p.title)}. Confirmás una fecha de organización del estudio.</p><input type="hidden" name="id" value="${p.id}"><div class="form-grid">${field('Fecha de control', 'date', p.date, 'date', 'required')}${field('Profesional responsable', 'reviewer', selectedCase().responsible, 'text', 'required maxlength="100"')}<div class="field full"><label for="f-justification">Justificación de la revisión</label><textarea id="f-justification" name="justification" rows="3" required maxlength="1000" placeholder="Qué revisaste y por qué confirmás esta fecha">${esc(p.justification || 'Confirmo este control interno para reunir y revisar los documentos antes de la actuación.')}</textarea></div></div><label class="checkbox-field"><input type="checkbox" name="acknowledge" required>Revisé el hito y sus antecedentes. Esta fecha es un control interno y no un vencimiento jurídico calculado por la demo.</label>`, '<button class="button primary" type="submit">Confirmar revisión</button>', 'review-form');
}
function controlDialog(id) {
  const c = selectedCase(); const p = c.controls.find(p => p.id === id); if (!p) return;
  openDialog('Editar la planificación interna', `<input type="hidden" name="id" value="${p.id}"><p class="modal-subtitle">Los cambios dejan el control pendiente de una nueva revisión. La fecha original de la actuación se conserva en el historial del expediente.</p><div class="form-grid">${field('Nombre del control', 'title', p.title, 'text', 'required maxlength="150"', 'full')}${field('Inicio del conteo interno', 'start', p.start, 'date', 'required')}${field('Días para organizar la tarea', 'days', p.days, 'number', 'min="1" max="365" required')}<div class="field"><label for="f-mode">Tipo de conteo interno</label><select id="f-mode" name="mode"><option value="work" ${p.mode === 'work' ? 'selected' : ''}>Días de trabajo · lunes a viernes</option><option value="calendar" ${p.mode === 'calendar' ? 'selected' : ''}>Días corridos</option></select></div>${field('Fechas a excluir (separadas por coma)', 'exclusions', p.exclusions.join(', '), 'text', 'placeholder="2026-10-12, 2026-10-14"')}<div class="field full"><label for="f-assumptions">Supuestos y observaciones para revisar</label><textarea name="assumptions" id="f-assumptions" rows="3" required maxlength="1000">${esc(p.assumptions)}</textarea></div></div><p class="form-help">Se cuenta desde el día siguiente. Solo se excluyen fines de semana si elegís lun–vie y las fechas que cargues. Ferias, Turismo y efectos de interrupciones o suspensiones no se interpretan automáticamente.</p>`, '<button class="button primary" type="submit">Guardar propuesta</button>', 'control-form');
}
function eventDialog() {
  const c = selectedCase(); const types = c.matter === 'laboral' ? ['Solicitud de conciliación', 'Audiencia de conciliación', 'Acta de conciliación', 'Constancia', 'Notificación', 'Otra actuación'] : ['Notificación', 'Audiencia', 'Presentación', 'Otra actuación'];
  openDialog('Registrar un hito', `<p class="modal-subtitle">Cada actuación conserva su fecha y su respaldo. ${c.matter === 'laboral' ? 'Solicitud, audiencia, acta y constancia se registran por separado.' : ''}</p><div class="form-grid"><div class="field"><label for="f-type">Tipo de hito</label><select id="f-type" name="type">${types.map(t => `<option>${t}</option>`).join('')}</select></div>${field('Fecha de la actuación', 'date', DEMO_TODAY, 'date', 'required')}${field('Hora (si corresponde)', 'time', '', 'time')}${field('Documento de respaldo', 'document', '', 'text', 'required maxlength="150" placeholder="Ej.: acta o comprobante de ejemplo"')}<div class="field full"><label for="f-detail">Qué ocurrió</label><textarea id="f-detail" name="detail" rows="3" required maxlength="1000" placeholder="Detalle de la actuación y datos que deben revisarse"></textarea></div>${field('Control interno sugerido (opcional)', 'controlTitle', 'Revisar los antecedentes del hito', 'text', 'maxlength="150"', 'full')}${field('Qué debe aportar el cliente (opcional)', 'taskTitle', '', 'text', 'maxlength="150" placeholder="Ej.: aportar comprobantes del vínculo"', 'full')}</div><label class="checkbox-field"><input type="checkbox" name="createControl" checked>Preparar una fecha de control interno a 5 días de trabajo, pendiente de revisión.</label><label class="checkbox-field"><input type="checkbox" name="shared" checked>Compartir este hito y su documento de ejemplo con el cliente.</label><label class="checkbox-field"><input type="checkbox" name="clientTask">Asignar al cliente la tarea indicada, con la fecha de control pendiente de revisión.</label>`, '<button class="button primary" type="submit">Guardar hito</button>', 'event-form');
}
function newCaseDialog() {
  openDialog('Nuevo expediente', `<p class="modal-subtitle">Usá datos ficticios para recorrer esta demostración.</p><div class="form-grid">${field('Nombre del asunto', 'title', '', 'text', 'required maxlength="150" placeholder="Apellido c/ contraparte"', 'full')}${field('Cliente', 'client', '', 'text', 'required maxlength="100"')}<div class="field"><label for="f-matter">Materia</label><select id="f-matter" name="matter"><option value="laboral">Laboral</option><option value="civil">Civil · CGP</option></select></div>${field('Número interno', 'number', '', 'text', 'required maxlength="60" placeholder="LAB · 2026 / 018"')}${field('Instancia o juzgado', 'office', '', 'text', 'required maxlength="150" placeholder="MTSS o juzgado de ejemplo"')}${field('Profesional responsable', 'responsible', 'Dra. Valentina Ríos', 'text', 'required maxlength="100"', 'full')}</div>`, '<button class="button primary" type="submit">Crear expediente</button>', 'case-form');
}
function viewDoc(id) { const c = selectedCase(); const d = c.documents.find(d => d.id === id && (ui.role !== 'client' || d.shared)); if (!d) return; openDialog(esc(d.title), `<p class="eyebrow">DOCUMENTO FICTICIO · DEMOSTRACIÓN</p><p style="white-space:pre-wrap;line-height:1.8">${esc(d.content || 'Documento de ejemplo incorporado a la demostración. No contiene información de un expediente real.')}</p>`, btn('Descargar ejemplo', 'download-doc', 'primary', 'download', `type="button" data-id="${d.id}"`)); }
function receiveDoc(id) { const c = selectedCase(); const d = c.documents.find(d => d.id === id && (ui.role === 'study' || d.shared)); if (!d) return; d.received = true; d.content ||= 'Documento ficticio incorporado durante la demostración. Sin datos reales.'; c.tasks.filter(t => t.docId === id).forEach(t => { t.status = 'done'; }); activity(c, `Documento de ejemplo recibido: ${d.title}.`); const saved = save(); render(); savedToast(saved, 'Documento de ejemplo incorporado. La tarea quedó completada.'); }
function download(name, text, mime = 'text/plain;charset=utf-8') { const url = URL.createObjectURL(new Blob([text], { type: mime })); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
function exportCalendar() {
  const clean = s => String(s).replace(/\\/g, '\\\\').replace(/[\r\n]+/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
  const entries = allAgenda().map((e, i) => {
    const start = e.date.replace(/-/g, ''); const end = parseDate(e.date); end.setUTCDate(end.getUTCDate() + 1);
    return ['BEGIN:VEVENT', `UID:agendaia-${e.c.id}-${i}@demo`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${start}`, `DTEND;VALUE=DATE:${end.toISOString().slice(0, 10).replace(/-/g, '')}`, `SUMMARY:${clean(`[DEMO] ${e.title} · ${e.c.client}`)}`, `DESCRIPTION:${clean(`Datos ficticios. ${e.type}. ${e.time ? 'Hora indicada: ' + e.time + ' Uruguay. ' : ''}${e.status === 'pending' ? 'Pendiente de revisión profesional.' : ''}`)}`, 'END:VEVENT'].join('\r\n');
  });
  download('agendaia-demo.ics', ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AgendaIA//Demo//ES', 'CALSCALE:GREGORIAN', ...entries, 'END:VCALENDAR', ''].join('\r\n'), 'text/calendar;charset=utf-8'); toast('Agenda de ejemplo exportada. Los eventos incluyen la marca DEMO.');
}

document.addEventListener('click', event => {
  const el = event.target.closest('[data-action]'); if (!el) return;
  const action = el.dataset.action;
  if (el.tagName === 'A') event.preventDefault();
  const c = selectedCase();
  switch (action) {
    case 'nav': ui.page = el.dataset.page; ui.role = 'study'; ui.query = ''; render(); window.scrollTo(0, 0); break;
    case 'open-case': ui.caseId = el.dataset.id; ui.page = 'case'; ui.role = 'study'; ui.tab = 'overview'; render(); window.scrollTo(0, 0); break;
    case 'role': ui.role = el.dataset.role; render(); window.scrollTo(0, 0); break;
    case 'client-case': ui.caseId = el.dataset.id; ui.role = 'client'; render(); window.scrollTo(0, 0); break;
    case 'tab': ui.tab = el.dataset.tab; render(); break;
    case 'filter': ui.filter = el.dataset.filter; render(); break;
    case 'new-case': newCaseDialog(); break;
    case 'new-event': eventDialog(); break;
    case 'review': reviewDialog(el.dataset.id); break;
    case 'edit-control': controlDialog(el.dataset.id); break;
    case 'dialog-close': $dialog.close(); break;
    case 'view-doc': viewDoc(el.dataset.id); break;
    case 'receive-doc': receiveDoc(el.dataset.id); break;
    case 'download-doc': { const d = c.documents.find(d => d.id === el.dataset.id && (ui.role !== 'client' || d.shared)); if (d) download('agendaia-documento-ejemplo.txt', `${d.title}\n\n${d.content}\n\nDocumento ficticio · AgendaIA · Innova Day 2026`); break; }
    case 'client-upload': { const t = c.tasks.find(t => t.id === el.dataset.id && t.shared); if (t) receiveDoc(t.docId); break; }
    case 'edit-note': openDialog('Nota interna del estudio', `<div class="field"><label for="f-note">Nota (no se muestra al cliente)</label><textarea id="f-note" name="note" rows="5" maxlength="2000">${esc(c.notes)}</textarea></div>`, '<button class="button primary" type="submit">Guardar nota</button>', 'note-form'); break;
    case 'add-doc': openDialog('Agregar documento de ejemplo', `<div class="form-grid">${field('Nombre del documento', 'title', '', 'text', 'required maxlength="150"', 'full')}<div class="field full"><label for="f-content">Contenido ficticio</label><textarea id="f-content" name="content" rows="4" maxlength="3000" required placeholder="Escribí el contenido de un documento de ejemplo."></textarea></div></div><label class="checkbox-field"><input type="checkbox" name="shared">Compartir con el cliente</label>`, '<button class="button primary" type="submit">Agregar documento</button>', 'doc-form'); break;
    case 'client-question': openDialog('Preparar una consulta para tu estudio', `<p class="modal-subtitle">Esta demo guarda el borrador en el expediente. No envía correos ni mensajes.</p><div class="field"><label for="f-question">Tu consulta</label><textarea id="f-question" name="question" rows="4" required maxlength="1500" placeholder="¿Qué necesitás consultar?"></textarea></div>`, '<button class="button primary" type="submit">Guardar borrador</button>', 'question-form'); break;
    case 'export': if (ui.role !== 'study') break; download('agendaia-demo.json', JSON.stringify({ ...db, exportedAt: new Date().toISOString(), notice: 'Datos de demostración; no constituyen un expediente real ni cálculo jurídico.' }, null, 2), 'application/json'); toast('Datos de la demo exportados.'); break;
    case 'calendar-export': exportCalendar(); break;
    case 'reset': openDialog('Restablecer la demostración', '<p>Se recuperarán los tres expedientes originales y se descartarán los cambios de esta demo en este navegador. Podés exportarlos antes de restablecer.</p>', btn('Restablecer demo', 'reset-confirm', 'danger', 'reset', 'type="button"')); break;
    case 'reset-confirm': { db = clone(SEED); const saved = save(); ui = { page: 'overview', caseId: 'lab-001', role: 'study', tab: 'overview', filter: 'all', query: '', tour: -1 }; $dialog.close(); render(); savedToast(saved, 'Demo restablecida. Lista para presentar.'); break; }
    case 'tour': goTour(0); break;
    case 'tour-next': ui.tour === 3 ? (ui.tour = -1, render(), toast('Recorrido completo. Podés seguir explorando.')) : goTour(ui.tour + 1); break;
    case 'tour-prev': goTour(Math.max(0, ui.tour - 1)); break;
    case 'tour-close': ui.tour = -1; render(); break;
  }
});
document.addEventListener('input', event => { if (event.target.id === 'case-search') { ui.query = event.target.value; const cases = db.cases.filter(c => (ui.filter === 'all' || c.matter === ui.filter) && `${c.title} ${c.client} ${c.number}`.toLowerCase().includes(ui.query.toLowerCase())); document.getElementById('case-results').innerHTML = renderCaseRows(cases); } });
$dialog.addEventListener('click', e => { if (e.target === $dialog) { const r = $dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) $dialog.close(); } });
document.addEventListener('submit', event => {
  if (!event.target.closest('#action-dialog')) return;
  event.preventDefault(); const formId = event.target.getAttribute('id'); const f = new FormData(event.target); const c = selectedCase();
  const get = name => String(f.get(name) || '').trim();
  try {
    switch (formId) {
      case 'review-form': {
        const p = c.controls.find(p => p.id === get('id'));
        if (!p || !parseDate(get('date')) || !get('reviewer') || !get('justification') || !f.has('acknowledge')) throw new Error('Completá la fecha, la responsable, la justificación y la confirmación de revisión.');
        snapshotControl(p, 'Revisión profesional');
        if (p.date !== get('date')) p.previousDates.push({ date: p.date, changedAt: new Date().toISOString() });
        p.date = get('date'); p.reviewer = get('reviewer'); p.justification = get('justification'); p.reviewedAt = new Date().toISOString(); p.status = 'validated';
        c.tasks.filter(t => t.controlId === p.id).forEach(t => { t.date = p.date; });
        activity(c, `${p.reviewer} revisó “${p.title}” y confirmó el ${fmt(p.date, true)}. Motivo: ${p.justification}`); break;
      }
      case 'control-form': {
        const p = c.controls.find(p => p.id === get('id')); const exclusions = get('exclusions').split(',').map(d => d.trim()).filter(Boolean);
        if (!p || exclusions.some(d => !parseDate(d))) throw new Error('Las fechas a excluir deben tener formato AAAA-MM-DD.');
        if (!get('title') || !get('assumptions')) throw new Error('Completá el nombre y los supuestos del control.');
        const result = addDays(get('start'), Number(get('days')), get('mode'), exclusions);
        snapshotControl(p, 'Edición de la planificación');
        p.previousDates.push({ date: p.date, changedAt: new Date().toISOString() });
        Object.assign(p, { title: get('title'), start: get('start'), days: Number(get('days')), mode: get('mode'), exclusions, date: result.date, assumptions: get('assumptions'), status: 'pending', reviewer: '', reviewedAt: '', justification: '', rule: `Planificación interna · ${get('days')} días` });
        c.tasks.filter(t => t.controlId === p.id).forEach(t => { t.date = p.date; }); activity(c, `Planificación actualizada: “${p.title}”. Requiere nueva revisión.`); break;
      }
      case 'event-form': {
        if (!parseDate(get('date')) || !get('detail') || !get('document')) throw new Error('Completá una fecha válida, el detalle y el documento de respaldo.');
        if (f.has('createControl') && !get('controlTitle')) throw new Error('Indicá el nombre del control interno o desmarcá esa opción.');
        if (f.has('clientTask') && (!f.has('createControl') || !f.has('shared') || !get('taskTitle'))) throw new Error('Para asignar una tarea al cliente, compartí el hito, creá un control e indicá qué debe aportar.');
        const eventId = uid('e'); const documentId = uid('d');
        const result = f.has('createControl') ? addDays(get('date'), 5) : null;
        c.events.push({ id: eventId, documentId, type: get('type'), date: get('date'), time: get('time'), detail: get('detail'), document: get('document'), shared: f.has('shared') });
        c.documents.push({ id: documentId, title: get('document'), kind: 'Respaldo del hito · ejemplo', received: true, shared: f.has('shared'), content: `Documento de ejemplo registrado para: ${get('type')}.\nFecha: ${get('date')}.\n${get('detail')}` });
        if (f.has('createControl')) {
          const controlId = uid('p');
          c.controls.push({ id: controlId, originEventId: eventId, documentId, title: get('controlTitle'), origin: get('type'), start: get('date'), days: 5, mode: 'work', exclusions: [], date: result.date, status: 'pending', rule: 'Planificación interna · 5 días de trabajo', version: 'Plantilla interna v1', assumptions: 'Control de organización interna. Evaluar el alcance jurídico de este hito y sus incidencias antes de confirmar cualquier vencimiento.', reviewer: '', reviewedAt: '', justification: '', previousDates: [], history: [] });
          if (f.has('clientTask')) { const docId = uid('d'); c.documents.push({ id: docId, title: get('taskTitle'), kind: 'Documentación del cliente', received: false, shared: true, content: '' }); c.tasks.push({ id: uid('t'), title: get('taskTitle'), why: 'Este antecedente ayuda a preparar la próxima actuación de tu asunto.', date: result.date, status: 'pending', docId, shared: true, controlId }); }
        }
        activity(c, `Hito registrado: ${get('type')} · ${fmt(get('date'), true)}.`); ui.tab = 'overview'; break;
      }
      case 'case-form': {
        if (!get('title') || !get('client') || !get('number') || !get('office') || !get('responsible')) throw new Error('Completá los datos del expediente.');
        const id = uid('case'); db.cases.push({ id, number: get('number'), title: get('title'), client: get('client'), matter: get('matter') === 'civil' ? 'civil' : 'laboral', phase: 'Relevamiento inicial', office: get('office'), responsible: get('responsible'), initials: get('client').split(/\s+/).slice(0, 2).map(p => p[0]).join('').toUpperCase(), color: 'mint', notes: 'Todavía no hay notas internas.', events: [], controls: [], documents: [], tasks: [], activity: [{ text: 'Expediente de demostración creado.', date: new Date().toISOString() }] }); ui.caseId = id; ui.page = 'case'; ui.tab = 'overview'; break;
      }
      case 'note-form': c.notes = get('note'); activity(c, 'Nota interna actualizada.'); break;
      case 'doc-form': if (!get('title') || !get('content')) throw new Error('Completá el título y el contenido de ejemplo.'); c.documents.push({ id: uid('d'), title: get('title'), kind: 'Documento de ejemplo', received: true, shared: f.has('shared'), content: get('content') }); activity(c, `Documento de ejemplo agregado: ${get('title')}.`); break;
      case 'question-form': if (!get('question')) throw new Error('Escribí tu consulta.'); activity(c, `Borrador de consulta del cliente (sin enviar): ${get('question')}`); break;
    }
    const saved = save(); $dialog.close(); render(); savedToast(saved, formId === 'review-form' ? 'Revisión registrada. La fecha del cliente quedó actualizada.' : formId === 'question-form' ? 'Consulta guardada como borrador. No se envió ningún mensaje.' : 'Cambios guardados en la demo.');
  } catch (e) { error(e.message || 'No pudimos guardar los cambios. Revisá los datos.'); }
});
render();
