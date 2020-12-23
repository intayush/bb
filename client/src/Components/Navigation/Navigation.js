import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./Navigation.css";
import CityWidget from "./Widgets/CityWidget";
import CategoryWidget from "./Widgets/CategoryWidget";
import YearWidget from "./Widgets/YearWidget";
import BudgetWidget from "./Widgets/BudgetWidget";
import BrandWidget from "./Widgets/BrandWidget";
import KmWidget from "./Widgets/KmWidget/KmWidget";
import { BRANDS } from "../../shared/mappings/brands";
import { connect, useDispatch } from "react-redux";
import Slide from "@material-ui/core/Slide";
import { ButtonGroup, Button, Dialog, AppBar } from "@material-ui/core";
import SortDropDown from "../SortDropDown/SortDropDown";
import * as actions from "../../store/actions/index";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { CHANGE_CATEGORY, CHANGE_CITY } from "../../store/actions/actionTypes";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import categoryData from "../../shared/mappings/category_data";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Navigation = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const [resetKm, setResetKm] = useState(0);
  const [filter_btn, showfilter] = useState(false);

  const whatFilters = () => {
    return (
      <div>
        <CategoryWidget />
        <CityWidget />
        <BudgetWidget
          clear={1}
          budget={[0, 15000, 25000, 35000, 45000, 55000, 100000]}
        />
        <BrandWidget brands={BRANDS} />
        <YearWidget startYear={2005} endYear={2020} />
        <KmWidget viewType="web" reset={resetKm} />
      </div>
    );
  };
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
  };

  const clearAllFilters = () => {
    let check = document.getElementsByTagName("input");
    for (var i = 0; i < check.length; i++) {
      if (check[i].type == "checkbox") {
        check[i].checked = false;
      }
    }
    setResetKm(1);
    setTimeout(() => {
      setResetKm(0);
    }, 0);
    clearFilterData();
  };

  // Global state
  const [state, changeCategory] = useState({
    category: null,
    indexes: new Set(),
    years: new Set(),
    budget: new Set(),
    city: null,
    distance: 100000,
  });
  // Handle submit
  const handle_submit_category = () => {
    const filterData = props.filter;
    dispatch({ type: CHANGE_CATEGORY, payload: parseInt(state.category) });
    // for brands------------------------------------------------------------------------------------------------

    if (state.indexes.size > 0) {
      for (
        var it = state.indexes.values(), val = null;
        (val = it.next().value);

      ) {
        let position = filterData.brand.indexOf(val);
        if (position >= 0 && filterData.brand.length) {
          filterData.brand.splice(position, 1);
        } else {
          filterData.brand.push(val);
        }
      }
    } else filterData.brand = [];
    props.brandFilter(props.category, filterData);

    // For years------------------------------------------------------------------------------------------------
    if (state.years.size > 0) {
      for (
        var it = state.years.values(), val = null;
        (val = it.next().value);

      ) {
        let position = filterData.myear.indexOf(val);
        if (~position) {
          filterData.myear.splice(position, 1);
        } else {
          filterData.myear.push(val);
        }
      }
    } else filterData.myear = [];
    props.manufactureDateFilter(state.category, filterData);

    // // For budget------------------------------------------------------------------------------------------------
    if (state.budget.size > 0)
      for (
        var it = state.budget.values(), val = null;
        (val = it.next().value);

      ) {
        let position = filterData.budget.indexOf(val);
        if (~position) {
          filterData.budget.splice(position, 1);
        } else {
          filterData.budget.push(val);
        }
      }
    else filterData.budget = [];
    props.budgetFilter(state.category, filterData);

    // For City------------------------------------------------------------------------------------------------
    if (state.city) {
      dispatch({ type: CHANGE_CITY, payload: state.city });
      filterData.city = state.city;
      props.cityFilter(parseInt(state.category), filterData);
    }

    // //For Kilometer------------------------------------------------------------------------------------------------
    filterData.kmdriven = state.distance;
    props.kmFilter(state.category, filterData);

    showfilter(false);
  };



// Click handler for sort button

  const handler=(value)=>{
    let category  = props.category;
    let filterData = props.filter;
    let selectedFilter = value.split("-");
    filterData.sort.column = selectedFilter[0];
    filterData.sort.order = selectedFilter[1];
    props.getsortedData(category,filterData);
  }

  return (
    <div>
      {props.viewType === "mobile" && (
        <div className="filter-display">
          <ButtonGroup fullWidth={true} variant="contained" color="default">
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              style={{
                borderRadius: 0,
                width: "50%",
                lineHeight: "20px",
                fontSize: "2ex",
                backgroundColor: "#efefef",
              }}
              endIcon={<ArrowDropDownIcon />}
            >
              SORT BY
            </Button>

            {/* menu for the sort by */}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              anchorOrigin={{
                vertical: "top",
                horizontal:'top'
              }}
              transformOrigin={{
                vertical: 'top',
                
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{style:{
                width:'100%',
                bottom:'100px !important'
              }}}
            >
              <MenuItem onClick={()=>handler("")}>SORT BY</MenuItem>
              <MenuItem onClick={()=>handler("price-asc")}>Price - Low to High</MenuItem>
              <MenuItem onClick={()=>handler("price-desc")}>Price - High to Low</MenuItem>
              <MenuItem onClick={()=>handler("myear-asc")}>Manufacturing Year - Low to High</MenuItem>
              <MenuItem onClick={()=>handler("myear-desc")}>Manufacturing Year - High to Low</MenuItem>
              <MenuItem onClick={()=>handler("kmdriven-asc")}>Kilometer - Low to High</MenuItem>
            </Menu>
            <Button
              onClick={() => showfilter(true)}
              endIcon={<ArrowDropDownIcon />}
              style={{
                borderRadius: 0,
                width: "50%",
                lineHeight: "20px",
                fontSize: "2ex",
                backgroundColor: "#efefef",
              }}
            >
              FILTER BY
            </Button>
          </ButtonGroup>
        </div>
      )}
      {props.viewType === "web" && (
        <Grid
          item
          component="aside"
          xs={12}
          sm={12}
          md={3}
          lg={3}
          className="filter"
        >
          <div className="resetFilter">
            <h5>Filter by</h5>
            <h5 onClick={clearAllFilters} style={{ cursor: "pointer" }}>
              Clear All Filters
            </h5>
          </div>
          <div className="filterSec" style={{ marginBottom: "35px" }}>
            {whatFilters()}
          </div>
        </Grid>
      )}
      <Dialog
        fullScreen
        open={filter_btn}
        style={{ position: "fixed" }}
        onClose={() => showfilter(false)}
        TransitionComponent={Transition}
      >
        <div className="filterSec" style={{ boxShadow: "none" }}>
          <p style={{ marginLeft: "5%", fontSize: "14px", fontWeight: "bold" }}>
            Filter
          </p>
          <CategoryWidget
            default_category={state.category}
            globalState={state}
            handleChangeCategory={changeCategory}
          />
          <CityWidget
            default_city={state.city}
            globalState={state}
            handleChangeCategory={changeCategory}
          />
          <BrandWidget
            brands={BRANDS}
            default_indexes={state.indexes}
            globalState={state}
            handleChangeCategory={changeCategory}
          />
          <YearWidget
            startYear={2005}
            endYear={2020}
            default_years={state.years}
            globalState={state}
            handleChangeCategory={changeCategory}
          />
          <BudgetWidget
            clear={1}
            default_budget={state.budget}
            globalState={state}
            handleChangeCategory={changeCategory}
            budget={[0, 15000, 25000, 35000, 45000, 55000, 100000]}
          />
          <KmWidget
            default_value={state.distance}
            globalState={state}
            viewType={props.viewType}
            handleChangeCategory={changeCategory}
          />
        </div>
        <div className="line"></div>
        <AppBar
          position="fixed"
          color="primary"
          style={{ top: "auto", bottom: 0, backgroundColor: "#F8F8F8" }}
        >
          <div className="line"></div>

          <div className="btn-container">
            <div className="action-btn" onClick={() => showfilter(false)}>
              <span style={{ color: "black" }}>Cancel</span>
            </div>
            <div
              className="red-action-btn"
              id="cancel-action"
              onClick={handle_submit_category}
            >
              <span>Apply</span>
            </div>
          </div>
        </AppBar>
      </Dialog>
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
    cityFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata)),
    budgetFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata)),
    brandFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata)),
    manufactureDateFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata)),
    kmFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata)),
      // for the sort dropdown
      getsortedData: (category,sortKey) => dispatch(actions.getVehicles(category,sortKey)),  
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
