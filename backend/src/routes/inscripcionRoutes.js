const express = require('express');
const router = express.Router();
const { inscribirse, misInscripciones } = require('../controllers/inscripcionController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validarId } = require('../middlewares/validacion');

router.post('/cursos/:id/inscripcion', authMiddleware, validarId, inscribirse);
router.get('/mis-inscripciones', authMiddleware, misInscripciones);

module.exports = router;