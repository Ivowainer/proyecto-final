import mongoose from "mongoose";
import { cartModel } from "../models";
import Cart from "../models/cartModel";
import Product from "../models/productModel";
import { ICart, ICartClassReturn } from "../types";

class CartInstance {
    /* constructor(db) {
        this.db = db;
    }

    db: { connect: () => Promise<void>; disconnect: () => Promise<void> }; */

    async createCart(objectCartInfo: ICart, email: string): Promise<ICartClassReturn> {
        const { address, productId } = objectCartInfo;

        try {
            // Si ya existe un carrito con el mismo mail
            const cartExists = await Cart.findOne({ email });

            if (cartExists) {
                throw { codeRespone: 401, message: "A cart already has been created, please delete them" };
            }

            // Si el product no existe
            const product = await Product.findById(productId);
            if (!product) {
                throw { codeResponse: 400, message: "Product not found" };
            }

            const cart = new Cart({
                email,
                address,
                products: [productId],
            });

            await cart.save();
            return { codeResponse: 200, message: "Cart has been created successfully", cart: cart.toObject() };
        } catch (error) {
            throw { codeResponse: error.code, message: error.message };
        }
    }

    async addProductsInCart(productId: string, email: string): Promise<ICartClassReturn> {
        const product = await Product.findById(productId);
        if (!product) {
            throw { codeResponse: 400, message: "Product not found" };
        }

        try {
            const cart = await Cart.findOneAndUpdate({ email: email }, { $push: { products: productId } }, { new: true });
            if (!cart) {
                throw { codeResponse: 400, message: "Please create a cart" };
            }

            return { codeResponse: 200, message: "Product added to cart successfully", cart: cart.toObject() };
        } catch (error) {
            throw { codeResponse: error.code, message: error.message };
        }
    }
}

export default CartInstance;
