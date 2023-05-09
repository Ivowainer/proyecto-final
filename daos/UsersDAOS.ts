import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel";

import { IUser, IUserClassReturn } from "../types";
import { jwtFunc, validations } from "../utils";

class UserInstance {
    /* constructor(db) {
        this.db = db;
    }

    db: { connect: () => Promise<void>; disconnect: () => Promise<void> }; */

    async loginUser(objectUserInfo): Promise<IUserClassReturn> {
        const { email, password } = objectUserInfo;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("User not found");
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw "Invalid password";
            }

            // User JWT
            const token = jwtFunc.signToken(user._id.toString(), email);

            return {
                codeResponse: 201,
                message: "User login successfully",
                token,
                user: {
                    _id: user.toObject()._id.toString(),
                    email: user.toObject().email,
                    name: user.toObject().name,
                },
            };
        } catch (error) {}
    }

    async createUser(objectUserInfo): Promise<IUserClassReturn> {
        const { email, name, password } = objectUserInfo;

        // Validation
        if (!password || password.length < 6) throw { codeRepsonse: 403, message: "The password must contain at least 6 characters" };
        if (!name || name.length < 3) throw { codeRepsonse: 403, message: "The name must contain at least 3 characters" };
        if (!validations.isValidEmail(email)) {
            throw { codeResponse: 403, message: "The email is not valid" };
        }

        try {
            // User Create
            const user = await User.findOne({ email }).lean();

            if (user) {
                return { codeResponse: 400, message: "Mail already registered" };
            }

            const newUser = new User({
                email: email.toLowerCase(),
                password: bcrypt.hashSync(password),
                name,
            });

            await newUser.save({ validateBeforeSave: true });

            // User JWT
            const token = jwtFunc.signToken(newUser._id.toString(), email);

            return {
                codeResponse: 201,
                message: "User created successfully",
                token,
                user: {
                    _id: newUser.toObject()._id.toString(),
                    email: newUser.toObject().email,
                    name: newUser.toObject().name,
                },
            };
        } catch (error) {
            throw { codeResponse: error.code, message: error.message };
        }
    }

    async getAllUsers(): Promise<IUserClassReturn> {
        try {
            const allUsers = await User.find().select("-password -__v");
            return { codeResponse: 200, message: "All Users", users: allUsers.map((val) => val.toObject()) };
        } catch (error) {
            throw { codeResponse: error.code, message: error.message };
        }
    }

    async getUserById(id: string): Promise<IUserClassReturn> {
        try {
            const user = await User.findById(id).select("-password -__v");

            if (!user) {
                throw { codeResponse: 404, message: "The user doesn't exists" };
            }

            console.log(user);

            return { codeResponse: 200, message: `User by id: ${id}`, user: user.toObject() };
        } catch (error) {
            throw { codeResponse: error.code, message: error.message };
        }
    }

    async updateUser(objectUserInfo, id: string): Promise<IUserClassReturn> {
        const { email, name } = objectUserInfo;

        // Validation
        if (name && name.length < 3) throw { codeRepsonse: 403, message: "The name must contain at least 3 characters" };
        if (email && !validations.isValidEmail(email)) {
            throw { codeResponse: 403, message: "The email is not valid" };
        }

        try {
            const userUpdated = await User.findByIdAndUpdate(id, { email, name });

            const user = await userUpdated.save();

            return { codeResponse: 200, message: "The user has been updated successfully", user: user.toObject() };
        } catch (error) {
            throw { codeResponse: error.code, message: error.message };
        }
    }

    async deleteUser(id): Promise<IUserClassReturn> {
        try {
            const userDeleted = await User.findOneAndDelete(id);

            return { codeResponse: 200, message: "The user has been deleted successfully" };
        } catch (error) {
            throw { codeResponse: error.code, message: error.message };
        }
    }
}

export default UserInstance;
