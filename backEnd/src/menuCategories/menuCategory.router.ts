import { Router } from 'express';

import methodNotAllowed from "../errors/methodNotAllowed";

const controller = require("./menuCategory.controller");

const router: Router = require("express").Router();

router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router
    .route("/:categoryId")
    .get(controller.read)
    .put(controller.update)
    .all(methodNotAllowed);

module.exports = router;