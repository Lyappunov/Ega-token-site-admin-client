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
    this.onSubmit = this.onSubmit.bind(this);
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
  editClose() {
    window.location.href='/list'
  }
 
  // These methods will update the state properties.
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onChangeFile = e => {
      console.log('your selected file is ', e.target)
      this.setState({ selectedFile: e.target.files[0]})
      
    };
 
  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
    let fileName = this.state.name + '_' + this.state.selectedFile.name
    const formData = new FormData();
    formData.append(
      "myPhoto",
      this.state.selectedFile,
      fileName
    );
    const newEditedperson = {
      name: this.state.name,
      phonenumber: this.state.phonenumber,
      avatar:formData
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
            <div className="container-fluid content-inner pb-0" style={{paddingLeft:'14%'}}>
              <div className="row">
                  <div className="col-sm-9" style={{margin:'auto'}}>
                      <div className="card" style={{paddingBottom:35}}>
                          <div className="card-header">
                              <h4 className="card-title text-white">Update {this.state.name}</h4>
                          </div>
                          <div className="d-flex mt-3 ms-4 me-4 justify-content-between">
                              <form onSubmit={this.handleSubmit} style={{width:'100%'}}>
                                  <div className="modal-content">
                                      <div className="modal-body">
                                          <div className="form-floating mb-4">
                                              <input type="text" className="form-control" id="name" placeholder="User Name" onChange={this.onChange} value={this.state.name}/>
                                              <label>User Name</label>
                                          </div>
                                          <div className="form-floating mb-4">
                                              <input type="text" className="form-control" id="phonenumber" placeholder="Phone Number" onChange={this.onChange} value={this.state.phonenumber}/>
                                              <label>Phone Number</label>
                                          </div>
                                          <div className="form-floating mb-4">
                                              <input type="file" className="form-control" id="avatar" placeholder="Photo" onChange={this.onChangeFile} value=''/>
                                              
                                          </div>
                                      </div>
                                      <div className="modal-footer">
                                          <button type="button" className="btn btn-secondary" onClick={this.editClose}>Close</button>
                                          <button type="submit" className="btn btn-primary">Save</button>
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
            </div> 
        </div>
    );
  }
}
 
// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.
 
export default withRouter(Edit);