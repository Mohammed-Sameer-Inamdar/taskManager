import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/helper.js";
import User from "./User.js";
import Token from "./Token.js";

export const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) return sendResponse(res, 400, 'Email and passowrd are required');

    const userData = await User.findOne({ email });

    if (!userData || userData.password !== password) return sendResponse(res, 400, 'Invalid email and password');

    const accessToken = jwt.sign({
        email: email,
        userName: userData.userName,
        userId: userData._id
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1w' }
    )

    await Token.create({ token: accessToken, tokenUser: userData._id });
    return sendResponse(res, 200, 'Logged in successfully', { user: { _id: userData._id, email: userData.email, userName: userData.userName }, token: accessToken });
}

export const signUp = async (req, res) => {
    const { userName, password, email } = req.body;
    if (!userName || !password || !email) return sendResponse(res, 400, 'email, user name and password are required');

    const emailExists = await User.findOne({ email });
    if (emailExists) return sendResponse(res, 400, 'Email is already used');


    const newUser = await User.create({ userName, email, password });

    const accessToken = jwt.sign({
        email: email,
        userName: userName,
        userId: newUser._id
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    )

    await Token.create({ token: accessToken, tokenUser: newUser._id });

    return sendResponse(res, 201, 'Signed up successfully', { user: { _id: newUser._id, userName: newUser.userName, email: newUser.email }, token: accessToken });
}
