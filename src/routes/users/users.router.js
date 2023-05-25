const express = require("express");

// const {isAuthenticated} = require("../../middlewares/auth.js");

const {httpLogin,httpSignUp,logout ,renderLogin,protected,isAuthenticated}= require("./users.controller.js");

const usersRouter = express.Router();

usersRouter.get("/login",renderLogin);
usersRouter.post("/login",httpLogin);
usersRouter.post("/signup",httpSignUp);
usersRouter.get("/logout",logout);

usersRouter.get("/protected",isAuthenticated,protected);

module.exports = usersRouter;