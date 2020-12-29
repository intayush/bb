import React, { Component } from "react";
import Slider from "react-rangeslider";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import "./KmWidget.css";

class KmWidget extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      slideValue: 100000,
      matches : props.viewType,
      slideValueMobile:100000,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMobile = this.handleChangeMobile.bind(this);
  }
  componentDidMount(){
    
    this.setState({matches:this.props.viewType});
    this.setState({slideValueMobile:this.props.default_value})
  }

  componentDidUpdate(props) {
    if(props.reset === 1) {
      this.setState({
        slideValue: 100000
      });
    }
  }
  handleChange(event) {
    this.setState({slideValue: event});
    let category = this.props.category;
    let filterData = this.props.filter;
    filterData.kmdriven = event;
    this.props.kmFilter(category, filterData);
  }
  
  handleChangeMobile(event){
    this.setState({slideValueMobile:event})
    this.props.handleChangeCategory({...this.props.globalState, distance:event});
  }

  render() {
    return (

      <div className="kmWidget">
        <h3 className="WidgetTitle">
          <a
            data-toggle="collapse"
            href="#widget-body-1"
            role="button"
            aria-expanded="true"
            aria-controls="widget-body-1"
          >
            Kilometers
          </a>
        </h3>
        <div className="WidgetBody" 
            id="km-slider">
          <div className="MinMaxRange">
            <div className="MinRange">5000 KM</div>
            <div className="MaxRange">1,00,000 KMs</div>
            <br className="clr" />
          </div>
          {this.state.matches==="web"
            ?(<Slider
                value={this.state.slideValue}
                onChange={this.handleChange}
                min={5000}
                max={100000}
                step={5000}
                tooltip={false}/>
            )
            :(<Slider
                value={this.props.default_value}
                onChange={this.handleChangeMobile}
                min={5000}
                max={100000}
                step={5000}
                tooltip={false}
            />
            )
          }
          <br className="clr" />
          <div className="rangeOut">
            Upto <output id="js-output">{this.state.matches==="web"?this.state.slideValue : this.state.slideValueMobile}</output> KMs
          </div>
        </div>
        <br></br>
        <br></br>
      </div>

    );

  }
}

const mapStateToProps = state => {
  return {
    filter: state.vehicleDetails.filter,
    category: state.vehicleDetails.category
  };
};

const mapDispatchToProps = dispatch => {
  return {
    kmFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KmWidget);