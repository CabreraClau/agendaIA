# AgendaIA

Demo interactiva para Innova Day 2026: expedientes, hitos, documentación y controles de organización interna con revisión profesional.

Repositorio: [CabreraClau/agendaIA](https://github.com/CabreraClau/agendaIA).

## Ejecutar

Desde la carpeta del repositorio, con Python 3 instalado:

```sh
python3 -m http.server 4173 --directory dist
```

Abrí [http://localhost:4173](http://localhost:4173). La aplicación usa HTML, CSS y JavaScript y no requiere instalar dependencias ni realizar una compilación.

## Qué permite esta entrega

- Recorrer tres expedientes ficticios de materia laboral y civil, buscar asuntos y crear expedientes de ejemplo.
- Registrar hitos con su fecha y respaldo; mantener separados solicitud, audiencia, acta y constancia en conciliación laboral.
- Editar una propuesta de control interno y registrar la fecha, responsable y justificación de su revisión. Un cambio en la planificación exige una nueva revisión.
- Organizar documentos y notas, ver actividad y consultar una agenda de ejemplo.
- Cambiar a la vista del cliente, mostrar tareas y documentación compartida y simular la incorporación de un documento.
- Exportar datos de demostración en JSON o la agenda en ICS y restablecer el escenario original.

Los cambios se guardan en `localStorage` del navegador para ese sitio. Si el navegador bloquea ese almacenamiento, duran únicamente durante la sesión. El servidor sirve archivos estáticos: no guarda expedientes ni recibe documentos.

## Alcance y datos

Esta demo no tiene cuentas reales, autenticación, seguridad multiusuario, backend ni llamadas a una IA externa. Cambiar entre las vistas **Estudio** y **Cliente** sirve para mostrar la experiencia propuesta; todos los datos siguen en el mismo navegador y pueden consultarse en su almacenamiento local.

Las fechas propuestas son controles internos. El conteo permite días corridos o lunes a viernes y exclusiones ingresadas manualmente; no interpreta normas, ferias judiciales, Turismo, prescripción, suspensiones ni interrupciones. La profesional confirma una fecha de organización del estudio. No se calcula un vencimiento jurídico real en esta entrega.

Todos los asuntos, personas y documentos son ficticios. **Adjuntar documento de ejemplo** simula una recepción; no carga un archivo del dispositivo. El repositorio público no incluye datos de clientes ni adjuntos de la postulación.

## Verificación

```sh
node --check dist/app.js
node tests/smoke.mjs
```

Los checks cubren creación de hitos sin cambios parciales, vinculación de respaldos, revisión y edición de controles, sincronización de tareas, persistencia y filtrado de la vista del cliente. El recorrido principal y la creación de un expediente también se probaron en navegador.

## Materias y referencias

El escenario combina materia civil, con referencia al CGP, y materia laboral, con foco en los hitos de conciliación previa. Las referencias se ofrecen para consulta y no se aplican automáticamente a los controles internos. Fuentes oficiales verificadas el **8 de octubre de 2026**:

- [Código General del Proceso, aprobado por Ley Nº 15.982](https://www.impo.com.uy/bases/codigo-general-proceso/15982-1988).
- [Ley Nº 18.572 — Ley de abreviación de los juicios laborales](https://www.impo.com.uy/bases/leyes/18572-2009).
- [MTSS — Audiencias de conciliación](https://www.gub.uy/tramites/audiencias-conciliacion).

Para explicar el producto y presentar el recorrido, consultá [la guía de AgendaIA](docs/explicacion-agendaia.md).
