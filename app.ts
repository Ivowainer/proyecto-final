// Importar dependencias necesarias
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import ejs from "ejs";

import { db } from "./database";
import { productsRoutes, userRoutes } from "./routes";
import { checkAuth } from "./middleware";
import cartRoutes from "./routes/cart.routes";

// Crear instancia de Express
const app = express();

// Configuración de middleware
dotenv.config();
app.use(express.json());
app.use(cookieParser());
db.connect();

// Configurar el motor de plantillas EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Rutas
app.use("/api", userRoutes);
app.use("/api", productsRoutes);
app.use("/api", cartRoutes);

// Inicializar servidor
const PORT = process.env.PORT || 3000;

// Definir la ruta para la vista index.ejs
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/productos", checkAuth, (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
