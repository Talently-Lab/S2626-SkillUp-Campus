# Contratos de API — SkillUp Campus

> Versión revisada y acordada entre Backend (Brisa + Leo).

## Formato de error de validación (estándar para todos los endpoints)

Basado en RFC 7807, usado cuando falla la validación de datos de entrada (400):

```json
{
  "status": 400,
  "code": "VALIDATION_ERROR",
  "message": "La solicitud contiene datos inválidos o incompletos.",
  "errors": [
    {
      "field": "email",
      "message": "El correo electrónico es obligatorio.",
      "code": "FIELD_REQUIRED"
    },
    {
      "field": "password",
      "message": "La contraseña debe tener al menos 8 caracteres.",
      "code": "INVALID_LENGTH"
    }
  ]
}
```

Este formato aplica a cualquier endpoint que reciba `Body` y pueda fallar por datos inválidos o incompletos (registro, login, crear/editar curso, etc.).

## Autenticación

### Registrar usuario
```
POST /api/auth/register
Body: { nombre, email, password }
Response 201: { id, nombre, email, rol }
Response 400: (ver formato de error de validación)
Response 409: { error: "Email ya registrado" }
```

### Login
```
POST /api/auth/login
Body: { email, password }
Response 200: { token, usuario: { id, nombre, rol } }
Response 400: (ver formato de error de validación)
Response 401: { error: "Credenciales inválidas" }
```

## Cursos

### Listar cursos (catálogo público, con paginación)
```
GET /api/cursos?page=1&limit=10
Response 200: {
  data: [ { id, titulo, descripcion, cupo_maximo, activo } ],
  pagination: { page, limit, total, totalPages }
}
```

### Ver detalle de un curso
```
GET /api/cursos/:id
Response 200: { id, titulo, descripcion, cupo_maximo, activo, clases: [...] }
Response 404: { error: "Curso no encontrado" }
```

### Crear curso (admin)
```
POST /api/cursos
Headers: Authorization: Bearer <token>
Body: { titulo, descripcion, cupo_maximo }
Response 201: { id, titulo, descripcion, cupo_maximo, activo }
Response 400: (ver formato de error de validación)
Response 403: { error: "No tenés permisos para esta acción" }
```

### Editar curso (admin)
```
PUT /api/cursos/:id
Headers: Authorization: Bearer <token>
Body: { titulo, descripcion, cupo_maximo, activo }
Response 200: { id, titulo, descripcion, cupo_maximo, activo }
Response 400: (ver formato de error de validación)
```

### Eliminar curso (admin, soft delete)
```
DELETE /api/cursos/:id
Headers: Authorization: Bearer <token>
Response 200: { message: "Curso desactivado" }
```

### Ver inscriptos de un curso (admin)
```
GET /api/cursos/:id/inscriptos
Headers: Authorization: Bearer <token>
Response 200: [ { usuario: { id, nombre, email }, fecha_inscripcion, estado } ]
Response 403: { error: "No tenés permisos para esta acción" }
Response 404: { error: "Curso no encontrado" }
```

## Clases

### Ver clases de un curso (requiere inscripción activa)
```
GET /api/cursos/:id/clases
Headers: Authorization: Bearer <token>
Response 200: [ { id, titulo, contenido, orden } ]
Response 403: { error: "No estás inscripto en este curso" }
```

## Inscripciones

### Inscribirse a un curso
```
POST /api/cursos/:id/inscripcion
Headers: Authorization: Bearer <token>
Response 201: { id, usuario_id, curso_id, fecha_inscripcion, estado }
Response 409: { error: "Ya estás inscripto en este curso" }
```

### Ver mis inscripciones (panel del alumno)
```
GET /api/mis-inscripciones
Headers: Authorization: Bearer <token>
Response 200: [ { curso: {...}, fecha_inscripcion, estado } ]
```

---

## Valores posibles para campos enumerados

### `rol` (tabla usuarios)
- `alumno` (default)
- `admin`

### `estado` (tabla inscripciones)
- `activo` (default)
- `inactivo`

---

## Definiciones cerradas (25/09/2026)

- ✅ Códigos de error consistentes (400, 401, 403, 404, 409) confirmados para todos los endpoints.
- ✅ Paginación agregada a `GET /api/cursos`.
- ✅ Nuevo endpoint `GET /api/cursos/:id/inscriptos` para que el admin vea la lista de inscriptos.
- ✅ Formato de error de validación estandarizado (RFC 7807 simplificado), aplicado a todos los endpoints con `Body`.
- ✅ Valores confirmados para `rol` (alumno/admin) y `estado` de inscripciones (activo/inactivo).