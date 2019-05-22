import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Patients extends Component {
    state = {
        patients: [],
        newPatient: {
            name: '',
            age: '',
            appointment: '',
            address: '',
            phone: '',
            doctor: []
        },
        isPatientFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get('/api/v1/patients').then(res => {
            this.setState({ patients: res.data })
        })
    }

    toggleDoctorForm = () => {
        this.setState((state, props) => {
            return ({ isPatientFormDisplayed: !state.isPatientFormDisplayed })
        })
    }


    handleChange = (e) => {
        const cloneNewPatient = { ...this.state.newPatient }
        cloneNewPatient[e.target.name] = e.target.value
        this.setState({ newPatient: cloneNewPatient }, () => { console.log(this.state.newPatient) })
    }

    createPatients = (e) => {
        e.preventDefault()
        console.log(this.state.newPatient.name)
        axios
            .post('/api/v1/patients', {
                name: this.state.newPatient.name,
                address: this.state.newPatient.address,
                age: this.state.newPatient.age,
                appointment: this.state.newPatient.appointment,
                phone: this.state.newPatient.phone,
                doctor: this.state.newPatient.doctor
            })
            .then(res => {
                const patientsList = [...this.state.patients]
                patientsList.unshift(res.data)
                this.setState({
                    newPatient: {
                        name: '',
                        age: '',
                        appointment: '',
                        address: '',
                        phone: '',
                        Doctor: []
                    },
                    isPatientFormDisplayed: false,
                    patients: patientsList
                })
            })

    }

    render() {
        return (
            <div>
                <h1>Patients</h1>
                {
                    this.state.patients.map(patient => {
                        return (
                            <div key={patient._id}>
                                <Link
                                    to={`/patients/${patient._id}`}
                                >
                                    {patient.name}
                                </Link>
                            </div>
                        )
                    })
                }
                <button onClick={this.togglePatientForm}>+ New Patient</button>
                {
                    this.state.isPatientFormDisplayed
                        ? <form onSubmit={this.createPatient}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text"
                                    name="name"
                                    className="form-control"
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Age</label>
                                <input type="number"
                                    name="age"
                                    className="form-control"
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Address</label>
                                <input type="text"
                                    className="form-control"
                                    name="address"
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Phone</label>
                                <input type="text"
                                    className="form-control"
                                    name="phone"
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Appointment</label>
                                <input type="text"
                                    className="form-control"
                                    name="appointment"
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Doctor</label>
                                <input type="text"
                                    className="form-control"
                                    name="doctor"
                                    onChange={this.handleChange} />
                            </div>
                            <button>Create</button>
                        </form>
                        : null
                }
            </div>
        )
    }
}

export default Patients
