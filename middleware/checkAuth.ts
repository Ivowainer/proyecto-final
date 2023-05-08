import jwt from "jsonwebtoken";
import User from "../models/userModel";

const checkAuth = async (req, res, next) => {
    let token;

    if (req.cookies?.token) {
        try {
            token = await req.cookies.token;

            const decoded = jwt.verify(token, process.env.JWT_SECRET_SEED);

            req.user = await User.findById(decoded).select("-password  -createdAt -updatedAt -__v");

            return next();
        } catch (error) {
            return res.status(404).json({ message: "There was an error in JWT checkAuth" });
            /* return res.status(404).json({ message: error.message }); */
        }
    }

    if (!token) {
        const error = new Error("The token isn't valid");

        return res.status(401).json({ message: error.message });
    }
};

export default checkAuth;
