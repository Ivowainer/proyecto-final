import express from "express";
import { usersController } from "../controllers";
import { checkAuth } from "../middleware";
import { jwtFunc } from "../utils";

// Crear instancia del enrutador
const router = express.Router();

// Definir rutas y controladores de Usuarios
//prettier-ignore
router
    .route("/users")
    .post(usersController.createUser)
    .get(usersController.getAllUsers)

//prettier-ignore
router
    .route("/users/:id")    
    .get(usersController.getUserById)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);

export default router;
