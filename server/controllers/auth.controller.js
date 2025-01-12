import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
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


export async function signIn(req, res, next) {
    try {
        const { email, password } = req.body;

        const validUser = await User.findOne({ email: email });
        if (!validUser) {
            next(404, "User not found");
            return;
        } 

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            next(401, "wrong credebtials");
            return;
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            next(500, "Authentication failed");
            return;
        }

        const token = jwt.sign({
            id: validUser._id
        }, JWT_SECRET, {
            expiresIn: "1h"
        });

        res.cookie("access_token", token, {
            httpOnly: true
        });

        res.status(200).json({
            status: true,
            message: "Successful",
            data: null
        })

    } catch (error) {
        next(errorInstanceHandler(400, error.message));
    }
}