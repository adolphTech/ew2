const mongoose = require("mongoose");



const equipmentSchema = new mongoose.Schema({

    assetTag: {
        type: String,
        // required: true,
        trim: true,
        uppercase: true,
        // unique: true, 
        default: "n/a"
    },
    serialNumber: {
        type: String,
        // required: true,
        trim: true,
        uppercase: true,
        // unique: true,
        default:"n/a"
    },
    equipmentType: {
        type: String,
        // required: true,
        trim: true,
        uppercase: true,
        default:"n/a"
    },
    model: {
        type: String,
        // required: true,
        uppercase: true,
        default:"n/a"

    },
    physicalLocation: {
        type: String,
        // required: true,
        uppercase: true,
        default:"n/a"
    },
    department: {
        type: String,
        // required: true,
        uppercase: true,
        default:"n/a"
    },
    location: {
        type: String,
        // required: true,
        uppercase: true,
        default:"n/a"
    }


})

const Equipment = mongoose.model("Equipment", equipmentSchema)

module.exports = Equipment;