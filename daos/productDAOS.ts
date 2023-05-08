import Product from "../models/productModel";
import { IProductClassReturn } from "../types";

class ProductInstance {
    /* constructor(db) {
        this.db = db;
    }

    db: { connect: () => Promise<void>; disconnect: () => Promise<void> }; */

    async createProduct(objectProductInfo): Promise<IProductClassReturn> {
        const { title, description, image, price } = objectProductInfo;

        // Validation
        if (!title || title?.length < 6) throw { codeRepsonse: 403, message: "The title must contain at least 6 characters" };
        if (!title || description?.length < 3) throw { codeRepsonse: 403, message: "The description must contain at least 8 characters" };
        if (!image) throw { codeRepsonse: 403, message: "The image doesn't exists" };
        if (!price) throw { codeRepsonse: 403, message: "The price doesn't exists" };

        try {
            // Product Create
            const product = await Product.findOne({ title }).lean();

            if (product) {
                throw { codeResponse: 400, message: "Product title already exists" };
            }

            const newProduct = new Product({
                title: title?.toLowerCase(),
                description: description?.toLowerCase(),
                image: image?.toLowerCase(),
                price,
            });

            await newProduct.save({ validateBeforeSave: true });

            return {
                codeResponse: 200,
                message: "The product has been created successfully",
                product: newProduct.toObject(),
            };
        } catch (error) {
            throw { codeResponse: error.code, message: error.message };
        }
    }

    async getAllProducts(): Promise<IProductClassReturn> {
        try {
            const allProducts = await Product.find().select("-__v");
            return { codeResponse: 200, message: "All Products", products: allProducts.map((val) => val.toObject()) };
        } catch (error) {
            throw { codeResponse: error.code, message: error.message };
        }
    }

    async getProductById(id: string): Promise<IProductClassReturn> {
        try {
            const product = await Product.findById(id).select("-__v");

            if (!product) {
                throw { codeResponse: 404, message: "The product doesn't exists" };
            }

            return { codeResponse: 200, message: `Product by id: ${id}`, product: product.toObject() };
        } catch (error) {
            throw { codeResponse: error.code, message: error.message };
        }
    }

    async updateProduct(objectProductInfo, id: string): Promise<IProductClassReturn> {
        const { title, description, image, price } = objectProductInfo;

        // Validation
        if (title && title.length < 3) throw { codeRepsonse: 403, message: "The name must contain at least 3 characters" };
        if (description && description.length < 6) throw { codeRepsonse: 403, message: "The description must contain at least 6 characters" };

        try {
            const productUpdated = await Product.findByIdAndUpdate(id, { title, description, price, image }, { new: true });

            const product = await productUpdated.save();

            return { codeResponse: 200, message: "The product has been updated successfully", product: productUpdated.toObject() };
        } catch (error) {
            throw { codeResponse: error.code, message: error.message };
        }
    }

    async deleteProduct(id): Promise<IProductClassReturn> {
        try {
            const productDeleted = await Product.findOneAndDelete(id);

            return { codeResponse: 200, message: "The product has been deleted successfully" };
        } catch (error) {
            throw { codeResponse: error.code, message: error.message };
        }
    }
}

export default ProductInstance;
