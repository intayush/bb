import React, { useState } from "react";
import mobileDownArrow from "../../assets/down-arrow-sort.svg";
import mobileUpArrow from "../../assets/up-arrow-sort.svg";
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
import * as actions from "../../store/actions/index";
import { CHANGE_CATEGORY } from "../../store/actions/actionTypes";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Navigation = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortByButtonRed, setSortByButtonRed] = useState(false);
  const [sortByButtonUpIcon, setsortByButtonUpIcon] = useState(false);
  const [filterByButtonRed, setfilterByButtonRed] = useState(false);
  const [filterByButtonUpIcon, setfilterByButtonUpIcon] = useState(false);

  const handleClick = (event) => {
    setSortByButtonRed(!sortByButtonRed);
    setsortByButtonUpIcon(!sortByButtonUpIcon);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSortByButtonRed(!sortByButtonRed);
    setsortByButtonUpIcon(!sortByButtonUpIcon);
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const [resetKm, setResetKm] = useState(0);
  const [filter_btn, showfilter] = useState(false);

  const filtersGroup = () => {
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

  // state for payloads of redux for the mobile view widgets
  const [state, changeCategory] = useState({
    city: null,
    distance: 100000,
    category: null,
    mYear: [...props.filter.myear],
    brandsArr: [...props.filter.brand],
    budget:[...props.filter.budget]
  });


  const handle_submit_category = () => {
    if (state.category) {
      const filterData = props.filter;
      dispatch({ type: CHANGE_CATEGORY, payload: parseInt(state.category) });
      props.cityFilter(state.category, filterData);
      
    }

    if (state.city) {
      const filterData = props.filter;
      filterData.city = `${state.city}`;
      props.cityFilter(
        state.category !== null ? state.category : 1,
        filterData
      );
      state.city=null;
    }

    if (state.brandsArr.length !== 0) {
      const filterData = props.filter;
      filterData.brand = state.brandsArr;
      props.brandFilter(
        state.category !== null ? state.category : 1,
        filterData
      );
      state.brandsArr=[]
    }

    if (state.mYear.length !== 0) {
      const filterData = props.filter;
      filterData.myear = state.mYear;

      props.manufactureDateFilter(
        state.category !== null ? state.category : 1,
        filterData
      );
      state.mYear=[];
    }

    if(state.budget.length!==0){
      const filterData=props.filter;
      filterData.budget=state.budget;
      props.budgetFilter( state.category !== null ? state.category : 1, filterData);
        state.budget=[];
    }

    showfilter(false);
  };

  const handler = (value) => {
    setAnchorEl(null);
    let category = props.category;
    let filterData = props.filter;
    let selectedFilter = value.split("-");
    filterData.sort.column = selectedFilter[0];
    filterData.sort.order = selectedFilter[1];
    props.getsortedData(category, filterData);
  };

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
                height: "38px",
              }}
              endIcon={
                sortByButtonUpIcon ? (
                  <img src={mobileDownArrow} height="15" alt="" />
                ) : (
                  <img src={mobileUpArrow} height="15" alt="" />
                )
              }
            >
              <span
                style={sortByButtonRed ? { color: "red" } : { color: "black" }}
              >
                SORT BY
              </span>
            </Button>

            {/* Menu for the sort by button*/}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "top",
              }}
              transformOrigin={{
                vertical: "top",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                style: {
                  width: "100%",
                  marginLeft: "-5%",
                  marginTop: "-16px",
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  setSortByButtonRed(!sortByButtonRed);
                  setsortByButtonUpIcon(!sortByButtonUpIcon);
                  handler("price-desc");
                }}
              >
                Price - Low to High
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSortByButtonRed(!sortByButtonRed);
                  setsortByButtonUpIcon(!sortByButtonUpIcon);
                  handler("price-asc");
                }}
              >
                Price - High to Low
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSortByButtonRed(!sortByButtonRed);
                  setsortByButtonUpIcon(!sortByButtonUpIcon);
                  handler("myear-desc");
                }}
              >
                Manufacturing Year - Low to High
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSortByButtonRed(!sortByButtonRed);
                  setsortByButtonUpIcon(!sortByButtonUpIcon);
                  handler("myear-asc");
                }}
              >
                Manufacturing Year - High to Low
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSortByButtonRed(!sortByButtonRed);
                  setsortByButtonUpIcon(!sortByButtonUpIcon);
                  handler("kmdriven-desc");
                }}
              >
                Kilometer - Low to High
              </MenuItem>
            </Menu>
            <Button
              onClick={() => {
                state.category=null;
                setfilterByButtonRed(!filterByButtonRed);
                setfilterByButtonUpIcon(!filterByButtonUpIcon);
                showfilter(true);
              }}
              endIcon={
                filterByButtonUpIcon ? (
                  <img src={mobileDownArrow} height="15" alt="" />
                ) : (
                  <img src={mobileUpArrow} height="15" alt="" />
                )
              }
              style={{
                borderRadius: 0,
                width: "50%",
                lineHeight: "20px",
                fontSize: "2ex",
                backgroundColor: "#efefef",
                height: "38px",
              }}
            >
              <span
                style={
                  filterByButtonRed ? { color: "red" } : { color: "black" }
                }
              >
                FILTER BY
              </span>
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
            {filtersGroup()}
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
            brandsArr={state.brandsArr}
            globalState={state}
            handleChangeCategory={changeCategory}
          />
          <YearWidget
            startYear={2005}
            endYear={2020}
            myears={state.mYear}
            globalState={state}
            handleChangeCategory={changeCategory}
          />
          <BudgetWidget
            clear={1}
            budget2={state.budget}
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
            <div
              className="action-btn"
              onClick={() => {
                setfilterByButtonRed(!filterByButtonRed);
                showfilter(false);
              }}
            >
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
    // dispatching for the sort dropdown mobile button
    getsortedData: (category, sortKey) =>
      dispatch(actions.getVehicles(category, sortKey)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
