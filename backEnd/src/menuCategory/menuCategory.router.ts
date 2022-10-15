import { Router } from 'express';

import methodNotAllowed from "../errors/methodNotAllowed";

import controller from "./menuCategory.controller";

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
    // Did not implement a DELETE route as it is potentially destructive (it would delete all menuItems linked to that category)
    .all(methodNotAllowed);

router
    .route("/:categoryId/items")
    .get(controller.listItems)
    .all(methodNotAllowed);

module.exports = router;