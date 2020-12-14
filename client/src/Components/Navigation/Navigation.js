import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";

import "./Navigation.css";
import CityWidget from "./Widgets/CityWidget";
import CategoryWidget from "./Widgets/CategoryWidget";
import YearWidget from "./Widgets/YearWidget";
import BudgetWidget from "./Widgets/BudgetWidget";
import BrandWidget from "./Widgets/BrandWidget";
import KmWidget from "./Widgets/KmWidget/KmWidget";
import {BRANDS} from '../../shared/mappings/brands';
import { connect } from "react-redux";
import {CloseOutlined} from '@material-ui/icons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {ButtonGroup, Button, Dialog, DialogContent, Toolbar, IconButton, DialogActions} from '@material-ui/core';
import SortDropDown from '../SortDropDown/SortDropDown';
import * as actions from "../../store/actions/index";

const Navigation = (props) => {
  const[resetKm, setResetKm] = useState(0);
  const[filter_btn,showfilter] = useState(false);
  
  
  const whatFilters = () =>{
    return (
      <div>
        <CategoryWidget />
        <CityWidget />
        <BudgetWidget clear={1} budget={[0, 15000, 25000, 35000, 45000, 55000, 100000]} />
        <BrandWidget brands={BRANDS}/>
        <YearWidget startYear={2005} endYear={2020} />
        <KmWidget reset={resetKm}/>
      </div>
    )
  }

  const clearFilterData = () => {
    let category = props.category;
    let filterData = props.filter;
    filterData.budget = [];
    filterData.brand = [];
    filterData.myear = [];
    filterData.kmdriven = 100000;
    props.budgetFilter(category, filterData);
    props.brandFilter(category, filterData);
    props.manufactureDateFilter(category, filterData);
    props.kmFilter(category, filterData);
  }

  const clearAllFilters = () => {
    let check=document.getElementsByTagName('input');
    for(var i=0;i<check.length;i++){
      if(check[i].type=='checkbox'){
        check[i].checked=false;
      }
    }
    setResetKm(1);
    setTimeout(() => {
      setResetKm(0);
    }, 0);
    clearFilterData();
  };
  return (
    <div>
      {props.viewType==="mobile"&& 
        (<div className="filter-display">
          <ButtonGroup  fullWidth={true}  variant="contained" color="default">
            <div className="filter-btns" style={{ borderRadius: 0}}>
              <div style={{height:"40px",width:'100%', minWidth:"200px", marginBottom:"10px", marginRight:"5%",paddingLeft:"10px"}}>
                <SortDropDown  styling="yo"/>
              </div>
            </div>
            <Button onClick={()=>showfilter(true)} endIcon={<ExpandMoreIcon />}  style={{ borderRadius: 0, width:'160px'}}>
              FIlTER BY
            </Button>
          </ButtonGroup>
            <Dialog  fullScreen open={filter_btn} onClose={()=>showfilter(false)}>
              <DialogContent>  
                  <div className="resetFilter"><h5><b>Filters</b></h5></div>
                    <div className="filterSec" style={{boxShadow:'none'}}>
                      {/* <CategoryWidget /> */}
                      {whatFilters()}
                    </div>
              </DialogContent>
              <div className="line"></div>
              <div className="dialog-action-area">
                <button className="action-btn" onClick={()=>showfilter(false)}>Cancel</button>
                <button className="action-btn" id="cancel-action">Apply</button> 
              </div>
          </Dialog>
        </div>
      )}
      {props.viewType==="web" &&
        (<Grid item component="aside" xs={12} sm={12} md={3} lg={3} className="filter">
          <div className="resetFilter">
            <h5>Filter by</h5>
            <h5 onClick={clearAllFilters} style={{cursor:'pointer'}}>Clear All Filters</h5>
          </div>
          <div className="filterSec" style={{"marginBottom":"35px"}}>
            {whatFilters()}
          </div>
        </Grid>
       )}
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
    budgetFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata)),
    brandFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata)),
    manufactureDateFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata)),
    kmFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);


