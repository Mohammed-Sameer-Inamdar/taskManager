import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import connectDB from './config/database.js';
import mongoose from 'mongoose';
import userRouter from './users/userRouter.js';
import { errorHandler, logger, verifyJWT } from './utils/middleware.js';
import taskRouter from './tasks/taskRouter.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

connectDB();
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(verifyJWT);
app.use(taskRouter);

app.use(errorHandler);


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(path.resolve(), 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB ' + new Date());
    app.listen(PORT, () => console.log(`Server running on port ${PORT} ${new Date()}`));
});
