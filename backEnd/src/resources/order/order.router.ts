import { Router } from 'express';
import methodNotAllowed from "../../errors/methodNotAllowed";
import controller from "./order.controller";

const router: Router = require("express").Router();

router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router
    .route("/:id")
    .all(methodNotAllowed);

export default router;