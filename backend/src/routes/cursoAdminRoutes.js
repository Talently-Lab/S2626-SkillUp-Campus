const express = require('express');
const router = express.Router();
const { crearCurso, editarCurso, eliminarCurso } = require('../controllers/cursoAdminController');
const authMiddleware = require('../middlewares/authMiddleware');
const soloAdmin = require('../middlewares/soloAdmin');
const { validacionCrearCurso, validacionEditarCurso, validarId } = require('../middlewares/validacion');

router.post('/', authMiddleware, soloAdmin, validacionCrearCurso, crearCurso);
router.put('/:id', authMiddleware, soloAdmin, validarId, validacionEditarCurso, editarCurso);
router.delete('/:id', authMiddleware, soloAdmin, validarId, eliminarCurso);

module.exports = router;