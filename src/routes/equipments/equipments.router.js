const express = require("express");

const {isAuthenticated} = require("../users/users.controller")

const { httpFetchEquip, httpRenderEq, httpFetchEquipSpec } = require("./equipments.controller");


const equipmentsRouter = express.Router();

equipmentsRouter.get("/",isAuthenticated, httpRenderEq);
equipmentsRouter.get("/loc", httpFetchEquipSpec)
equipmentsRouter.get("/all", httpFetchEquip);





module.exports = equipmentsRouter;