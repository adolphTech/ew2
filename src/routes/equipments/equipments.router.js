const express = require("express");

// const {isAuthenticated} = require("../users/users.controller")

const { httpFetchEquip,httpAdd,httpUpdate,httpLocations,httpAddEquip, httpRenderEq, httpFetchEquipSpec, } = require("./equipments.controller");
const {ensureAuthenticated} = require("../../middlewares/auth")

const equipmentsRouter = express.Router();

equipmentsRouter.get("/", ensureAuthenticated,httpRenderEq);
equipmentsRouter.get("/loc", httpFetchEquipSpec)
equipmentsRouter.get("/all", httpFetchEquip);
equipmentsRouter.post("/knh",httpAdd)
equipmentsRouter.post("/update",httpUpdate)
equipmentsRouter.get("/locations",httpLocations)
equipmentsRouter.post("/new",httpAddEquip)
// equipmentsRouter.put("/tag",updateTags)
// 'REPRODUCTIVE HEALTH CLINIC' 



module.exports = equipmentsRouter;