import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { withRouter } from "react-router";
import SideBar from "./sidebar"
import HeaderBar from "./headerbar"
import {SERVER_MAIN_URL} from '../config'
 
class Edit extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.state = {
        name: "",
        phonenumber: "",
        errors: {}
    };
  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    axios
      .get(`${SERVER_MAIN_URL}/record/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          name: response.data.name,
          phonenumber: response.data.phonenumber
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  // These methods will update the state properties.
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
 
  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
    const newEditedperson = {
      name: this.state.name,
      phonenumber: this.state.phonenumber
    };
    console.log(newEditedperson);
 
    // This will send a post request to update the data in the database.
    axios
      .post(
        `${SERVER_MAIN_URL}/update/${this.props.match.params.id}`,
        newEditedperson
      )
      .then((res) => console.log(res.data));
 
    this.props.history.push("/list");
  }
 
  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div>
            <SideBar />
            <HeaderBar />
            <div className="container-fluid content-inner pb-0" style={{marginLeft:'13%', paddingRight:'15%'}}>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title text-white">Update {this.state.name}</h4>
                            </div>
                            <div className="d-flex mt-3 ms-4 me-4 justify-content-between">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label>User Name: </label>
                                        <input
                                            type="text"
                                            id='name'
                                            className="form-control"
                                            value={this.state.name}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number: </label>
                                        <input
                                            type="text"
                                            id="phonenumber"
                                            className="form-control"
                                            value={this.state.phonenumber}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    
                                    <br />
                            
                                    <div className="form-group">
                                        <input
                                            type="submit"
                                            value="Update User"
                                            className="btn btn-primary"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        <h3 align="center">Update Record</h3>
        
      </div>
    );
  }
}
 
// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.
 
export default withRouter(Edit);