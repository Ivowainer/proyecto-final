import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
        address: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
