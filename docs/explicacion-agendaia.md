# AgendaIA: idea y recorrido de la demo

## La idea del producto

AgendaIA propone reunir el trabajo de un asunto jurídico en un expediente: antecedentes, documentos, actuaciones, tareas y fechas. El estudio puede ver qué ocurrió, qué falta y quién debe revisar el siguiente paso. El cliente recibe indicaciones concretas sobre la documentación que necesita aportar y la próxima actuación.

La propuesta de producto incluye asistencia de IA para organizar información y sugerir alertas, junto con reglas revisables y respaldo para el cálculo de plazos. El abogado conserva la decisión profesional. Esta entrega muestra la experiencia de trabajo y la trazabilidad de la revisión mediante datos ficticios y controles de organización interna; la asistencia de IA y el cómputo normativo son desarrollo futuro.

## Cómo explicarlo a un abogado

“AgendaIA reúne el expediente, sus documentos y el próximo paso. Una propuesta puede revisarse desde su hito de origen y su respaldo; el profesional ajusta la fecha, deja su justificación y confirma. Después, el cliente ve qué documentación debe aportar. En esta demo mostramos ese flujo con controles internos, sin calcular plazos jurídicos reales.”

La revisión queda registrada junto con la responsable, la fecha, la justificación y la actividad del expediente. Si cambia la planificación, el control vuelve a estar pendiente de revisión. Estos registros son parte de la demostración local y pueden modificarse o restablecerse; aún no constituyen una auditoría protegida para un sistema en producción.

## Cómo explicarlo a un cliente

“Vas a poder ver el próximo paso de tu asunto y qué documentación te pide el estudio. Cada tarea explica qué aportar y para qué sirve. La información jurídica y las fechas que correspondan las revisa tu abogado.”

La vista de ejemplo muestra las tareas, documentos e hitos marcados como compartidos. Las notas internas no aparecen en esa pantalla. El cambio de vista no inicia sesión ni aplica permisos de acceso reales: ambas experiencias pertenecen al mismo navegador.

## Qué hace hoy y qué se propone desarrollar

| Área | Esta demo | Producto propuesto |
|---|---|---|
| Expedientes | Crear y recorrer asuntos ficticios, con persistencia en el navegador | Expedientes del estudio con almacenamiento central y acceso autorizado |
| Hitos y documentación | Registrar fechas y textos de respaldo; simular la recepción de un documento | Incorporar y gestionar documentación real con controles de acceso |
| Fechas | Proponer y editar controles internos, contar días simples y registrar una revisión | Evaluar reglas jurídicas verificadas, su versión, excepciones y revisión profesional |
| IA | Contenido preparado y lógica local | Asistencia para organizar antecedentes y proponer tareas o alertas |
| Cliente | Mostrar una vista de tareas y documentos compartidos | Portal con identidad, permisos y comunicación entre partes |
| Trazabilidad | Historial y actividad locales modificables | Registro protegido y verificable, adecuado al uso real |

No hay cuentas, backend, almacenamiento remoto ni conexión a una IA externa. Todos los datos del escenario, incluidas notas y documentos internos, se guardan en `localStorage`. Las vistas filtran la presentación, pero no brindan aislamiento entre usuarios. Usá únicamente datos ficticios en esta entrega.

## Materias de la demostración

El caso principal es **Méndez c/ Sur Logística**, un reclamo laboral ficticio en etapa de conciliación previa. La solicitud se registra el 6 de octubre de 2026 y la audiencia de ejemplo está agendada para el 19 de octubre, a las 10:30. La propuesta de revisar documentación el 13 de octubre es un control interno del estudio, preparado para el recorrido.

Solicitud, audiencia, acta y constancia son hitos distintos, cada uno con su fecha y respaldo. La Ley Nº 18.572 distingue estos actos. Su artículo 6 contempla solicitar una constancia si el trámite no culminó dentro de treinta días desde la solicitud de audiencia, para poder interponer demanda; eso no convierte ese período en un vencimiento automático para demandar. La demo no determina esa procedencia ni calcula ese período.

El expediente **Pereira c/ Costa Servicios** muestra una actuación civil ficticia, con un control interno asociado a una notificación y referencia informativa al CGP. Las referencias no convierten las plantillas de planificación en reglas procesales. En materia laboral, la Ley Nº 18.572 contiene reglas propias de plazos y una integración condicionada con el CGP.

## Guion de 90 segundos

Antes de presentar, usá **Restablecer demo** para volver a los datos originales. Ese botón descarta los cambios locales; podés exportarlos antes si querés conservarlos.

| Tiempo | Acción en pantalla | Qué decir |
|---|---|---|
| 0–15 s | Abrí **Méndez c/ Sur Logística** desde la vista general. | “Este es un asunto laboral ficticio. En un mismo lugar tenemos la solicitud de conciliación, su respaldo, la próxima audiencia y la documentación pendiente.” |
| 15–35 s | Mostrá la propuesta del 13 de octubre y su hito de origen. | “El estudio necesita preparar la documentación. Acá vemos la fecha propuesta, desde qué hito se organizó y los supuestos del control. Es planificación interna; esta demo no calcula un vencimiento jurídico.” |
| 35–55 s | Pulsá **Revisar y confirmar**, comprobá fecha, responsable y justificación, marcá la revisión y pulsá **Confirmar revisión**. | “La profesional revisa los antecedentes, puede ajustar la fecha y deja el motivo. La decisión queda registrada. Si cambia la planificación, requiere otra revisión.” |
| 55–75 s | Pulsá **Vista del cliente**. | “La cliente recibe una tarea concreta: aportar los últimos seis recibos de sueldo. Ve para qué sirven y la fecha de organización confirmada por el estudio.” |
| 75–90 s | Pulsá **Adjuntar documento de ejemplo**. | “Simulamos la incorporación del documento. La tarea queda completada y el estudio puede seguir el avance. Este recorrido muestra cómo conectamos expediente, revisión profesional y colaboración del cliente.” |

El botón de adjuntar no selecciona ni transmite archivos. Cambia el estado de un documento ficticio y completa la tarea asociada. Una consulta escrita desde la vista del cliente se guarda como borrador local; no envía mensajes ni correos.

## Próximo paso: un piloto definido

La demo permite discutir el flujo antes de construir una versión para uso real. Un piloto debería delimitar una materia y una tarea frecuente con abogados participantes, revisar los antecedentes y reglas necesarios y acordar qué se medirá: esfuerzo para preparar el próximo paso, comprensión de la propuesta, documentación reunida y uso recurrente.

También habría que comprobar si el estudio aceptaría incorporar la herramienta y pagar por el valor que observe. Son preguntas por validar: esta entrega no acredita clientes, uso real, ahorro de tiempo ni demanda comercial.

Antes de trabajar con expedientes reales hacen falta, entre otros componentes, identidad y permisos, almacenamiento adecuado, manejo de documentos y una revisión jurídica del flujo elegido. El cómputo normativo requerirá una implementación y validación propias; no está incluido en este prototipo.

## Referencias oficiales

Consultadas el **8 de octubre de 2026**, como información de contexto:

- [Código General del Proceso, aprobado por Ley Nº 15.982](https://www.impo.com.uy/bases/codigo-general-proceso/15982-1988): artículos 93–96 sobre plazos procesales.
- [Ley Nº 18.572 — Ley de abreviación de los juicios laborales](https://www.impo.com.uy/bases/leyes/18572-2009): artículos 3, 4 y 6 sobre conciliación previa; artículos 26 y 31 sobre plazos e integración normativa.
- [MTSS — Audiencias de conciliación](https://www.gub.uy/tramites/audiencias-conciliacion): solicitud, agenda y audiencia presencial.
