import express from "express";
import errorHandler from "./errors/errorHandler";
import path from "path";
import morgan from 'morgan'
import notFound from "./errors/notFound";

import menuCategoryRouter from "./resources/menuCategory/menuCategory.router";
import menuItemRouter from "./resources/menuItem/menuItem.router";
import { signup, signin } from './auth/auth'
import userRouter from './resources/user/user.router'

import cors from "cors";
import CookieParser from "cookie-parser";


const app = express();

app.use(cors());
app.use(CookieParser())
app.use(express.json());
app.use(morgan('dev')) // Logs HTTP requests in terminal

//TODO: Validate new and updated Menu Categories

app.post('/signup', signup)
app.post('/signin', signin)

app.use("/api/user", userRouter)
app.use("/api/menucategory", menuCategoryRouter);

//TODO: Validate new and updated Menu Items

app.use("/api/menuitem", menuItemRouter);

//Serve React App
app.use(express.static(path.join(__dirname, "..", "..", "frontEnd", "order_up", "build")));


app.use("/api/error", (req, res, next) => {
    next({ status: 400, message: "This is an error." });
});

// Orders: /API/order

app.use(notFound);
app.use(errorHandler);

export default app;