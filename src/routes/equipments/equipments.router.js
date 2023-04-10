const express = require("express");



const { httpFetchEquip, httpRenderEq, httpFetchEquipSpec } = require("./equipments.controller");


const equipmentsRouter = express.Router();

equipmentsRouter.get("/", httpRenderEq);
equipmentsRouter.get("/loc", httpFetchEquipSpec)
equipmentsRouter.get("/all", httpFetchEquip);





module.exports = equipmentsRouter;