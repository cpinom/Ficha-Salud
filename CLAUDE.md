# Ficha de Salud INACAP — Frontend Angular

App para **alumnos** (completan fichas de salud de pacientes atendidos en asignaturas clínicas) y **docentes** (ven sus cursos, asignan fichas a estudiantes y revisan/comentan las fichas). Maneja datos de salud sensibles: priorizar seguridad y privacidad.

## Arquitectura

- **Frontend (este repo):** Angular 17, NgModules con lazy loading, Angular Material + ng-bootstrap + Bootstrap 5, jQuery/chosen-js/air-datepicker (legacy), ngx-toastr.
  - `src/app/pages/estudiantes/*` — vistas del alumno (listado, detalle-ficha, editar-ficha).
  - `src/app/pages/docentes/*` — tablero docente, detalle-curso, asignar-ficha, ficha-estudiante/detalle-ficha.
  - `src/app/core/components/ficha-dinamica` + `control-renderer` — render dinámico de la ficha desde la definición que entrega el backend (grupos → campos; plantilla HTML por grupo con `<control-slot>`).
  - `src/app/core/services/` — `http.service.ts` (base), `alumno.service.ts`, `docente.service.ts`, `spinner.interceptor.ts`.
  - Config de usuario (id, nombre, rol, preferencias, baseUrl) se inyecta en `window.config` desde `Views/Home/Index.cshtml` del backend; en dev viene de `src/index.html`.
- **Backend:** `C:\Proyectos\.NET\Inacap.FichasdeSalud` — ASP.NET Web API 2 / MVC 5 sobre .NET Framework 4.7.1, Oracle (`Oracle.DataAccess`), todo vía stored procedures `SIGA.PKG_FICHAS_SALUD.*` (el PL/SQL no está en el repo).
  - Controladores: `AlumnoController` (Roles=Alumno), `DocenteController` (Roles=Docente), `TableroDocenteController`, `TableroEstudianteController`, `BaseController`, `HomeController` (MVC, sirve la SPA).
  - Auth: cookie `HTPSESIONIC` validada con `SessionValidationFilter` → `db.ValidarAcceso`. Con `AMBIENTE=LOCAL` usa `SESI_CCOD` fijo del Web.config.
  - Las respuestas siguen el patrón `Ok(new { success, data, message })` (errores también con HTTP 200).
- **Dev:** `npm start` (proxy `/api` → `http://localhost:59353/`, ver `proxy.conf.json`). `ng build` escribe directo en `C:/Proyectos/.NET/Inacap.FichasdeSalud/Inacap.FichasdeSalud/App` y los bundles con hash están referenciados a mano en `Index.cshtml`.

## Convenciones

- Idioma del código y UI: español.
- Nombres de IDs del dominio (Oracle): `persNcorr` (persona), `seccCcod`/`ssecNcorr` (sección/subsección), `asigCcod` (asignatura), `fisaNcorr` (ficha asignada), `fsclNcorr` (ficha clínica del alumno), `fsvaNcorr` (valor/adjunto), `fspaNcorr` (paciente), `periCcod` (período).

---

## Revisión completa (2026-11-16) — backlog pendiente

Nada de esto está corregido aún. Al retomar, preguntar al usuario por cuál empezar. Orden sugerido: Crítico backend → Crítico frontend → Alto.

### 🔴 Crítico — seguridad backend
1. **`api/v1/descargar-archivo` sin autenticación** (`Controllers/BaseController.cs:115`): `BaseController` es concreto y sin `[SessionValidationFilter]` → Web API lo registra como controlador. Cualquiera descarga adjuntos enumerando `fsclNcorr`/`fsvaNcorr`. Fix: hacer `BaseController` `abstract`, mover el endpoint a un controlador filtrado y validar propiedad.
2. **Endpoints de docente accesibles por alumnos:** `TableroDocenteController` tiene `[SessionValidationFilter]` sin `Roles` → `docentes/detalle-ficha-asignatura` y `docentes/terminar-revision-ficha` abiertos a cualquier sesión. Igual `TableroEstudianteController` (`geteditfichastudent/{persNcorr}`, `updatefichastudent` acepta JSON arbitrario).
3. **IDOR:** `estudiantes/detalle-ficha` usa `persNcorr` de la query (no `PersonaId`); `estudiantes/guardar-ficha` escribe en cualquier `fsclNcorr`; `docentes/estudiantes` y `docentes/fichas-estudiantes` no verifican que la sección sea del docente. Fix: identidad siempre desde sesión + validar propiedad (en C# o en los SP; verificar el PL/SQL).
4. **XSS almacenado** (frontend, afecta al docente): `src/app/core/components/ficha-detalle/ficha-detalle.component.ts:71-93` usa `host.innerHTML` con `valor` y `nombre_archivo` escritos por el alumno. También `bypassSecurityTrustHtml(grupo.plantilla)` en `ficha-dinamica.component.ts:42` y `ficha-detalle.component.ts:29`.
5. **Web.config:** `AKORACLE=connPlanificadorProd` (local contra BD de producción); `AMBIENTE=LOCAL` + `SESI_CCOD` fijo salta la auth y `Web.Release.config` no lo sobrescribe (verificar `conexionNet.config` del servidor); `customErrors Off`, `debug=true`; todas las respuestas exponen `ex.Message`.

### 🔴 Crítico — funcionalidad frontend
6. **Adjuntos del alumno nunca se envían:** `src/app/pages/estudiantes/editar-ficha/editar-ficha.component.ts:70` compara `instanceof File` pero el control guarda `File[]` (`file-input-wrapper.component.ts:211`). Además `panelHidden` envía el `File[]` serializado como texto. Referencia correcta: `asignar-ficha.component.ts:195`.
7. **Campos NUMBER/DECIMAL/DATE/BOOLEAN solo lectura:** `control-renderer.component.ts:21-27` solo mapea SELECT/FILE/TEXTAREA/TEXT; el resto cae en `LabelValueComponent`. Si es obligatorio, la ficha no se puede enviar y no se muestra error.

### 🟠 Alto
- Autoguardado (`editar-ficha.component.ts:129-174`, `borrador:1`) puede llegar después del envío final y devolver la ficha a borrador (backend cambia estado en cada guardado). Serializar guardados o que el parcial no cambie estado.
- `asignar-ficha.component.ts:344,358`: `guardarFichaPaciente`/`guardarCamposFicha` tragan el error y `asignarFicha` continúa; sin mensaje si `!success` (`:426`).
- `buscarPaciente` (`asignar-ficha.component.ts:60-67,140-147`): si el RUT no existe no limpia nombre/dirección/etc. del paciente anterior; búsquedas sin cancelar; `catch` vacío.
- `src/app/pages/estudiantes/estudiantes.component.html:129`: `(pageChange)="cargar()"` → debe ser `cargarFichas()` (hoy salta al primer curso).
- `console.log` con datos de salud (detalle-ficha docente/alumno, editar-ficha, detalle-curso, ficha-estudiante, gestionservices) y `debugger` en `asignar-ficha.component.ts:151,421`, `docentes.component.ts:62`, `app.component.ts:45`, `detalle-curso.component.ts:58`.
- `Filters/SessionValidationFilter.cs`: usuario ni alumno ni docente pasa cualquier rol; usuario con ambos roles queda bloqueado como alumno.
- `Views/Home/Index.cshtml:35-38`: `@Html.Raw(ViewBag.Usuario/Preferencias)` dentro de `<script>` (preferencias las guarda el cliente vía `api/v1/preferencias`). Serializar con `JsonConvert`.

### 🟡 Medio
- Frontend:
  - Sin guards de ruta por rol (`app-routing.module.ts`).
  - Al recargar con F5 se pierde `history.state` y la vista rompe (asignar-ficha, ficha-dinamica, editar-ficha, detalle-ficha docente).
  - Componentes dinámicos sin `destroy()`: leak en `control-renderer`.
  - Spinner booleano no soporta peticiones concurrentes (usar contador).
  - Query strings sin codificar: usar `HttpParams`.
  - Validadores (`multiValidator.ts`) demasiado restrictivos o inconsistentes:
    - Texto rechaza `¿?¡!@&`.
    - Teléfono solo acepta móviles.
    - `edad` min 18.
    - RUT con puntos: válido en `rut-utils` e inválido en `multiValidator`.
  - `multiValidator` hace `disable()`/`enable()` dentro del validador.
  - Etiqueta "Fecha de atención" en un campo que es `fechaNacimiento`; datepicker sin `maxDate`.
  - Docente:
    - `terminarRevision` sin validar `form.valid` ni pedir confirmación.
    - Cada visita a asignar-ficha crea un borrador huérfano.
    - Re-subida de todos los archivos en cada `panelHidden`.
    - Código muerto en `:360-415`.
  - Listado del alumno:
    - Carreras en `cargarFichas`.
    - Cambiar filtro o tamaño de página no resetea `page`.
- Backend:
  - `PersonaId`/`PersonaRut` consultan la BD en cada acceso (N+1 en `DocenteController.GetAsignaturas`).
  - Cast `(DateTime)` de `FSVA_FVALOR` falla si es null.
  - Tipo de campo deducido por `campo.Count == 2/4`.
  - Sin validación de tamaño/tipo en uploads.
  - `HomeController` falla con null si no hay preferencias; `Response.Redirect` sin `return`.
  - Errores devueltos con HTTP 200.

### 🟢 Bajo
- Código muerto:
  - `gestionservices.service.ts` (sus endpoints están comentados en el backend).
  - `alertservice.service.ts` (duplica `alert.service.ts`).
  - `src/app/shared/` (DataTableDirective).
  - `bio.validators.ts`, `temperature.validator.ts`, `text.validator.ts`.
  - `environments.ts`.
  - Bloques comentados en `file-input-wrapper`.
  - Endpoints comentados en `TableroDocenteController`.
- Migrar jQuery/chosen/air-datepicker a Material o ng-bootstrap.
- `any` en todos lados; sin tests reales.
- Angular 17 sin soporte.
- `moment` sin uso real.
- Font Awesome 4.7 sin uso ni SRI en `index.html`.
- `fichasdesalud.zip` versionado en git.
- `angular.json`: `proxyConfig` apunta a `src/proxy.conf.json`, que no existe.
- Header: `applyClass` agrega la clase `"undefined"` y `returnClassIndex` falla con `fontSize` indefinido.
- Accesibilidad:
  - `lang="en"`.
  - `<a (click)>` sin `href`.
  - Botones de solo icono sin `aria-label`.
  - `<th sortable>` sin clave.
  - `alert()` nativo.
- Backend sin repositorio git.

### Cambios sin commitear al momento de la revisión
`ssecNcorr`/`subseccionId`/`fspaNcorr` coinciden con el backend. Pendiente antes de commitear:
- Quitar `debugger` nuevos (`asignar-ficha.component.ts:151`, `docentes.component.ts:62`).
- `ssecNcorr?` opcional en `docente.service.ts` pero el backend lo exige como `int`.
- El patch de `fspaNcorr` en búsqueda de paciente no limpia el resto del formulario.
