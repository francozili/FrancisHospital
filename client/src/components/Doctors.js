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
        sex: '',
        Specialty: ''
      },
      isDoctorFormDisplayed: false
  }

  componentDidMount = () => {
    axios.get('/api/v1/doctors').then(res => {
        this.setState({doctors: res.data})
    })
  }

  toggleDoctorForm = () => {
      this.setState((state, props) => {
          return ({isDoctorFormDisplayed: !state.isDoctorFormDisplayed})
      })
  }

  
  handleChange = (e) => {
    const cloneNewDoctor = {...this.state.newDoctor}
    cloneNewDoctor[e.target.name] = e.target.value
    this.setState({newDoctor: cloneNewDoctor},()=>{console.log(this.state.newDoctor)})
  }

  createDoctor = (e) => {
    e.preventDefault()
    console.log(this.state.newDoctor.name)
    axios
        .post('/api/v1/doctors', {
            name: this.state.newDoctor.name,
            description: this.state.newDoctor.description
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
                    Specialty: ''
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
                    {/* <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.newCreature.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            type="text"
                            name="description"
                            onChange={this.handleChange}
                            value={this.state.newCreature.description}
                        />
                    </div> */}
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
                    <label htmlFor="name">Phone</label>
                    <input type="text"
                        className="form-control"
                        name="phone"
                        onChange={this.handleChange} />
                    <div className="form-group">
                        <label htmlFor="name">Specialty</label>
                        <input type="text"
                            className="form-control"
                            name="specialty"
                            onChange={this.handleChange} />
                    </div>
                    {/* <div className="form-check form-check-inline">
                        <label htmlFor="name">SEX</label>
                        <input className="form-check-input"
                            type="radio"
                            name="Options"
                            id="female"
                            value="Female"
                            checked={this.state.Doctors_sex === 'Female'}
                            onChange={this.onChangeDoctorsSex}
                        />
                        <input className="form-check-input"
                            type="radio"
                            name="Options"
                            id="male"
                            value="Male"
                            checked={this.state.Doctors_sex === 'Male'}
                            onChange={this.onChangeDoctorsSex}
                        />
                    </div> */}
                    <button>Create</button>
                </form>
                : null
        }
      </div>
    )
  }
}

export default Doctors
