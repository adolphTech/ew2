const axios = require("axios");
const moment = require("moment");
const Equipment = require("../../models/equipment.model");
const Repair = require("../../models/repairs.model")

require("dotenv").config();


async function httpAddRepair(req, res) {
    try {
        const { user, ictOfficer, jobDescription, assetTag, solution, parts } = req.body;


        const equipmentArr = await Equipment.find({ assetTag });

        if (!equipmentArr) {
            req.flash("error_msg", "No Result of the asset Tag");
            res.redirect('/');
        } else {
            const equipment = equipmentArr[0];

            const { physicalLocation, department } = equipment;

            const repairData = {
                user,
                ictOfficer,
                jobDescription,
                assetTag,
                solution,
                parts,
                physicalLocation,
                department
            }

            const newRepair = new Repair(repairData);

            await newRepair.save();

            // console.log(newRepair)


            req.flash("success_msg", "Repair added successfull");
            res.redirect('/');


        }



        // console.log(equipment)



    } catch (e) {
        console.log(e)

        req.flash("error_msg", "Repair failed");
        res.redirect('/');
    }
}

async function httpFetchRepairs(req, res) {
    try {
        const repairsUn = await Repair.find({});

        const repairs = repairsUn.map(repair => {
            const repairDate = moment.utc(repair.date);

            const formattedDate = repairDate.format(' M/D/YY');

            return {...repair._doc, date: formattedDate };
        });

        res.send(repairs);

    } catch (e) {
        console.log(e);
    }

}

async function httpRenderRepairsPage(req, res) {
    try {

        const repairsArr = await axios.get(`${process.env.DOMAIN}/repair`);
        const repairs = repairsArr.data

        // console.log(repairs)

        res.render("repairs.hbs", { repairs })

    } catch (e) {
        console.log(e)
    }
}


async function httpRangeRepairs(req, res) {
    try {
        const { startDate, endDate } = req.query;
        const repairsUn = await Repair.find({
            date: { $gte: startDate, $lte: endDate }
        });

        const repairs = repairsUn.map(repair => {
            const repairDate = moment.utc(repair.date);

            const formattedDate = repairDate.format(' M/D/YY');

            return {...repair._doc, date: formattedDate };
        });

        res.send(repairs);
        // console.log(req.query)
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { httpAddRepair, httpFetchRepairs, httpRenderRepairsPage, httpRangeRepairs }