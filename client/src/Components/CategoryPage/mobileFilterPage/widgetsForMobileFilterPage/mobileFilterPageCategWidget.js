import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { connect, useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { CHANGE_CATEGORY } from "../../../../store/actions/actionTypes";
import * as actions from "../../../../store/actions/index";
import FormControl from '@material-ui/core/FormControl';

const BBRadio = withStyles({
  root: {
    "&$checked": {
      color: "#ff0000",
    },
  },
  checked: {},
})((props) => <Radio {...props} />);


const CategoryWidget = (props) => {
  const dispatch = useDispatch();

  let [selectedCategory, setSelectedCategory] = useState(props.category);

  const handleChange = (categ) => {
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
    handleChange(props.category);
  }, [props.category]);

  return (
    <div >
      <span style={{ fontSize: "13px", fontWeight: "bold" }}>Category</span>
      <div className="WidgetBody">
        <FormControl component="fieldset">  
          <RadioGroup aria-label="category" name="category">
              <FormControlLabel
                value="1"
                control={<BBRadio />}
                label={`Motorcycle ${selectedCategory === 1 ? valued : ""}`}
                checked={selectedCategory === 1}
              />

              <FormControlLabel
                value="2"
                control={<BBRadio />}
                label={`Scooter ${selectedCategory === 2 ? valued : ""}`}
                checked={selectedCategory === 2}
              />

              <FormControlLabel
                value="3"
                control={<BBRadio />}
                label={`High-end Motorcycle ${
                  selectedCategory === 3 ? valued : " "
                } `}
                checked={selectedCategory === 3}
              />
            </RadioGroup>
        </FormControl>
      
      </div>
    </div>
  );
};

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
