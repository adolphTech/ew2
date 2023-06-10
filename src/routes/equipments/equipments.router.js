const express = require("express");

const {isAuthenticated} = require("../users/users.controller")

const { httpFetchEquip,httpAdd, httpRenderEq, httpFetchEquipSpec } = require("./equipments.controller");


const equipmentsRouter = express.Router();

equipmentsRouter.get("/",isAuthenticated, httpRenderEq);
equipmentsRouter.get("/loc", httpFetchEquipSpec)
equipmentsRouter.get("/all", httpFetchEquip);
equipmentsRouter.post("/knh",httpAdd)

// 'REPRODUCTIVE HEALTH CLINIC' 



module.exports = equipmentsRouter;