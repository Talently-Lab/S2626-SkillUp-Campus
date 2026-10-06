const express = require('express');
const router = express.Router();
const { registrar, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', registrar);
router.post('/login', login);

router.get('/perfil', authMiddleware, (req, res) => {
  res.json({ message: 'Acceso concedido', usuario: req.usuario });
});

module.exports = router;