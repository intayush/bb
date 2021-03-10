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
import { createStyles, ThemeProvider } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import searchIcon from "../../../assets/search-icon.svg";

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
    mobileWidth:{
      width:'60%'
    }
  }),
);



const CityWidget = ({default_city,filter,cityFilter,handleChangeCategory,globalState}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const dispatch = useDispatch();
  const classes = useStyles();
  const { selectedCity, category, citynames } = useSelector(state => state.vehicleDetails);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [selectCityMobile, changeMobileCity] = useState(default_city)


  const filterData = {
    ...citynames,
    city: selectedCity
  }

  useEffect(() => {
  
    if(debouncedSearchTerm.length > 2){
      setTimeout(() => {
        dispatch(actions.getCityNames(filterData, debouncedSearchTerm));
      }, 10);
    }
  }, [debouncedSearchTerm, selectedCity]);

  const searchCity = event => {
    event.preventDefault();
    let filterData = filter;
    dispatch({ type: CHANGE_CITY, payload: searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1) });
    dispatch({ type: CHANGE_CATEGORY, payload: category });
    filterData.city = `${searchTerm}*`;
    cityFilter(category, filterData);
  };

  const searchClick = clickValue => {
    let filterData = filter;
    dispatch({ type: CHANGE_CITY, payload: clickValue.target.value });
    dispatch({ type: CHANGE_CATEGORY, payload: category });
    filterData.city = `${clickValue.target.value}*`;
    cityFilter(category, filterData);
  };

  const updateState = value => {
    setSearchTerm(value.toLowerCase());
  };

  const cityChangeHandler=(event)=>{
    changeMobileCity(event.target.value);
    handleChangeCategory({...globalState, city : event.target.value});
  }

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
                <div style={{display:'flex',flexDirection:'row'}}><TextField
                      placeholder={matches?"":"Search your City"}
                      className={matches?classes.margin:classes.mobileWidth}
                      onChange={updateState(params.inputProps.value)} 
                      {...params} 
                      variant="outlined"
                      id="mui-theme-provider-outlined-input"
                /> 
                  {matches?<></>:<div style={{backgroundColor:'red',padding:'2%',height:'5%'}} ><img  src={searchIcon} height="20" width="30" alt=""/></div>}
                </div>
                
                )}
              />
          </ThemeProvider>
     
        </form>

        {matches 
          ?(<RadioGroup  name="city" onChange={searchClick}>
            <ul className="cat-list">
                {(citiesArr.map(eachCity => (
                    <li>
                      <FormControlLabel
                        value={eachCity}
                        control={<BBRadio />}
                        label={eachCity}
                        checked={selectedCity === eachCity}
                      />
                    </li>
               )))}
            </ul>
            </RadioGroup>
          )
          :(<RadioGroup  name="city" value={selectCityMobile} onChange={cityChangeHandler}>
              <ul className="cat-list">
                  {citiesArr.map(eachCity => <li>
                        <FormControlLabel
                          value={eachCity}
                          control={<BBRadio />}
                          label={eachCity}
                          checked={selectCityMobile === eachCity}
                        />
                      </li>)
                }
              </ul>
            </RadioGroup>
          )
        }
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
