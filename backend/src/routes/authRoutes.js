const express = require('express');
const router = express.Router();
const { registrar, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validacionLogin, validacionRegistro } = require('../middlewares/validacion');

router.post('/register', validacionRegistro, registrar);
router.post('/login', validacionLogin, login);

router.get('/perfil', authMiddleware, (req, res) => {
  res.json({ message: 'Acceso concedido', usuario: req.usuario });
});

module.exports = router;