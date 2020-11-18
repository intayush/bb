import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { CHANGE_CATEGORY } from "../../../store/actions/actionTypes";
import * as actions from "../../../store/actions/index";

const BBRadio = withStyles({
  root: {
    "&$checked": {
      color: "#ff0000",
    },
  },
  checked: {},
})((props) => <Radio {...props} />);

const useStyle = makeStyles({
  countColor: {
    color: "#ff0000",
  },
});

const CategoryWidget = React.memo((props) => {
  const dispatch = useDispatch();

  let [selectedCategory, setSelectedCategory] = useState(props.category || 1);

  const handleChange = (event) => {
    let filterData = props.filter;
    console.log("filter count", parseInt(event.target.value));
    setSelectedCategory(parseInt(event.target.value));

    dispatch({
      type: CHANGE_CATEGORY,
      payload: parseInt(event.target.value),
    });
    props.cityFilter(parseInt(event.target.value), filterData);
  };

  const handleChange2 = (categ) => {
    let filterData = props.filter;
    setSelectedCategory(categ);
    dispatch({ type: CHANGE_CATEGORY, payload: categ });
    props.cityFilter(categ, filterData);
  };

  const val = (value) => {
    if (value[0] === "NA") {
      return 0;
    } else {
      return Object.keys(props.vehicles).length;
    }
  };

  let valued = " ( " + val(props.vehicles) + " ) ";

  useEffect(() => {
    handleChange2(props.category);
  }, [props.category]);

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
        <RadioGroup
          aria-label="category"
          name="category"
          onChange={handleChange}
        >
          <ul className="cat-list">
            {/* <Link to='/category/all'>
              <li>
                <FormControlLabel
                  value="0"
                  control={<BBRadio />}
                  label= {`All ${selectedCategory === 0 ? valued : ""}` }
                  checked={selectedCategory === 0}
                />valued
              </li>
            </Link> */}
            <Link to="/category/bike">
              <li>
                <FormControlLabel
                  value="1"
                  control={<BBRadio />}
                  label={`Motorcycle ${selectedCategory === 1 ? valued : ""}`}
                  checked={selectedCategory === 1}
                />
              </li>
            </Link>
            <Link to="/category/scooter">
              <li>
                <FormControlLabel
                  value="2"
                  control={<BBRadio />}
                  label={`Scooter ${selectedCategory === 2 ? valued : ""}`}
                  checked={selectedCategory === 2}
                />
              </li>
            </Link>
            <Link to="/category/high_end_bike">
              <li>
                <FormControlLabel
                  value="3"
                  control={<BBRadio />}
                  label={`High-end Motorcycle ${
                    selectedCategory === 3 ? valued : " "
                  } `}
                  checked={selectedCategory === 3}
                />
              </li>
            </Link>
          </ul>
        </RadioGroup>
      </div>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    filter: state.vehicleDetails.filter,
    category: state.vehicleDetails.category,
    vehicles: state.vehicleDetails.vehicles,
    category: state.vehicleDetails.category,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cityFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryWidget);
