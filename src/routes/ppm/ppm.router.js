const express = require("express");



const { httpPPM } = require("./ppm.controller");


const ppmRouter = express.Router();


ppmRouter.get("/", httpPPM);




module.exports = ppmRouter;