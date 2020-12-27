import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const BudgetWidget = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [budget_present, add_budegt] = useState(props.budget2);

  const selectCheckbox = (selectedCheck) => {
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
              selectCheckbox(
                props.budget[i] === 0
                  ? props.budget[i]
                  : props.budget[i] + 1 + "-" + props.budget[i + 1]
              );
            }}
          />
          <span>
            <strong>₹</strong>
            {props.budget[i] === 0 ? props.budget[i] : props.budget[i] + 1} -
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
            selectCheckbox();
          }}
        />
        <span>
          <strong>₹</strong> {props.budget[props.budget.length - 1] + 1} +
        </span>
      </label>
    </li>
  );

  const selectCheckboxMobile = (selectedCheck) => {
    let position = props.budget2.indexOf(selectedCheck);
    if (~position) {
      props.budget2.splice(position, 1);
    } else {
      props.budget2.push(selectedCheck);
    }
    add_budegt([...props.budget2]);
  };

  const mobileBudgetComponent = () => {
    const mobileBudgetArray = [];
    for (let i = 0; i < props.budget.length - 1; i++) {
      mobileBudgetArray.push(
        <li key={i}>
          <label>
            {budget_present && (
              <input
                checked={budget_present.includes(props.budget2[i])?true:false}
                type="checkbox"
                className="filled-in"
                value={
                  props.budget[i] === 0
                    ? props.budget[i]
                    : props.budget[i] + 1 + "-" + props.budget[i + 1]
                }
                onClick={() => {
                  selectCheckboxMobile(
                    props.budget[i] === 0
                      ? props.budget[i]
                      : props.budget[i] + 1 + "-" + props.budget[i + 1]
                  );
                }}
              />
            )}

            <span>
              <strong>₹</strong>
              {props.budget[i] === 0 ? props.budget[i] : props.budget[i] + 1}
              <strong /> {props.budget[i + 1]}
            </span>
          </label>
        </li>
      );
    }

    mobileBudgetArray.push(
      <li key={props.budget.length - 1}>
        <label>
          <input
            type="checkbox"
            className="filled-in"
            onClick={() => {
              selectCheckboxMobile();
            }}
          />
          <span>
            <strong>₹</strong> {props.budget[props.budget.length - 1] + 1} +
          </span>
        </label>
      </li>
    );
    return mobileBudgetArray;
  };
  return (
    <div className="BudgetWidget">
      <h3 className="WidgetTitle">
        <a
          data-toggle="collapse"
          href="#widget-body-1"
          role="button"
          aria-expanded="true"
          aria-controls="widget-body-1"
        >
          Budget
        </a>
      </h3>
      <div className="WidgetBody">
        <ul className="list">
          {matches ? budgetArray : mobileBudgetComponent()}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.vehicleDetails.filter,
    category: state.vehicleDetails.category,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    budgetFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetWidget);
