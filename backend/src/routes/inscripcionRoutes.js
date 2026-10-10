const express = require('express');
const router = express.Router();
const { inscribirse, misInscripciones } = require('../controllers/inscripcionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/cursos/:id/inscripcion', authMiddleware, inscribirse);
router.get('/mis-inscripciones', authMiddleware, misInscripciones);

module.exports = router;