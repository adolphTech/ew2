const fs = require("fs");
const path = require("path");
const axios = require("axios");

const Equipment = require("../../models/equipment.model");
require("dotenv").config();

async function httpAddEquip(req,res){
  try {
    const { assetTag, serialNumber, equipmentType, model, physicalLocation, department} = req.body;

    // Check if equipment with the same asset tag already exists
    const existingEquipment = await Equipment.findOne({ assetTag });

    if (existingEquipment) {
      req.flash("error_msg", "Equipment with the same asset tag already exists");
      return res.redirect('/');
    }

    const newEquipment = new Equipment({
      assetTag,
      serialNumber,
      equipmentType,
      model,
      physicalLocation,
      department
    });

    await newEquipment.save();

    req.flash("success_msg", "Equipment added successfully");
    res.redirect('/');
  } catch (error) {
    console.log(error);
    req.flash("error_msg", "Failed to add equipment");
    res.redirect('/');
  }
}
//  async  function updateTags (req, res){
//     try {
//       const assets = await Equipment.find({ assetTag: "_" }); // Find assets with empty asset tags
//       let assetTagCounter = 500;
  
//       for (const asset of assets) {
//         asset.assetTag = `AST${assetTagCounter.toString().padStart(3, "0")}`;
//         assetTagCounter++;
//         await asset.save(); // Save the updated asset
//       }
  
//       res.status(200).json({ message: 'Asset tags updated successfully' });
//     } catch (error) {
//         console.log(error)
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };

async function httpRenderEq(req, res) {
    try {


        const equipsArr = await axios.get(`${process.env.DOMAIN}/all`)
        const equips = equipsArr.data

        const ppmLocArr = await axios.get(`${process.env.DOMAIN}/locations`)
        const ppmLocations = ppmLocArr.data.sort()
            // console.log(equips)

        res.render("equipments.hbs", { equips,ppmLocations, page: "ALL EQUIPMENTS" })

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


//fetch 2  //
async function httpFetchEquip (req, res){
  try {
    const draw = req.query.draw;
    const start = parseInt(req.query.start) || 0;
    const length = parseInt(req.query.length) || 10;
    // const searchValue = req.query.search.value || '';
    const searchValue = req.query.search && req.query.search.value ? req.query.search.value : '';


    const totalCount = await Equipment.countDocuments();
    const filteredCount = await Equipment.countDocuments({
      $or: [
        { assetTag: { $regex: searchValue, $options: 'i' } },
        { equipmentType: { $regex: searchValue, $options: 'i' } },
        { model: { $regex: searchValue, $options: 'i' } },
        { department: { $regex: searchValue, $options: 'i' } },
      ],
    });

    const equipments = await Equipment.find({
      $or: [
        { assetTag: { $regex: searchValue, $options: 'i' } },
        { equipmentType: { $regex: searchValue, $options: 'i' } },
        { model: { $regex: searchValue, $options: 'i' } },
        { department: { $regex: searchValue, $options: 'i' } },
      ],
    })
      .skip(start)
      .limit(length);

    res.json({
      draw,
      recordsTotal: totalCount,
      recordsFiltered: filteredCount,
      data: equipments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

  

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
  
  async function httpUpdate(req,res){
try{

  const { newAssetTag, equipmentType, location, model, assetTag } = req.body;

  // Create an object to store the updated asset fields dynamically
  const updatedFields = {};

  // Add the fields to the updatedFields object if they are present in the request body
  if (newAssetTag) updatedFields.assetTag = newAssetTag;
  if (equipmentType) updatedFields.equipmentType = equipmentType;
  if (location) updatedFields.location = location;
  if (model) updatedFields.model = model;


  Equipment.findOneAndUpdate(
    { assetTag }, // Find the asset based on the assetTag
    updatedFields, // Update the asset's fields dynamically
    { new: true } // Return the updated asset as the result
  )
    .then(updatedAsset => {
      if (!updatedAsset) {
        req.flash("error_msg", "No Result of the asset Tag");
        res.redirect('/');
      }

      // Send a response indicating the update was successful
      req.flash("success_msg", "Equipment updated successfully");
      res.redirect('/');
    })


}catch(e){
  console.log(e)
  req.flash("error_msg", "Internal Server Error");
  res.redirect('/');
}
  }

  async function httpLocations(req,res){
    try {
      Equipment.aggregate([
        { $group: { _id: "$physicalLocation" } },
        { $project: { _id: 0, physicalLocation: "$_id" } }
      ])
        .exec()
        .then(results => {
          const physicalLocations = results.map(result => result.physicalLocation);
          // console.log(physicalLocations); // You can do whatever you want with the array of physical locations
          res.send(physicalLocations)
        })
        .catch(err => {
          throw err;
        });
    } catch (e) {
      console.log(e);
    }
    
  }



module.exports = { httpFetchEquip, httpAdd,httpRenderEq,httpUpdate,httpLocations,httpAddEquip, httpFetchEquipSpec };