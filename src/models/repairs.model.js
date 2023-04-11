const mongoose = require("mongoose");



const repairSchema = new mongoose.Schema({

    assetTag: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    user: {
        type: String,
        required: true,
    },
    ictOfficer: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    solution: {
        type: String,
        required: true
    },
    parts: {
        type: String,
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
    },
    date: {
        type: Date,
        default: Date.now,
    }


})

const Repair = mongoose.model("Repair", repairSchema)

module.exports = Repair;