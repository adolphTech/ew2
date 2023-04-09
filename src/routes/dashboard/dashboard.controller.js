const axios = require("axios")
    //this is the dashboard controller


async function httpRenderDashboard(req, res) {

    try {

        res.render("dashboard.hbs", {})

    } catch (e) {
        res.status(500).send(e)
    }
}




module.exports = { httpRenderDashboard, }