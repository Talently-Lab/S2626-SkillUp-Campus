const { rateLimit } = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Demasiados intentos. Intentá nuevamente en un minuto.' },
});

module.exports = authLimiter;
