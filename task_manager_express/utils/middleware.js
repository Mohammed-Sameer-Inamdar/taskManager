import { format } from 'date-fns';
import fs from 'fs';
const fsPromise = fs.promises
import path from 'path';
import jwt from 'jsonwebtoken';
import { sendResponse } from './helper.js';

export const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization || req.headers.Authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) return sendResponse(res, 401, 'Access denied');
    const token = authorization.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return sendResponse(res, 401, 'Access denied');
            req.user = decoded;
            next();
        }
    )
}

export const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${message}\n`;
    try {
        const dirname = path.resolve();
        if (!fs.existsSync(path.join(dirname, 'logs'))) {
            await fsPromise.mkdir(path.join(dirname, 'logs'));
        }
        await fsPromise.appendFile(path.join(dirname, 'logs', logName), logItem);
    } catch (error) {
        console.log('error', error);
    }
}

export const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

export const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'error.text');
    console.log(err.stack);
    sendResponse(res, 500, err.message);
}
