const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL_CHARACTERS_REGEX = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

const crearErrorValidacion = (errors) => {
  const error = new Error('La solicitud contiene datos inválidos o incompletos.');
  error.status = 400;
  error.code = 'VALIDATION_ERROR';
  error.errors = errors;
  return error;
};

const validarBody = (schema, { alMenosUnCampo = false } = {}) => (req, res, next) => {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return next(crearErrorValidacion([{
      field: 'body',
      message: 'Debe enviar un objeto JSON.',
      code: 'INVALID_TYPE',
    }]));
  }

  const errors = [];
  const campos = Object.keys(schema);

  Object.keys(req.body).forEach((field) => {
    if (!campos.includes(field)) {
      errors.push({
        field,
        message: 'Este campo no está permitido.',
        code: 'UNKNOWN_FIELD',
      });
    }
  });

  let camposPresentes = 0;
  campos.forEach((field) => {
    const regla = schema[field];
    const value = req.body[field];

    if (value === undefined) {
      if (regla.required) {
        errors.push({ field, message: 'Este campo es obligatorio.', code: 'REQUIRED' });
      }
      return;
    }

    camposPresentes += 1;
    if (value === null && regla.nullable) return;

    if (regla.type === 'string') {
      if (typeof value !== 'string') {
        errors.push({ field, message: 'Debe ser texto.', code: 'INVALID_TYPE' });
        return;
      }

      const sanitized = regla.trim === false ? value : value.trim();
      req.body[field] = regla.normalize ? regla.normalize(sanitized) : sanitized;

      if (CONTROL_CHARACTERS_REGEX.test(req.body[field])) {
        errors.push({ field, message: 'Contiene caracteres no permitidos.', code: 'INVALID_VALUE' });
      }
      if (regla.minLength && req.body[field].length < regla.minLength) {
        errors.push({
          field,
          message: `Debe tener al menos ${regla.minLength} caracteres.`,
          code: 'INVALID_LENGTH',
        });
      }
      if (regla.maxLength && req.body[field].length > regla.maxLength) {
        errors.push({
          field,
          message: `No puede superar ${regla.maxLength} caracteres.`,
          code: 'INVALID_LENGTH',
        });
      }
      if (regla.maxBytes && Buffer.byteLength(req.body[field], 'utf8') > regla.maxBytes) {
        errors.push({
          field,
          message: `No puede superar ${regla.maxBytes} bytes.`,
          code: 'INVALID_LENGTH',
        });
      }
      if (regla.pattern && !regla.pattern.test(req.body[field])) {
        errors.push({ field, message: regla.patternMessage, code: 'INVALID_VALUE' });
      }
      return;
    }

    if (regla.type === 'integer') {
      const parsed = typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : value;
      if (!Number.isSafeInteger(parsed) || (regla.min !== undefined && parsed < regla.min)) {
        errors.push({ field, message: regla.message, code: 'INVALID_VALUE' });
      } else {
        req.body[field] = parsed;
      }
      return;
    }

    if (regla.type === 'boolean' && typeof value !== 'boolean') {
      errors.push({ field, message: 'Debe ser un valor booleano.', code: 'INVALID_TYPE' });
    }
  });

  if (alMenosUnCampo && camposPresentes === 0) {
    errors.push({
      field: 'body',
      message: 'Debe enviar al menos un campo para actualizar.',
      code: 'REQUIRED',
    });
  }

  if (errors.length > 0) return next(crearErrorValidacion(errors));
  return next();
};

const validarId = (req, res, next) => {
  if (!/^\d+$/.test(req.params.id) || !Number.isSafeInteger(Number(req.params.id)) || Number(req.params.id) < 1) {
    return next(crearErrorValidacion([{
      field: 'id',
      message: 'Debe ser un identificador entero positivo.',
      code: 'INVALID_VALUE',
    }]));
  }
  req.params.id = Number(req.params.id);
  return next();
};

const validarPaginacion = (req, res, next) => {
  const errors = [];
  const pagination = {};
  ['page', 'limit'].forEach((field) => {
    if (req.query[field] === undefined) return;
    if (!/^\d+$/.test(req.query[field]) || !Number.isSafeInteger(Number(req.query[field])) || Number(req.query[field]) < 1) {
      errors.push({
        field,
        message: 'Debe ser un entero positivo.',
        code: 'INVALID_VALUE',
      });
      return;
    }
    pagination[field] = Number(req.query[field]);
  });

  const page = pagination.page || 1;
  const limit = Math.min(pagination.limit || 10, 100);
  if (!Number.isSafeInteger((page - 1) * limit)) {
    errors.push({
      field: 'page',
      message: 'El número de página es demasiado grande.',
      code: 'INVALID_VALUE',
    });
  }

  if (errors.length > 0) return next(crearErrorValidacion(errors));
  req.validatedPagination = { page, limit };
  return next();
};

const validacionRegistro = validarBody({
  nombre: { type: 'string', required: true, minLength: 2, maxLength: 255 },
  email: {
    type: 'string',
    required: true,
    maxLength: 254,
    normalize: (value) => value.toLowerCase(),
    pattern: EMAIL_REGEX,
    patternMessage: 'Debe ser una dirección de email válida.',
  },
  password: { type: 'string', required: true, trim: false, minLength: 8, maxBytes: 72 },
});

const validacionLogin = validarBody({
  email: {
    type: 'string',
    required: true,
    maxLength: 254,
    normalize: (value) => value.toLowerCase(),
    pattern: EMAIL_REGEX,
    patternMessage: 'Debe ser una dirección de email válida.',
  },
  password: { type: 'string', required: true, trim: false, minLength: 1, maxBytes: 72 },
});

const camposCurso = {
  titulo: { type: 'string', required: true, minLength: 1, maxLength: 150 },
  descripcion: { type: 'string', maxLength: 10000, nullable: true },
  cupo_maximo: {
    type: 'integer',
    min: 1,
    message: 'Debe ser un entero mayor que cero.',
    nullable: true,
  },
  area_aprendizaje: { type: 'string', maxLength: 50, nullable: true },
  nivel: { type: 'string', maxLength: 20, nullable: true },
  modalidad: { type: 'string', maxLength: 20, nullable: true },
  duracion: { type: 'string', maxLength: 30, nullable: true },
  imagen_url: { type: 'string', maxLength: 500, nullable: true },
};

const validacionCrearCurso = validarBody(camposCurso);
const validacionEditarCurso = validarBody({
  ...camposCurso,
  titulo: { ...camposCurso.titulo, required: false },
  activo: { type: 'boolean' },
}, { alMenosUnCampo: true });

module.exports = {
  validacionCrearCurso,
  validacionEditarCurso,
  validacionLogin,
  validacionRegistro,
  validarId,
  validarPaginacion,
};
