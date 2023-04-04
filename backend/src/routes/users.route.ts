import express from "express";

import userController from "../controllers/users.controller";

const usersRouter = express.Router();

usersRouter.get("/", userController.createUser);

module.exports = usersRouter;

export default usersRouter;
