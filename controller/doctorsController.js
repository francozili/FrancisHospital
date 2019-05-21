const Doctor = require('../models/Doctors.js')

const doctorsController = {
    index: async (req, res) => {
        try {
            const doctors = await Doctor.find({})
            res.json(doctors)
        } catch (err) {
            console.log(err)
        }
    },
    show: async (req, res) => {
        try {
            const doctorId = req.params.id
            const doctor = await Doctor.findById(doctorId)
            res.json(doctor)
        } catch (err) {
            console.log(err)
            res.json(err)
        }
    },
    create: async (req, res) => {
        try {
          const newDoctor = req.body
          const savedDoctor = await Doctor.create(newDoctor)
          res.json(savedDoctor)
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
    },
    update: async (req, res) => {
        try {
          const doctorId = req.params.id
          const updatedDoctor = req.body
          const savedDoctor = await Doctor.findByIdAndUpdate(doctorId, updatedDoctor, {new: true})
          res.json(savedDoctor)
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
    },
    delete: async (req, res) => {
        console.log('DELETE')
        try {
          const doctorId = req.params.id
          const deletedDoctor = await Doctor.findByIdAndRemove(doctorId)
          res.json(deletedDoctor)
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
    }
}

module.exports = doctorsController
