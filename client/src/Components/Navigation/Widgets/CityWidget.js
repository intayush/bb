import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { connect, useSelector, useDispatch } from "react-redux";
import * as actions from "../../../store/actions/index";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import useDebounce from '../../MainMenu/use-debounce';
import { CHANGE_CITY, CHANGE_CATEGORY } from "../../../store/actions/actionTypes";
import ReactTags from 'react-tag-autocomplete';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { red } from '@material-ui/core/colors';
import { createStyles, Theme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const BBRadio = withStyles({
  root: {
    "&$checked": {
      color: "#ff0000"
    }
  },
  checked: {}
})(props => <Radio {...props} />);

const useStyles = makeStyles((Theme) =>
  createStyles({
    root: {
      display: 'flex-end',
      flexWrap: 'wrap',
    },
    margin: {
      // margin: Theme.spacing(1),
      width: '100%',
    },
  }),
);

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const CityWidget = props => {
  
  const dispatch = useDispatch();
  const classes = useStyles();
  const { selectedCity, category, citynames } = useSelector(state => state.vehicleDetails);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  useEffect(() => {
    const filterData = {
      ...citynames,
      city: selectedCity
    }
    console.log("filterData",filterData['city']);

    if(debouncedSearchTerm.length > 2){
      setTimeout(() => {
        dispatch(actions.getCityNames(filterData, debouncedSearchTerm));
      }, 10);
    }
  }, [debouncedSearchTerm, selectedCity]);

  const searchCity = event => {
    event.preventDefault();
    let filterData = props.filter;
    dispatch({ type: CHANGE_CITY, payload: searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1) });
    dispatch({ type: CHANGE_CATEGORY, payload: category });
    filterData.city = `${searchTerm}*`;
    props.cityFilter(category, filterData);
  };

  const searchClick = clickValue => {
    let filterData = props.filter;
    dispatch({ type: CHANGE_CITY, payload: clickValue.target.value });
    dispatch({ type: CHANGE_CATEGORY, payload: category });
    filterData.city = `${clickValue.target.value}*`;
    props.cityFilter(category, filterData);
  };

  const updateState = value => {
    setSearchTerm(value.toLowerCase());
  };

  const citiesArr = ['Aluva', 'Kolkata', 'Rajahmundry', 'Thrissur', 'Bangalore', 'Chennai', 'New Delhi', 'Gurgaon', 'Hyderabad', 'Jaipur', 'Mumbai', 'Nagpur', 'Pune' ];

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
          City
        </a>
      </h3>
      <div className="WidgetBody">
        <form className={classes.root} onSubmit={searchCity}>
          <ThemeProvider theme={theme}>
            <Autocomplete
              id="searchCity"
              freeSolo
              options={searchTerm ? citiesArr: []}
              renderInput={(params) => (
                <TextField
                  className={classes.margin}
                  onChange={updateState(params.inputProps.value)} 
                  {...params} 
                  // label="Search City"
                  variant="outlined"
                  // id="mui-theme-provider-standard-input"
                  id="mui-theme-provider-outlined-input"
                  />
                )}
              />
          </ThemeProvider>
          {/* <button type="button" onClick={searchCity} style={{paddingLeft: '12'}}>
            <i className="material-icons">search</i>
          </button> */}
        </form>

        <RadioGroup aria-label="gender" name="city" onChange={searchClick}>
          <ul className="cat-list">
            {citiesArr.map(eachCity => (
              <li>
                <FormControlLabel
                  value={eachCity}
                  control={<BBRadio />}
                  label={eachCity}
                  checked={selectedCity === eachCity}
                />
              </li>
            ))}
          </ul>
        </RadioGroup>
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
    cityFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityWidget);
