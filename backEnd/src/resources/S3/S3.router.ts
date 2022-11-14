import { Router } from 'express';
import methodNotAllowed from "../../errors/methodNotAllowed";
import controller from "./S3.controller";

const router: Router = require("express").Router();

router
    .route("/")
    .post(controller.create)
    .all(methodNotAllowed);

export default router;