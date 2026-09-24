# Contratos de API — SkillUp Campus

> Borrador inicial.

## Autenticación

### Registrar usuario
```
POST /api/auth/register
Body: { nombre, email, password }
Response 201: { id, nombre, email, rol }
Response 400: { error: "Email ya registrado" }
```

### Login
```
POST /api/auth/login
Body: { email, password }
Response 200: { token, usuario: { id, nombre, rol } }
Response 401: { error: "Credenciales inválidas" }
```

## Cursos

### Listar cursos (catálogo público)
```
GET /api/cursos
Response 200: [ { id, titulo, descripcion, cupo_maximo, activo } ]
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
Response 403: { error: "No tenés permisos para esta acción" }
```

### Editar curso (admin)
```
PUT /api/cursos/:id
Headers: Authorization: Bearer <token>
Body: { titulo, descripcion, cupo_maximo, activo }
Response 200: { id, titulo, descripcion, cupo_maximo, activo }
```

### Eliminar curso (admin, soft delete)
```
DELETE /api/cursos/:id
Headers: Authorization: Bearer <token>
Response 200: { message: "Curso desactivado" }
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

## Pendiente de definir entre los dos

- [ ] ¿Confirmamos códigos de error consistentes (400, 401, 403, 404, 409) para todos los endpoints?
- [ ] ¿Necesitamos paginación en `GET /api/cursos` si hay muchos cursos?
- [ ] ¿El admin puede ver la lista de inscriptos por curso? (endpoint no definido todavía)
- [ ] ¿Formato exacto de errores de validación (ej: campos vacíos en registro)?
