import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, default: "The description of the product is bla bla bla" },
        category: { type: String, default: "photography", required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
