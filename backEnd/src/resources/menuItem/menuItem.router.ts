import { Router } from 'express';

import methodNotAllowed from "../../errors/methodNotAllowed";

import controller from "./menuItem.controller";

const router: Router = require("express").Router();

router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router
    .route("/:menuItemId")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

export default router;