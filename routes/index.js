const express = require('express')
const router = express.Router()

const doctorsController = require('../controller/doctorsController.js')
const patientsController = require('../controller/patientsController.js')

router.get('/', doctorsController.index)
router.post('/', doctorsController.create)
router.get('/:id', doctorsController.show)
router.put('/:id', doctorsController.update)
router.delete('/:id', doctorsController.delete)

router.get('/', patientsController.index)
router.post('/', patientsController.create)
router.get('/:id', patientsController.show)
router.put('/:id', patientsController.update)
router.delete('/:id', patientsController.delete)


module.exports = router