const express = require("express");

const {ensureAuthenticated} = require("../../middlewares/auth")

const { httpPPM } = require("./ppm.controller");


const ppmRouter = express.Router();


ppmRouter.get("/",ensureAuthenticated, httpPPM);




module.exports = ppmRouter;