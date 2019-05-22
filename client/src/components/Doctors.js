import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Doctors extends Component {
    state = {
        doctors: [],
        newDoctor: {
            name: '',
            picture: '',
            address: '',
            phone: '',
            specialty: ''
        },
        isDoctorFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get('/api/v1/doctors').then(res => {
            this.setState({ doctors: res.data })
        })
    }

    toggleDoctorForm = () => {
        this.setState((state, props) => {
            return ({ isDoctorFormDisplayed: !state.isDoctorFormDisplayed })
        })
    }


    handleChange = (e) => {
        const cloneNewDoctor = { ...this.state.newDoctor }
        cloneNewDoctor[e.target.name] = e.target.value
        this.setState({ newDoctor: cloneNewDoctor }, () => { console.log(this.state.newDoctor) })
    }

    createDoctor = (e) => {
        e.preventDefault()
        console.log(this.state.newDoctor.name)
        axios
            .post('/api/v1/doctors', {
                name: this.state.newDoctor.name,
                address: this.state.newDoctor.address,
                picture: this.state.newDoctor.picture,
                phone: this.state.newDoctor.phone,
                specialty: this.state.newDoctor.specialty
            })
            .then(res => {
                const doctorsList = [...this.state.doctors]
                doctorsList.unshift(res.data)
                this.setState({
                    newDoctor: {
                        name: '',
                        picture: '',
                        address: '',
                        phone: '',
                        specialty: ''
                    },
                    isDoctorFormDisplayed: false,
                    doctors: doctorsList
                })
            })

    }

    render() {
        return (
            <div>
                <h1>Doctors</h1>
                {
                    this.state.doctors.map(doctor => {
                        return (
                            <div key={doctor._id}>
                                <Link
                                    to={`/doctors/${doctor._id}`}
                                >
                                    {doctor.name}
                                </Link>
                            </div>
                        )
                    })
                }
                <button onClick={this.toggleDoctorForm}>+ New Doctor</button>
                {
                    this.state.isDoctorFormDisplayed
                        ? <form onSubmit={this.createDoctor}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text"
                                    name="name"
                                    className="form-control"
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Picture</label>
                                <input type="text"
                                    name="picture"
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
                                <label htmlFor="name">Specialty</label>
                                <input type="text"
                                    className="form-control"
                                    name="specialty"
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

export default Doctors
