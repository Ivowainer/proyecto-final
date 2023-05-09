import ProductInstance from "../daos/productDAOS";

const mainProductInstance = new ProductInstance();

export const createProduct = async (req, res) => {
    try {
        const { codeResponse, message, product } = await mainProductInstance.createProduct(req.body);
        res.status(codeResponse).json({ message, product });
    } catch (error) {
        res.status(404).json({ codeResponse: error.codeResponse, message: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const { codeResponse, message, products } = await mainProductInstance.getAllProducts();
        res.status(codeResponse).json({ message, products });
    } catch (error) {
        res.status(404).json({ codeResponse: error.codeResponse, message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { codeResponse, message, product } = await mainProductInstance.getProductById(req.params.id.toString());
        res.status(codeResponse).json({ message, product });
    } catch (error) {
        res.status(404).json({ codeResponse: error.codeResponse, message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { codeResponse, message, product } = await mainProductInstance.updateProduct(req.body, req.params?.id);
        res.status(codeResponse).json({ message, product });
    } catch (error) {
        res.status(404).json({ codeResponse: error.codeResponse, message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { codeResponse, message, product } = await mainProductInstance.deleteProduct(req.params?.id);
        res.status(codeResponse).json({ message });
    } catch (error) {
        res.status(404).json({ codeResponse: error.codeResponse, message: error.message });
    }
};

export const getProdyctByCategory = async (req, res) => {
    try {
        const { codeResponse, message, products } = await mainProductInstance.getProductByCateogry(req.params.category);
        res.status(codeResponse).json({ message, products });
    } catch (error) {
        res.status(404).json({ codeResponse: error.codeResponse, message: error.message });
    }
};
