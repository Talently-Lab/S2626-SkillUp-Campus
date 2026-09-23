// Inicialización del servidor
const express = require('express');
const pool = require('./config/db');
const app = express();

app.get('/', (req, res) => {
    res.send('Hola, el servidor está funcionando');
});

app.get('/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ status: 'ok', db_time: result.rows[0].now });
    } catch (error) {
        console.error('Error al verificar la salud de la base de datos:', error);
        res.status(500).json({ status: 'error', message: 'Error al verificar la salud de la base de datos' });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor iniciado en http://localhost:${process.env.PORT || 3000}`);
});