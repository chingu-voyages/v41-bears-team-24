import express from "express";
import errorHandler from "./errors/errorHandler";
import { signup, signin } from './auth/auth'

const app = express();

app.use(express.json());


app.post('/signup', signup)
app.post('/signin', signin)

app.use("/api/MenuCategory", (req, res) => {
    res.status(200).json({
        data: {
            message: "Default Category Listener"
        }
    });
});

app.use("/api/error", (req, res, next) => {
    next({ status: 400, message: "This is an error." });
});

// Menu category: /API/menucategory
// Food item: /API/menucategory/fooditem
// Orders: /API/orders
// -Sign in: /API/signin
// Signup: /API/signup

app.use(errorHandler);

export default app;