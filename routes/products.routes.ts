import express from "express";
import { productsController } from "../controllers";

// Crear instancia del enrutador
const router = express.Router();

// Definir rutas y controladores de Usuarios
//prettier-ignore
router
    .route("/products")
    .post(productsController.createProduct)
    .get(productsController.getAllProducts)

//prettier-ignore
router
    .route("/products/:id")    
    .get(productsController.getProductById)
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct);

router.get("/products/category/:category", productsController.getProdyctByCategory);

export default router;
