const express = require('express');
const router = express.Router();
const { crearCurso, editarCurso, eliminarCurso } = require('../controllers/cursoAdminController');
const authMiddleware = require('../middlewares/authMiddleware');
const soloAdmin = require('../middlewares/soloAdmin');

router.post('/', authMiddleware, soloAdmin, crearCurso);
router.put('/:id', authMiddleware, soloAdmin, editarCurso);
router.delete('/:id', authMiddleware, soloAdmin, eliminarCurso);

module.exports = router;