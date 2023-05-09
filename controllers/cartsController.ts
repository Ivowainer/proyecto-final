import CartInstance from "../daos/CartDAOS";

const mainCartInstance = new CartInstance();

export const createCart = async (req, res) => {
    try {
        const { codeResponse, message, cart } = await mainCartInstance.createCart(req.body, req.user.email);
        res.status(codeResponse).json({ message, cart });
    } catch (error) {
        res.status(404).json({ codeResponse: error.codeResponse, message: error.message });
    }
};

export const addProductsInCart = async (req, res) => {
    try {
        const { codeResponse, message, cart } = await mainCartInstance.addProductsInCart(req.body.productId, req.user.email);
        res.status(codeResponse).json({ message, cart });
    } catch (error) {
        res.status(404).json({ codeResponse: error.codeResponse, message: error.message });
    }
};
