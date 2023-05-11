// Importar dependencias necesarias
import express from "express";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import path from "path";

import { db } from "./database";
import { productsRoutes, userRoutes } from "./routes";
import { checkAuth } from "./middleware";
import cartRoutes from "./routes/cart.routes";
import Message from "./models/messageModel";
import mongoose from "mongoose";

// Crear instancia de Express y Socket
const app = express();
const server = http.createServer(app);
const io = new Server(server);

/*============================ MID ============================*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();
db.connect();

// Configurar el motor de plantillas EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/*============================ ROUTES ============================*/
app.use("/api", userRoutes);
app.use("/api", productsRoutes);
app.use("/api", cartRoutes);

// Inicializar servidor
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

/*============================ VIEW ============================*/
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/chat", checkAuth, (req: any, res) => {
    res.locals.user = req.user;
    res.render("chat");
});

/*============================ SOCKETS ============================*/
io.on("connection", (socket) => {
    console.log("Un nuevo cliente se ha conectado " + socket.id);

    // Busca los mensajes anteriores en la base de datos y los envía al cliente
    Message.find({})
        .sort({ date: "desc" })
        .limit(10)
        .exec()
        .then((messages) => {
            socket.emit("messageHistory", messages.reverse());
        })
        .catch((err) => {
            console.error("Error al buscar los mensajes anteriores:", err);
        });

    socket.on("sendMessage", async (data) => {
        try {
            // Crea un nuevo documento de mensaje
            const message = new Message({
                email: data.email,
                type: "usuario",
                body: data.message,
            });

            // Guarda el documento en la base de datos
            await message.save({ validateBeforeSave: false });
            console.log(`Mensaje guardado en la base de datos: ${message._id}`);

            // Emite un evento "newMessage" a todos los clientes conectados, con el mensaje recibido
            io.emit("newMessage", { message: data.message });
        } catch (err) {
            console.error("Error al guardar el mensaje en la base de datos:", err);
        }
    });

    socket.on("disconnect", () => {
        console.log("Un cliente se ha desconectado " + socket.id);
    });
});
