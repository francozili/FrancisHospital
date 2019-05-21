const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const Doctor = new Schema({
    name: String,
    picture: String,
    address: String,
    phone: String,
    Specialty: String
})

let DoctorCollection = mongoose.model("Doctor", Doctor);
module.exports = DoctorCollection