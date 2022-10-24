import express from "express";
import errorHandler from "./errors/errorHandler";
import path from "path";
import morgan from 'morgan'

import notFound from "./errors/notFound";

import menuCategoryRouter from "./resources/menuCategory/menuCategory.router";
import menuItemRouter from "./resources/menuItem/menuItem.router";
import { signup, signin } from './auth/auth'

import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev')) // Logs HTTP requests in terminal

//TODO: Validate new and updated Menu Categories

// Menu category: /API/menucategory
app.use("/api/menucategory", menuCategoryRouter);

//TODO: Validate new and updated Menu Items

// Menu item: /API/menuitem
app.use("/api/menuitem", menuItemRouter);

//Serve React App
// app.get("/", (req, res)=>{
//     res.sendFile(path.join(__dirname, "..", "..", "frontEnd", "order_up", "public", "index.html"))
// });
app.use(express.static(path.join(__dirname, "..", "..", "frontEnd", "order_up", "build")));

console.log(__dirname);

app.post('/api/signup', signup)
app.post('/api/signin', signin)

app.use("/api/error", (req, res, next) => {
    next({ status: 400, message: "This is an error." });
});

// Orders: /API/order

// -Sign in: /API/signin
// Signup: /API/signup

app.use(notFound);
app.use(errorHandler);

export default app;