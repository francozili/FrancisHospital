import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from "axios";


class PatientsList extends Component {
    state = {
        patient: {
            name: '',
            age: '',
            appointment: '',
            address: '',
            phone: '',
            doctor: []
        },
        redirectToHome: false,
        isEditFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get(`/api/v1/patients/${this.props.match.params.id}`).then(res => {
            this.setState({ patient: res.data })
        })
    }

    deletePatient = () => {
        axios.delete(`/api/v1/patients/${this.props.match.params.id}`).then(res => {
            this.setState({ redirectToHome: true })
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    handleChange = (e) => {
        const clonePatient = { ...this.state.patient }
        clonePatient[e.target.name] = e.target.value
        this.setState({ patient: clonePatient })
    }

    updatePatient = (e) => {
        e.preventDefault()
        console.log('submit clicked')
        axios
            .put(`/api/v1/patients/${this.props.match.params.id}`, {
                name: this.state.patient.name,
                description: this.state.patient.description
            })
            .then(res => {
                this.setState({ doctor: res.data, isEditFormDisplayed: false })
            })
    }

    render() {
        console.log(this.state)
        if (this.state.redirectToHome) {
            return (<Redirect to="/" />)
        }

        return (
            <div>
                <h1>Patient</h1>
                <div>
                    <div>
                        Name: {this.state.patient.name}
                    </div>
                    <div>
                        Age: {this.state.patient.age}
                    </div>
                    <div>
                        Address: {this.state.patient.address}
                    </div>
                    <div>
                        Phone: {this.state.patient.phone}
                    </div>
                    <div>
                        Doctor: {this.state.patient.doctor}
                    </div>
                    <button onClick={this.deletePatient}>Delete</button>
                </div>

                <form onSubmit={this.updatePatient}>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text"
                            name="name"
                            className="form-control"
                            onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Age</label>
                        <input type="text"
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
                    <input type="submit" value="update doctor"/>
                </form>
            </div>
        );
    }
}

export default PatientsList;