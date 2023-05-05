import UserInstance from "../daos/users";

const mainUserInstance = new UserInstance();

export const getAllUsers = async (req, res) => {
    // Lógica para obtener todos los usuarios
    try {
        await mainUserInstance.createUser({ name: "sf" });
    } catch (error) {
        res.status(404).json({ codeResponse: error.codeResponse, message: error.message });
    }
};

export const getUserById = (req, res) => {
    // Lógica para obtener un usuario por su ID
};

export const createUser = (req, res) => {};

export const updateUser = (req, res) => {
    // Lógica para actualizar un usuario existente
};

export const deleteUser = (req, res) => {
    // Lógica para eliminar un usuario existente
};
