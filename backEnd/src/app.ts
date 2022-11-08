import express from "express";
import { Request, Response } from 'express';
import errorHandler from "./errors/errorHandler";
import path from "path";
import morgan from 'morgan'
import notFound from "./errors/notFound";

import menuCategoryRouter from "./resources/menuCategory/menuCategory.router";
import menuItemRouter from "./resources/menuItem/menuItem.router";
import orderRouter from "./resources/order/order.router";
import { signup, signin } from './auth/auth'
import userRouter from './resources/user/user.router'
import s3Router from './resources/S3/S3.router'

import cors from "cors";
import CookieParser from "cookie-parser";
import { AppRunner } from "aws-sdk";

const app = express();

app.use(cors());
app.use(CookieParser())
app.use(express.json());
app.use(morgan('dev')) // Logs HTTP requests in terminal

// Auth routes
app.post('/signup', signup)
app.post('/signin', signin)

app.use("/api/user", userRouter)

//TODO: Validate new and updated Menu Categories
app.use("/api/menucategory", menuCategoryRouter);

//TODO: Validate new and updated Menu Items
app.use("/api/menuitem", menuItemRouter);

app.use("/api/order", orderRouter);

app.use('/api/s3url', s3Router);

// Serve React App
const sendIndex = (req: Request, res: Response) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../../frontEnd/order_up/build/') });
}

// Send Index file for these routes
app.get(/^\/(Admin|Menu|Kitchen)/, sendIndex);
app.get('/', sendIndex);

// Statically serve all other content (robots.txt, manifest.json, all js files, etc...)
app.use(express.static(path.join(__dirname, "..", "..", "frontEnd", "order_up", "build")));


app.use("/api/error", (req, res, next) => {
    next({ status: 400, message: "This is an error." });
});

app.use(notFound);
app.use(errorHandler);

export default app;