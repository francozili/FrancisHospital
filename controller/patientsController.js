const Patient = require('../models/Patient.js')

const patientController = {
    index: async (req, res) => {
        try {
            const patients = await Patient.find({})
            res.json(patients)
        } catch (err) {
            console.log(err)
        }
    },
    show: async (req, res) => {
        try {
            const patientId = req.params.id
            const patient = await Patient.findById(patientId)
            res.json(patient)
        } catch (err) {
            console.log(err)
            res.json(err)
        }
    },
    create: async (req, res) => {
        try {
          const newPatient = req.body
          const savedPatient = await Patient.create(newPatient)
          res.json(savedPatient)
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
    },
    update: async (req, res) => {
        try {
          const patientId = req.params.id
          const updatedPatient = req.body
          const savedPatient = await Patient.findByIdAndUpdate(patientId, updatedPatient, {new: true})
          res.json(savedPatient)
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
    },
    delete: async (req, res) => {
        console.log('DELETE')
        try {
          const patientId = req.params.id
          const deletedPatient = await Patient.findByIdAndRemove(patientId)
          res.json(deletedPatient)
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
    }
}

module.exports = patientController
