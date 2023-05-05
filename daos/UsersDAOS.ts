import bcrypt from "bcryptjs";

import User from "../models/userModel";

import { IUserClassReturn } from "../types";
import { validations } from "../utils";

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
            const user = await User.findOne({ email }).lean();

            if (user) {
                return { codeResponse: 400, message: "Mail already registered" };
            }

            const newUser = new User({
                email: email.toLowerCase(),
                password: bcrypt.hashSync(password),
                name,
            });

            await newUser.save();

            return { codeResponse: 200, message: "The user has been created", user: newUser.toObject() };
        } catch (error) {
            throw { codeResponse: error.code, message: error.message };
        }
    }
}

export default UserInstance;
