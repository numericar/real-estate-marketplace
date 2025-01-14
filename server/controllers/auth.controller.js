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
            next(errorInstanceHandler(404, "User not found"));
            return;
        } 

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            next(errorInstanceHandler(401, "wrong credebtials"));
            return;
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            next(errorInstanceHandler(500, "Authentication failed"));
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

        const user = {
            username: validUser.username
        }

        res.status(200).json({
            status: true,
            message: "Successful",
            data: user
        })

    } catch (error) {
        next(errorInstanceHandler(400, error.message));
    }
}

export async function googleSignIn(req, res, next) {
    try {
        const { username, email, photo } = req.body;

        const validUser = await User.findOne({ email: email });

        let user = null;

        if (!validUser) {
            // sign up
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: username.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: email,
                password: hashedPassword,
                avatar: photo
            });

            user = await newUser.save();
        } else {
            user = validUser;
        }

        // sign in
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);

        res.cookie("access_token", token, {
            httpOnly: true
        })
        
        const responseUser = {
            username: user.username
        }

        res.status(200).json({
            status: true,
            message: "Successful",
            data: responseUser
        })

    } catch (error) {
        next(errorInstanceHandler(401, error.message));
    }
}