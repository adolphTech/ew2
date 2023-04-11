const express = require("express");



const { httpAddRepair, httpFetchRepairs, httpRenderRepairsPage, httpRangeRepairs } = require("./repairs.controller");


const repairsRouter = express.Router();


repairsRouter.post("/", httpAddRepair);
repairsRouter.get("/", httpFetchRepairs);

repairsRouter.get("/all", httpRenderRepairsPage)
repairsRouter.get("/range", httpRangeRepairs)


module.exports = repairsRouter;