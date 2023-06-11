const express = require("express");


// const {isAuthenticated} = require("../users/users.controller")

const {ensureAuthenticated} = require("../../middlewares/auth")

const { httpAddRepair, httpFetchRepairs, httpRenderRepairsPage, httpRangeRepairs } = require("./repairs.controller");


const repairsRouter = express.Router();


repairsRouter.post("/", httpAddRepair);
repairsRouter.get("/", httpFetchRepairs);

repairsRouter.get("/all",ensureAuthenticated,httpRenderRepairsPage)
repairsRouter.get("/range", httpRangeRepairs)


module.exports = repairsRouter;