import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PairPriceCard from "./pairPriceCard";
import CoinImage from '../../images/EgaCion.png'


class PairPriceCardRow extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
   
    this.state = { records: [] };
    
    this.state = {
        btcega : '34.85010',
        usdtega : '2138.87',
        bnbega : '34.85010',
        egamos : '34.85010'
    };
    this.logo = CoinImage;

  }


  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div style={{marginTop:30}}>
          <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-3">
                            <PairPriceCard 
                                cardLogo = {this.logo}
                                pairName = 'BTC/EGA'
                                pairPrice = {this.state.btcega}
                            />
                        </div>
                        <div className="col-md-3">
                            <PairPriceCard 
                                cardLogo = {this.logo}
                                pairName = 'USDT/EGA'
                                pairPrice = {this.state.usdtega}
                            />
                        </div>
                        <div className="col-md-3">
                            <PairPriceCard 
                                cardLogo = {this.logo}
                                pairName = 'BNB/EGA'
                                pairPrice = {this.state.bnbega}
                            />
                        </div>
                        <div className="col-md-3">
                            <PairPriceCard 
                                cardLogo = {this.logo}
                                pairName = 'EGA/MOS'
                                pairPrice = {this.state.egamos}
                            />
                        </div>
                    </div>
                </div>
          </div>
      </div>
    );
  }
}

PairPriceCardRow.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(PairPriceCardRow);