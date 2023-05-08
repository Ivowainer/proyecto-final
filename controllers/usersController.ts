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
        const { codeResponse, message, users } = await mainUserInstance.getAllUsers(req.user);
        res.status(codeResponse).json(users);
    } catch (error) {
        res.status(404).json({ codeResponse: error.codeResponse, message: error.message });
    }
};

export const getUserById = (req, res) => {
    // Lógica para obtener un usuario por su ID
};

export const updateUser = (req, res) => {
    // Lógica para actualizar un usuario existente
};

export const deleteUser = (req, res) => {
    // Lógica para eliminar un usuario existente
};
