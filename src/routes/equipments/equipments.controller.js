const fs = require("fs");
const path = require("path");
const axios = require("axios");

const Equipment = require("../../models/equipment.model");
require("dotenv").config();


async function httpRenderEq(req, res) {
    try {


        const equipsArr = await axios.get(`${process.env.DOMAIN}/all`)
        const equips = equipsArr.data
            // console.log(equips)

        res.render("equipments.hbs", { equips, page: "ALL EQUIPMENTS" })

    } catch (e) {
        console.log(e)

    }
}
// todo : check if location is there
async function httpFetchEquipSpec(req, res) {
    try {
        const location = req.query.location
            // console.log(location)
        const equipments = await Equipment.find({ physicalLocation: location });
        res.send(equipments);
        // console.log(equipments)
    } catch (e) {
        console.log(e);
    }
}

async function httpFetchEquip(req, res) {
    try {

        const equipments = await Equipment.find({});
        res.send(equipments);
        // console.log(equipments)
    } catch (e) {
        console.log(e);
    }
}

// async function httpAdd(req, res) {
//     try {
//         const { assetTag, serialNumber,equipmentType,model,physicalLocation,department } = req.body;


//             const eqData = {
//                 assetTag, 
//                 serialNumber,
//                 equipmentType,
//                 model,
//                 physicalLocation,
//                 department
//             }

//             const newEq = new Equipment(eqData);

//             await newEq.save();
//         // console.log(equipment)



//     } catch (e) {
//         console.log(e)

    
//     }
// }

async function httpAdd(req, res) {
    try {
      const eqDataArray = req.body; // Assuming req.body is an array of JSON objects
  
      // Iterate over each JSON object in the array
      for (const eqData of eqDataArray) {
        const newEq = new Equipment(eqData);
        await newEq.save();
      }
  
      res.status(200).json({ message: 'Documents added successfully' });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'An error occurred while adding documents' });
    }
  }
  



module.exports = { httpFetchEquip, httpAdd,httpRenderEq, httpFetchEquipSpec };