const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const Patient = new Schema({
    name: String,
    address: String,
    age: Number,
    appointment: String,
    department: String,
    phone: String,
    sex: String,
})

module.exports = mongoose.model('Patient', Patient)