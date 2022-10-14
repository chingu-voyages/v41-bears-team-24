import express from "express";
import errorHandler from "./errors/errorHandler";
import notFound from "./errors/notFound";

const menuCategoryRouter = require("./menuCategories/menuCategory.router");

const app = express();

app.use(express.json());

app.use("/api/MenuCategory", menuCategoryRouter);

app.use("/api/error", (req, res, next) => {
    next({ status: 400, message: "This is an error." });
});

// Menu category: /API/menucategory
// Food item: /API/menucategory/fooditem
// Orders: /API/orders

// -Sign in: /API/signin
// Signup: /API/signup

app.use(notFound);
app.use(errorHandler);

export default app;