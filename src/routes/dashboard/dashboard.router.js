const express = require("express");

const {isAuthenticated} = require("../users/users.controller")

const { httpRenderDashboard } = require("./dashboard.controller");


const dashboardRouter = express.Router();

dashboardRouter.get("/", isAuthenticated,httpRenderDashboard);




module.exports = dashboardRouter;