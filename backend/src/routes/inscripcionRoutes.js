const express = require('express');
const router = express.Router();
const { inscribirse, misInscripciones, inscriptosDeCurso } = require('../controllers/inscripcionController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validarId } = require('../middlewares/validacion');
const soloAdmin = require('../middlewares/soloAdmin');

router.post('/cursos/:id/inscripcion', authMiddleware, validarId, inscribirse);
router.get('/mis-inscripciones', authMiddleware, misInscripciones);
router.get('/cursos/:id/inscriptos', authMiddleware, soloAdmin, inscriptosDeCurso);

module.exports = router;