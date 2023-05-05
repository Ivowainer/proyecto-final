import express from "express";
import { usersController } from "../controllers";

// Crear instancia del enrutador
const router = express.Router();

// Definir rutas y controladores
router.post("/users", usersController.createUser);
router.get("/users", usersController.getAllUsers);

router.get("/users/:id", usersController.getUserById);
router.put("/users/:id", usersController.updateUser);
router.delete("/users/:id", usersController.deleteUser);

export default router;
