const express = require('express');
const router = express.Router();
const { inscribirse, misInscripciones, inscriptosDeCurso } = require('../controllers/inscripcionController');
const authMiddleware = require('../middlewares/authMiddleware');
const soloAdmin = require('../middlewares/soloAdmin');

router.post('/cursos/:id/inscripcion', authMiddleware, inscribirse);
router.get('/mis-inscripciones', authMiddleware, misInscripciones);
router.get('/cursos/:id/inscriptos', authMiddleware, soloAdmin, inscriptosDeCurso);

module.exports = router;