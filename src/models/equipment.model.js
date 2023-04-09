const mongoose = require("mongoose");



const equipmentSchema = new mongoose.Schema({

    assetTag: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        unique: true
    },
    serialNumber: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        unique: true
    },
    equipmentType: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    model: {
        type: String,
        required: true,
        uppercase: true
    },
    physicalLocation: {
        type: String,
        required: true,
        uppercase: true
    },
    department: {
        type: String,
        required: true,
        uppercase: true
    }


})

const Equipment = mongoose.model("Equipment", equipmentSchema)

module.exports = Equipment;