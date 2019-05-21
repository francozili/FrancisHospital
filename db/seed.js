const Doctors = require('../models/Doctors.js')
const Patient = require('../models/Patient.js')
  
// using Promises
Doctors.deleteMany().then(() => {
    const luke = new Doctors({
    name: 'Luke Chapman', 
    picture: String,
    address: '1488 springdowne cir',
    phone: '678-927-5773',
    sex: 'Male',
    Specialty: 'Obstetrics & Gynecology (Board Certified)'})
    return luke.save()
  }).then(() => {
    const mike = new Doctors({
        name: 'Mike James', 
        picture: String,
        address: '1500 where your momma at',
        phone: '678-927-5775',
        sex: 'Male',
        Specialty: 'Certified Nurse Practitioner'})
    return mike.save()
  })