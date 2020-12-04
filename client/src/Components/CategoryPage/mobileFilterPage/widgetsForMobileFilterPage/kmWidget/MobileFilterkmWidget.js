import React, { Component } from "react";
import Slider from "react-rangeslider";
import { connect } from "react-redux";
import * as actions from "../../../../../store/actions/index";
import "./MobileFilterkmWidget.css";

class KmWidget extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      slideValue: 100000,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidUpdate(props) {
    if (props.reset === 1) {
      this.setState({
        slideValue: 100000,
      });
    }
  }
  handleChange(event) {
    this.setState({
      slideValue: event,
    });

    let category = this.props.category;
    let filterData = this.props.filter;
    filterData.kmdriven = event;
    this.props.kmFilter(category, filterData);
  }

  render() {
    return (
      <div className="kmWidget">
        
        <span style={{ fontSize: "13px", fontWeight: "bold" }}>Kilometers</span>
        <div className="WidgetBody" id="km-slider">
          <div className="MinMaxRange">
            <div className="MinRange">5000 KM</div>
            <div className="MaxRange">1,00,000 KMs</div>
            <br className="clr" />
          </div>
          <Slider
            value={this.state.slideValue}
            onChange={this.handleChange}
            min={5000}
            max={100000}
            step={5000}
            tooltip={false}
          />
          <br className="clr" />
          <div className="rangeOut">
            Upto <output id="js-output">{this.state.slideValue}</output> KMs
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.vehicleDetails.filter,
    category: state.vehicleDetails.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    kmFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KmWidget);
