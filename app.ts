// Importar dependencias necesarias
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { db } from "./database";
import { productsRoutes, userRoutes } from "./routes";

// Crear instancia de Express
const app = express();

// Configuración de middleware
dotenv.config();
app.use(express.json());
app.use(cookieParser());
db.connect();

// Rutas
app.use("/api", userRoutes);
app.use("/api", productsRoutes);

// Inicializar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
