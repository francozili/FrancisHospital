const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const Doctor = new Schema({
    name: String,
    picture: String,
    address: String,
    phone: String,
    sex: String,
    Specialty: [String]
})

module.exports = mongoose.model('Doctor', Doctor)