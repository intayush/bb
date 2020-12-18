import React, { useEffect , useState} from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const YearWidget = props => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [years_present, add_years] = useState({current:new Set(props.default_years)});

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


  const selectCheckboxMobile = (id)=>{
    if(props.globalState.years.has(id)) props.globalState.years.delete(id);
    else props.globalState.years.add(id);
    years_present.current = new Set(props.globalState.years);
    add_years({...years_present})
  }
  

  useEffect(()=>{

  },[years_present])
  const mobileYearArray = [];
  for (let i = props.endYear; i >= props.startYear; i--) {
    mobileYearArray.push(
      <li key={i}>
        <label>
          <input
            type="checkbox" className="filled-in"
            value={i} checked={years_present.current.has(i)}
            onClick={() => {selectCheckboxMobile(i)}}
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
        <ul className="list">{matches ? yearArray : mobileYearArray}</ul>
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
