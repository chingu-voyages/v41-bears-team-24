import { Router } from 'express';

import methodNotAllowed from "../errors/methodNotAllowed";

const controller = require("./menuItem.controller");

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

module.exports = router;