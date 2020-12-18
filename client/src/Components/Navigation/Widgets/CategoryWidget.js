import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { connect, useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CHANGE_CATEGORY } from "../../../store/actions/actionTypes";
import * as actions from "../../../store/actions/index";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const BBRadio = withStyles({
  root: {
    "&$checked": {
      color: "#ff0000",
    },
  },
  checked: {},
})((props) => <Radio {...props} />);

const CategoryWidget = React.memo((props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch();
  let history = useHistory();

  let [selectedCategory, setSelectedCategory] = useState(props.category);
  const [mobile_category, setMobileCategory] = useState(props.default_category);

  const handleChange = (e) => {
    let filterData = props.filter;
    setSelectedCategory(parseInt(e.target.value));
    dispatch({
      type: CHANGE_CATEGORY,
      payload: parseInt(e.target.value),
    });
    props.cityFilter(parseInt(e.target.value), filterData);
  };

  const val = (value) => {
    if (value[0] === "NA") {
      return 0;
    } else {
      return Object.keys(props.vehicles).length;
    }
  };
  let valued = " ( " + val(props.vehicles) + " ) ";

  const filtering = [
    {
      type: "Motorcycle",
      url: "/category/bike",
    },
    {
      type: "Scooter",
      url: "/category/scooter",
    },
    {
      type: "High-end Motorcycle",
      url: "/category/high_end_bike",
    },
  ];

  const handler = (event) => {
    setMobileCategory(event.target.value);
    props.handleChangeCategory({
      ...props.globalState,
      category: event.target.value,
    });
  };

  return (
    <div className="CityWidget">
      <h3 className="WidgetTitle">
        <a
          data-toggle="collapse"
          href="#widget-body-1"
          role="button"
          aria-expanded="true"
          aria-controls="widget-body-1"
        >
          Category
        </a>
      </h3>
      <div className="WidgetBody">
        {matches ? (
          <RadioGroup
            aria-label="category"
            name="category"
            onChange={handleChange}
          >
            <ul>
              {filtering.map((item, i) => {
                return (
                  <li style={{ marginTop: "2%" }}>
                    <FormControlLabel
                      value={i + 1}
                      onChange={() => history.push(item.url)}
                      control={<BBRadio />}
                      label={`${item.type} ${
                        selectedCategory === i + 1 ? valued : ""
                      }`}
                      checked={selectedCategory === i + 1}
                    />
                  </li>
                );
              })}
            </ul>
          </RadioGroup>
        ) : (
          <RadioGroup value={mobile_category} onChange={handler}>
            <FormControlLabel
              value="1"
              control={<BBRadio />}
              label="Motorcycle"
              checked={mobile_category === "1"}
            />
            <FormControlLabel
              value="2"
              control={<BBRadio />}
              label="Scooter"
              checked={mobile_category === "2"}
            />
            <FormControlLabel
              value="3"
              control={<BBRadio />}
              label="High-end Motorcycle"
              checked={mobile_category === "3"}
            />
          </RadioGroup>
        )}
      </div>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    filter: state.vehicleDetails.filter,
    category: state.vehicleDetails.category,
    vehicles: state.vehicleDetails.vehicles,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cityFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryWidget);
