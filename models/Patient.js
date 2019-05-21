const mongoose = require('../db/connection.js')
const DoctorCollection = require("./Doctors");
const Schema = mongoose.Schema

const Patient = new Schema({
    name: String,
    address: String,
    age: Number,
    appointment: String,
    phone: String,
    sex: String,
    Doctor: [{type:Schema.Types.ObjectId,ref:DoctorCollection}]
})

let PatientCollection = mongoose.model("Patient", Patient);
module.exports = PatientCollection