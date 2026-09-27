// Inicialización del servidor
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola, el servidor está funcionando');
});

app.get('/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW ()');
        res.json({ status: 'ok', db_time: result.rows[0].now });
    } catch (error) {
        console.error('Error al verificar la salud de la base de datos:', error);
        res.status(500).json({ status: 'error', message: 'Error al verificar la salud de la base de datos' });
    }
});

app.listen('3000', () =>{
    console.log('Servidor iniciado en http://localhost:3000');
});