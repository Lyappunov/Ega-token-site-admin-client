import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
class Navbar extends Component {
  render() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          MongoDB
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
 
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                Create Record
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/list">
                User List
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
  }
};
 
Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Navbar);