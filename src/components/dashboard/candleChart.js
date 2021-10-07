import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {SERVER_MAIN_URL} from '../../config';
import Chart from "../../images/chart.png";



class PairPriceCard extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
   
    this.state = { records: [] };
    this.state = {
        currentRecord: {
            name: '',
            phonenumber: '',
            password: ''
        }
    };
    this.state= {
        cardLogo : props.cardLogo,
        pairName : props.pairName,
        pairPrice : props.pairPrice
    }
  }


  // This method will delete a record based on the method
  

  // This following section will display the table with the records of individuals.
  render() {
      
    return (
        <div className="col-lg-12" style={{marginTop:30}} id="apppa">
            <div className="card">
                <div className="card-header d-flex justify-content-between flex-wrap">
                    <div className="header-title">
                        <h4 className="card-title mb-2">Market Overview</h4>
                        <p className="mb-0">Pictorial monthly analytics of market.</p>          
                    </div>
                    
                </div>
                
                <div className="card-body">
                    <div id="apex-candlestick-chart" style={{textAlign:"center"}}>
                        <img src={Chart}/>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

PairPriceCard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(PairPriceCard);