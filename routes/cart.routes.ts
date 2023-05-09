import express from "express";
import { cartsController, productsController } from "../controllers";
import { checkAuth } from "../middleware";

// Crear instancia del enrutador
const router = express.Router();

// Definir rutas y controladores de Carrito
//prettier-ignore
router
    .route("/cart")
    .post(checkAuth, cartsController.createCart)
    .get(checkAuth, cartsController.getCart)

//prettier-ignore
router
    .route("/cart/:productId")
    .put(checkAuth, cartsController.addProductsInCart)
    .delete(checkAuth, cartsController.removeProductsInCart)
/* .get(productsController.getAllProducts) */

export default router;
