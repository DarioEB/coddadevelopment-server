const express = require('express');
const connection = require('./config/db');
const cors = require('cors');

// Server
const app = express();
connection();

// Habilitar Cors
app.use(cors({ credentials: true, origin: true }));
app.options("*", cors());

// Express.json
app.use(express.json({ extended: true }));

// Puerto de la app
const port = process.env.PORT || 4000;

// Rutas
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));
// Run App
app.listen( port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});