const express = require("express");



const { httpFetchEquip, httpRenderEq, } = require("./equipments.controller");


const equipmentsRouter = express.Router();

equipmentsRouter.get("/", httpFetchEquip);
equipmentsRouter.get("/all", httpRenderEq);





module.exports = equipmentsRouter;