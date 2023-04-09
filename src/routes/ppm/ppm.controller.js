const fs = require("fs");
const path = require("path");
const axios = require("axios");

const Equipment = require("../../models/equipment.model");
require("dotenv").config();



async function httpPPM(req, res) {
    try {
        Equipment.aggregate([
                { $group: { _id: '$physicalLocation', totalAssets: { $sum: 1 } } }
            ]).exec()
            .then(results => {
                // res.send(results)
                res.render('ppmDownload', { results: results });
            })
            .catch(err => {
                throw err;
            });
    } catch (e) {
        console.log(e)
    }
}

module.exports = { httpPPM };