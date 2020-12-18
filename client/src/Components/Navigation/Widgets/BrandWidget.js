import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { BRANDS } from '../../../shared/mappings/brands';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Input } from "@material-ui/core";

const BrandWidget = props => {
  const [index_present, add_index] = useState({current:new Set(props.default_indexes)});
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

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
          }}  />
          <span>{brand}</span>
        </label>
      </li>
    );
  });



  // For moibile view
  const sendIndex = (id) =>{
      //Used set for checking element exists 
      if(props.globalState.indexes.has(id)) {
        props.globalState.indexes.delete(id);
      }
      else {
        props.globalState.indexes.add(id);
      }
      index_present.current = new Set(props.globalState.indexes);
      add_index({...index_present})

  } 


  useEffect(()=>{
  },[index_present.current])

  const brandArrayMobile = props.brands.map((brand, index)=>{
    return (
      <li key={index}>
        <label>
          <input  type="checkbox" value={index} 
          checked={index_present.current.has(index)} className="filled-in" 
          onClick={() => {sendIndex(index)}} />
          <span>{brand}</span>
        </label>
      </li>
    )
  }) 

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
        <ul className="list">{matches?brandArray:brandArrayMobile}</ul> 
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  
  return {
    filter: state.vehicleDetails.filter,
    category: state.vehicleDetails.category,
    vehicles: state.vehicleDetails.vehicles,

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

