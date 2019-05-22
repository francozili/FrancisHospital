import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from "axios";


class DoctorsList extends Component {
    state = {
        doctor: {
            name: '',
            picture: '',
            address: '',
            phone: '',
            specialty: ''
        },
        redirectToHome: false,
        isEditFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get(`/api/v1/doctors/${this.props.match.params.id}`).then(res => {
            this.setState({ doctor: res.data })
        })
    }

    deleteDoctor = () => {
        axios.delete(`/api/v1/doctors/${this.props.match.params.id}`).then(res => {
            this.setState({ redirectToHome: true })
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    handleChange = (e) => {
        const cloneDoctor = { ...this.state.doctor }
        cloneDoctor[e.target.name] = e.target.value
        this.setState({ doctor: cloneDoctor })
    }

    updateDoctor = (e) => {
        e.preventDefault()
        console.log('submit clicked')
        axios
            .put(`/api/v1/doctors/${this.props.match.params.id}`, {
                name: this.state.doctor.name,
                address: this.state.doctor.address,
                picture: this.state.doctor.picture,
                phone: this.state.doctor.phone,
                specialty: this.state.doctor.specialty
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
                <h1>Doctor</h1>
                <div>
                    <div>
                        Name: {this.state.doctor.name}
                    </div>
                    <div>
                        Picture: {this.state.doctor.picture}
                    </div>
                    <div>
                        Address: {this.state.doctor.address}
                    </div>
                    <div>
                        Phone: {this.state.doctor.phone}
                    </div>
                    <div>
                        Specialty: {this.state.doctor.specialty}
                    </div>
                    <button onClick={this.deleteDoctor}>Delete</button>
                </div>

                <form onSubmit={this.updateDoctor}>

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
                    <input type="submit" value="update doctor" />
                </form>
            </div>
        );
    }
}

export default DoctorsList;