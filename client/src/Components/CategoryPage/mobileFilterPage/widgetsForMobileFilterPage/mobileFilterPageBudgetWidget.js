import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";


const BudgetWidget = props => {

  const selectCheckbox = selectedCheck => {
    let category = props.category;
    let filterData = props.filter;
    let position = filterData.budget.indexOf(selectedCheck);
    if (~position) {
      filterData.budget.splice(position, 1);
    } else {
      filterData.budget.push(selectedCheck);
    }
     props.budgetFilter(category, filterData);
  };

  const budgetArray = [];

  for (let i = 0; i < props.budget.length - 1; i++) {
    budgetArray.push(
      <li key={i}>
        <label>
          <input
            type="checkbox"
            className="filled-in"
            onClick={() => {
              selectCheckbox(props.budget[i] === 0 ? props.budget[i] : ((props.budget[i] + 1)+"-"+(props.budget[i + 1])))
            }}
          />
          <span>
            <strong>₹</strong>{" "}
            {props.budget[i] === 0 ? props.budget[i] : props.budget[i] + 1} -{" "}
            <strong /> {props.budget[i + 1]}
          </span>
        </label>
      </li>
    );
  }

  budgetArray.push(
    <li key={props.budget.length - 1}>
      <label>
        <input 
          type="checkbox" 
          className="filled-in" 
          onClick={() => {
            selectCheckbox()
          }}
        />
        <span>
          <strong>₹</strong> {props.budget[props.budget.length - 1] + 1} +
        </span>
      </label>
    </li>
  );

  return (
    <div >
     <span style={{ fontSize: "13px", fontWeight: "bold" }}>Budget</span>
      <div className="WidgetBody">
        <ul className="list">{budgetArray}</ul>
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
    budgetFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetWidget);