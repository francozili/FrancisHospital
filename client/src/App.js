import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Doctors from "./components/Doctors.js"
import Patients from "./components/Patients.js"
import SingleDoctor from "./components/singleDoctor.js"
import SinglePatient from "./components/singlePatients.js"
// import EditDoctors from "./components/singleDoctor"
import navlogo from "./components/images/logo.png"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/" >
              <img src={navlogo} width="40" height="40" alt="Logo missing" />
            </a>
            <Link to="/" className="navbar-brand">Francis Teaching Hospital</Link>
            <div className="nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Doctors</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/patients" className="nav-link">Patients</Link>
                </li>

              </ul>
            </div>
          </nav>
          <Route path="/" exact component={Doctors} />
          <Route path="/" exact component={Patients} />
          <Route path="/doctors/:id" exact component={SingleDoctor} />
          <Route path="/patients/:id" exact component={SingleDoctor} />
        </div>
      </Router>
    );
  }
}
export default App;


