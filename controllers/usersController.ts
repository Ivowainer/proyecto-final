import UserInstance from "../daos/users";
import { db } from "../database";

const mainUserInstance = new UserInstance(db);

export const getAllUsers = (req, res) => {
    // Lógica para obtener todos los usuarios
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
