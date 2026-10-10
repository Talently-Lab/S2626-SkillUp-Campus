const express = require('express');
const router = express.Router();
const { inscribirse } = require('../controllers/inscripcionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/cursos/:id/inscripcion', authMiddleware, inscribirse);

module.exports = router;