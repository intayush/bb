import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const BrandWidget = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [hasIndex, sethasIndex] = useState(props.brandsArr);

  console.log("----->", hasIndex);

  const selectCheckbox = (selectedCheck) => {
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
          <input
            type="checkbox"
            className="filled-in"
            onClick={() => {
              selectCheckbox(index);
            }}
          />
          <span>{brand}</span>
        </label>
      </li>
    );
  });

  // For mobile view selection for category
  const sendIndex = (selectedCheck) => {
    let position = props.brandsArr.indexOf(selectedCheck);
    if (position >= 0 && props.brandsArr.length) {
      props.brandsArr.splice(position, 1);
    } else {
      props.brandsArr.push(selectedCheck);
    }
    sethasIndex([...props.brandsArr]);
  };

  console.log(hasIndex)
  
  const brandArrayMobile = props.brands.map((brand, index) => {
    return (
      <li key={index}>
        {hasIndex && (
          <label>
            <input
              checked={hasIndex.includes(index)?true:false}
              type="checkbox"
              value={index}
              className="filled-in"
              onClick={() => sendIndex(index)}
            />
            <span>{brand}</span>
          </label>
        )}
      </li>
    );
  });

  return (
    <div className="BrandWidget">
      <h3 className="WidgetTitle">
        <a
          data-toggle="collapse"
          href="#widget-body-1"
          role="button"
          aria-expanded="true"
          aria-controls="widget-body-1"
        >
          Brand
        </a>
      </h3>
      <div className="WidgetBody">
        <ul className="list">{matches ? brandArray : brandArrayMobile}</ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.vehicleDetails.filter,
    category: state.vehicleDetails.category,
    vehicles: state.vehicleDetails.vehicles,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    brandFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandWidget);
