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

    async createUser(objectUserInfo): Promise<IUserClassReturn> {
        const { email, name, password } = objectUserInfo;

        // Validation
        if (password.length < 6) throw { codeRepsonse: 403, message: "The password must contain at least 6 characters" };
        if (name.length < 3) throw { codeRepsonse: 403, message: "The name must contain at least 3 characters" };
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

    async getAllUsers(user: IUser): Promise<IUserClassReturn> {
        try {
            const allUsers = await User.find().select("-password -__v");
            return { codeResponse: 200, message: "All Users", users: allUsers.map((val) => val.toObject()) };
        } catch (error) {
            throw { codeResponse: error.code, message: error.message };
        }
    }
}

export default UserInstance;
