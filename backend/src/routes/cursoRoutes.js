const express = require('express');
const router = express.Router();
const { obtenerCursos, obtenerCursoPorId } = require('../controllers/cursoController');
const { validarId, validarPaginacion } = require('../middlewares/validacion');

router.get('/', validarPaginacion, obtenerCursos);
router.get('/:id', validarId, obtenerCursoPorId);

module.exports = router;