import jwt from 'jsonwebtoken';
export const sendResponse = (res, status, message, data = null) => {
    if (status !== 200 && !data) {
        data = { 'message': message };
    }
    // res.statusCode = status;
    res.statusMessage = message;
    return res.status(status).json(data);
}

export const generateToken = (data, type) => {
    let token = type === 'accessToken' ?
        jwt.sign(data,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        :
        jwt.sign(data,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1w' }
        );
    return token;
}
