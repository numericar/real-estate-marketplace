import bcryptjs from "bcryptjs";
import { errorInstanceHandler } from "../middlewares/error.middleware.js";

import User from "../models/user.model.js";

export async function signUp(req, res, next) {
    const { username, email, password } = req.body;

    try {
        const passwordHashed = bcryptjs.hashSync(password, 10);

        const user = new User({
            username: username,
            email: email,
            password: passwordHashed,
        });

        await user.save();

        res.status(201).json({
            status: true,
            message: "User created successfully",
            data: null,
        });
    } catch (error) {
        next(errorInstanceHandler(400, error.message));
    }
}
