// Importar dependencias necesarias
import express from "express";
import dotenv from "dotenv";

import router from "./routes/router";
import { db } from "./database";

// Crear instancia de Express
const app = express();

// Configuración de middleware
dotenv.config();
app.use(express.json());
db.connect();

// Rutas
app.use(router);

// Inicializar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
