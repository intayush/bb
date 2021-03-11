import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";


const BrandWidget = props => {
  const selectCheckbox = selectedCheck => {
    let category = props.category;
    let filterData = props.filter;
    let position = filterData.brand.indexOf(selectedCheck);
    if (position >= 0 && filterData.brand.length) {
      filterData.brand.splice(position, 1);
    } else {
      filterData.brand.push(selectedCheck);
    }

    props.brandFilter(category, filterData);
  };

  const brandArray = props.brands.map((brand, index) => {
    return (
      <li key={index}>
        <label>
          <input type="checkbox" className="filled-in" onClick={() => {
            selectCheckbox(index);
          }} />
          <span>{brand}</span>
        </label>
      </li>
    );
  });

  return (
    <div >
      <span style={{ fontSize: "13px", fontWeight: "bold" }}>Brand</span>
      <div className="WidgetBody">
        <ul className="list">{brandArray}</ul>
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
    brandFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrandWidget);

