import express from "express";
import errorHandler from "./errors/errorHandler";

import notFound from "./errors/notFound";

import menuCategoryRouter from "./menuCategory/menuCategory.router";
import menuItemRouter from "./menuItem/menuItem.router";
import { signup, signin } from './auth/auth'


const app = express();

app.use(express.json());

//TODO: Validate new and updated Menu Categories

// Menu category: /API/menucategory
app.use("/api/MenuCategory", menuCategoryRouter);

//TODO: Validate new and updated Menu Items

// Menu item: /API/menuitem
app.use("/api/MenuItem", menuItemRouter);

app.post('/signup', signup)
app.post('/signin', signin)

app.use("/api/error", (req, res, next) => {
    next({ status: 400, message: "This is an error." });
});

// Orders: /API/order

// -Sign in: /API/signin
// Signup: /API/signup

app.use(notFound);
app.use(errorHandler);

export default app;