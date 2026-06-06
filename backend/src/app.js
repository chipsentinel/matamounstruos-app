// Importacion de dependencias
const express = require('express'); // importar express para crear el servidor
const cors = require('cors');       // importar cors para permitir peticiones del frontend
require('dotenv').config();         // cargar variables de entorno desde .env

// crear la aplicacion de express
const app = express();

// usar el puerto del .env o 3000 por defecto
const PORT = process.env.PORT || 3000;

app.use(cors());         // activar cors en todas las rutas
app.use(express.json()); // permitir que express lea datos en formato JSON

// ruta de prueba para comprobar que la API funciona
app.get('/', (req, res) => {
    res.json({
        message: 'API Matamounstruos operativa'
    });
});

// arrancar el servidor en el puerto configurado
app.listen(PORT, () => {
    console.log(`Servidor conectado en http://localhost:${PORT}`);
});
