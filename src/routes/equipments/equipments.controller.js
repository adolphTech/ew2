const fs = require("fs");
const path = require("path");
const axios = require("axios");

const Equipment = require("../../models/equipment.model");
require("dotenv").config();


async function httpRenderEq(req, res) {
    try {


        const equipsArr = await axios.get(`${process.env.DOMAIN}/eq`)
        const equips = equipsArr.data
            // console.log(appointments)

        res.render("equipments.hbs", { equips, page: "ALL EQUIPMENTS" })

    } catch (e) {
        console.log(e)

    }
}
// todo : check if location is there
async function httpFetchEquip(req, res) {
    try {
        const location = req.query.location
        const equipments = await Equipment.find({ physicalLocation: location });
        res.send(equipments);
    } catch (e) {
        console.log(e);
    }
}



module.exports = { httpFetchEquip, httpRenderEq };