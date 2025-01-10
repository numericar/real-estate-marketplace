import bcryptjs from "bcryptjs";

import User from "../models/user.model.js";

export async function signUp(req, res) {
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
        res.status(500).json({
            status: false,
            message: error.message,
            data: null,
        });
    }
}
