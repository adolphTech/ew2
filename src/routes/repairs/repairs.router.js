const express = require("express");


const {isAuthenticated} = require("../users/users.controller")

const { httpAddRepair, httpFetchRepairs, httpRenderRepairsPage, httpRangeRepairs } = require("./repairs.controller");


const repairsRouter = express.Router();


repairsRouter.post("/", httpAddRepair);
repairsRouter.get("/", httpFetchRepairs);

repairsRouter.get("/all",isAuthenticated, httpRenderRepairsPage)
repairsRouter.get("/range", httpRangeRepairs)


module.exports = repairsRouter;