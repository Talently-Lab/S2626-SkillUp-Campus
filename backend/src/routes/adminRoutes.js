const express = require('express');
const router = express.Router();
const { listarUsuarios, obtenerResumenDashboard } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const soloAdmin = require('../middlewares/soloAdmin');

router.get('/dashboard', authMiddleware, soloAdmin, obtenerResumenDashboard);
router.get('/users', authMiddleware, soloAdmin, listarUsuarios);

module.exports = router;