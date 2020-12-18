import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

const YearWidget = props => {
  const selectCheckbox = selectedCheck => {
    let category = props.category;
    let filterData = props.filter;
    let position = filterData.myear.indexOf(selectedCheck);

    if (~position) {
      filterData.myear.splice(position, 1);
    } else {
      filterData.myear.push(selectedCheck);
    }
    props.manufactureDateFilter(category, filterData);
  };

  const yearArray = [];

 

  for (let i = props.endYear; i >= props.startYear; i--) {
    yearArray.push(
      <li key={i}>
        <label>
          <input
            type="checkbox"
            className="filled-in"
            onClick={() => {
              selectCheckbox(i);
            }}
          />
          <span>{i}</span>
        </label>
      </li>
    );
  }

  return (
    <div className="YearWidget">
      <h3 className="WidgetTitle">
        <a
          data-toggle="collapse"
          href="#widget-body-1"
          role="button"
          aria-expanded="true"
          aria-controls="widget-body-1"
        >
          Manufacturing Year
        </a>
      </h3>
      <div className="WidgetBody">
        <ul className="list">{yearArray}</ul>
        <br className="clr" />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    filter: state.vehicleDetails.filter,
    category: state.vehicleDetails.category
  };
};
const mapDispatchToProps = dispatch => {
  return {
    manufactureDateFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YearWidget);
