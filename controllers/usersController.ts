import UserInstance from "../daos/UsersDAOS";

const mainUserInstance = new UserInstance();

export const createUser = async (req, res) => {
    try {
        const { codeResponse, message, user, token } = await mainUserInstance.createUser(req.body);
        res.status(codeResponse).json({ message, user, token });
    } catch (error) {
        res.status(404).json({ codeResponse: error.codeResponse, message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const { codeResponse, message, users } = await mainUserInstance.getAllUsers();
        res.status(codeResponse).json({ users, message });
    } catch (error) {
        res.status(404).json({ codeResponse: error.codeResponse, message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { codeResponse, message, user } = await mainUserInstance.getUserById(req.params?.id);
        res.status(codeResponse).json({ user, message });
    } catch (error) {
        res.status(404).json({ codeResponse: error.codeResponse, message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { codeResponse, message, user } = await mainUserInstance.updateUser(req.body, req.params?.id);
        res.status(codeResponse).json({ user, message });
    } catch (error) {
        res.status(404).json({ codeResponse: error.codeResponse, message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { codeResponse, message, user } = await mainUserInstance.deleteUser(req.params?.id);
        res.status(codeResponse).json({ user, message });
    } catch (error) {
        res.status(404).json({ codeResponse: error.codeResponse, message: error.message });
    }
};
