const express = require('express');
const router = express.Router();
const { obtenerCursos, obtenerCursoPorId } = require('../controllers/cursoController');

router.get('/', obtenerCursos);
router.get('/:id', obtenerCursoPorId);

module.exports = router;