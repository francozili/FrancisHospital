const express = require('express')
const router = express.Router()

const doctorsController = require('../controller/doctorsController.js')
const patientsController = require('../controller/patientsController.js')

router.get('/doctors', doctorsController.index)
router.post('/doctors', doctorsController.create)
router.get('/doctors/:id', doctorsController.show)
router.put('/doctors/:id', doctorsController.update)
router.delete('/doctors/:id', doctorsController.delete)

router.get('/patients', patientsController.index)
router.post('/patients', patientsController.create)
router.get('/patients/:id', patientsController.show)
router.put('/patients/:id', patientsController.update)
router.delete('/patients/:id', patientsController.delete)


module.exports = router