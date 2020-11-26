import React, { useState, useEffect } from "react";
import "./MobileNav.css";
import { Link } from "react-router-dom";
import bikeBazaarLogo from "../../assets/BikeB-logo.png";
import hamburgerIcon from "../../assets/Hamburger_Icon.png";
import { makeStyles } from "@material-ui/core/styles";
import searchIcon from "../../assets/search-icon.svg";
import * as actions from "../../store/actions/index";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import closeIcon from "../../assets/Close.png";
import faceBookIcon from "../../assets/facebook-icon.svg";
import twitterIcon from "../../assets/twitter-icon.svg";
import linkedinIcon from "../../assets/linkedin-icon.svg";
import instagramIcon from "../../assets/instagram-icon.svg";
import messageIcon from "../../assets/message.png";
import callIcon from "../../assets/Phone.svg";
import { withStyles, useTheme } from "@material-ui/core/styles";
import selectedTyre from "../../assets/SelectedPageTyre.svg";
import Grid from "@material-ui/core/Grid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { CHANGE_CITY, CHANGE_CATEGORY } from "../../store/actions/actionTypes";
import FormControl from "@material-ui/core/FormControl";
const StyledMenuItem = withStyles({
  root: {
    "&:hover": {
      backgroundColor: "white",
      color: "black",
      fontWeight: 600,
    },
    color: "white",
    backgroundColor: "#1d1d1d",
    fontWeight: "bold",
    fontSize: 10,
    fontFamily: "inherit",
  },
})(MenuItem);

const StyledTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "transparent",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "transparent",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent",
        
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    position: "absolute",
    cursor: "pointer",
    top: "83px",
    left: "25px",
    width: "15px",
    height: "15px",
  },
  header: {
    width: "100%",
    height: "90%",
    padding: "20px",
    backgroundColor: "#ff0000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const LocationDropDown = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [select, setSelect] = useState(true);
  const { selectedCity } = useSelector((state) => state.vehicleDetails);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSelect(!select);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCityChange = (event) => {
  
    if (event.target.value === "Select City") {
      dispatch({ type: CHANGE_CITY, payload: "" });
    } else {
      dispatch({ type: CHANGE_CITY, payload: event.target.value });
    }

    handleClose();
    if (window.location.pathname === "/") {
      window.scrollTo({
        top: 500,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <span
        style={{
          height: 40,
          width:100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          color: "black",
        
          flexDirection:'row'
        }}
        onClick={handleClick}
      >
       
        {selectedCity ? selectedCity : "Select City"}

        <span onClick={handleClick}>
          {select ? (
            <ExpandMoreIcon
              style={{ paddingTop: "5px", justifyContent: "center" }}
            />
          ) : (
            <ChevronRightIcon
              style={{ paddingTop: "5px", justifyContent: "center" }}
            />
          )}
        </span>

        {/* used for the side border */}
        <div id="border-height"></div>
      </span>
      
      <Menu
        id="customised-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "bottom",
        }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        MenuListProps={{ onMouseLeave: handleClose }}
        PaperProps={{
          style: {
            backgroundColor: "black",
            marginRight: "5%",
            width: "28%",
            scrollbarWidth: "thin",
            marginTop:'12%'
          },
        }}
      >
        <StyledMenuItem value="Select City" onClick={() => handleCityChange("Select City")}>
          Select City
        </StyledMenuItem>
        <StyledMenuItem value="Aluva" onClick={() => handleCityChange("Aluva")}>
          Aluva
        </StyledMenuItem>
        <StyledMenuItem value="Select City"onClick={() => handleCityChange("Kolkata")}>
          Kolkata
        </StyledMenuItem>
        <StyledMenuItem value="Select City" onClick={() => handleCityChange("Rajahmundry")}>
          Rajahmundry
        </StyledMenuItem>
        <StyledMenuItem value="Select City" onClick={() => handleCityChange("Thrissur")}>
          Thrissur
        </StyledMenuItem>
        <StyledMenuItem value="Select City" onClick={() => handleCityChange("Bangalore")}>
          Bangalore
        </StyledMenuItem>
        <StyledMenuItem value="Select City" onClick={() => handleCityChange("Chennai")}>
          Chennai
        </StyledMenuItem>
        <StyledMenuItem value="Select City" onClick={() => handleCityChange("New Delhi")}>
          New Delhi
        </StyledMenuItem>
        <StyledMenuItem value="Select City" onClick={() => handleCityChange("Gurgaon")}>
          Gurgaon
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Hyderabad")}>
          Hyderabad
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Jaipur")}>
          Jaipur
        </StyledMenuItem>
        <StyledMenuItem value="Select City" onClick={() => handleCityChange("Mumbai")}>
          Mumbai
        </StyledMenuItem >
        <StyledMenuItem value="Select City" onClick={() => handleCityChange("Nagpur")}>
          Nagpur
        </StyledMenuItem>
        <StyledMenuItem value="Select City" onClick={() => handleCityChange("Pune")}>
          Pune
        </StyledMenuItem>
      </Menu>
    </>
  );
};

const HamburgerDropdown = () => {
  const [anchorEl, setAnchorEl] = useState();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <img
        style={{ marginTop: "5px" }}
        height="15"
        className="menu-icons"
        aria-controls="hamburger-menu"
        aria-haspopup="true"
        onClick={handleClick}
        src={hamburgerIcon}
        alt=""
      />
        <Menu
        id="hamburger-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        MenuListProps={{ onMouseLeave: handleClose }}
        PaperProps={{
          style: {
            backgroundColor: "#1d1d1d",
            width: "80%",
            marginTop: "-10%",
            marginLeft:'6%'
          },
        }}
      >
        <MenuItem style={{ display: "flex", justifyContent: "flex-end" }}>
          <img
            className="icon-img"
            onClick={handleClose}
            src={closeIcon}
            height="25"
            alt=""
          />
        </MenuItem>
        <Link to={`/about`}>
          <StyledMenuItem>
            <img className="icon-img" src={selectedTyre} height="25" alt="" />
            <span style={{ lineHeight: "34px" }}>About</span>
          </StyledMenuItem>
        </Link>
        <Link to={`/howitworks`}>
          <StyledMenuItem>
            <img className="icon-img" src={selectedTyre} height="25" alt="" />
            <span style={{ lineHeight: "34px" }}>How It Works</span>
          </StyledMenuItem>
        </Link>
        <Link to={`/becomefranchiseowner`}>
          <StyledMenuItem>
            <img className="icon-img" src={selectedTyre} height="25" alt="" />
            <span style={{ lineHeight: "34px" }}>Become A Franchise Owner</span>
          </StyledMenuItem>
        </Link>
        <Link to={`/contact`}>
          <StyledMenuItem style={{ marginBottom: "10px" }}>
            <img className="icon-img" src={selectedTyre} height="25" alt="" />
            <span style={{ lineHeight: "34px" }}>Contact Us</span>
          </StyledMenuItem>
        </Link>
        <br />
        <StyledMenuItem className="phone-number-ham">
          <img className="icon-img" src={selectedTyre} height="25" alt="" />
          <img className="icon-img" src={callIcon} height="25" alt="" />
          <a
            target="_blank"
            href="tel:+8956853498"
            style={{ marginRight: "10px", fontWeight: "700", fontSize: "13px" }}
          >
            8956853498
          </a>
        </StyledMenuItem>
        <StyledMenuItem className="phone-number-ham">
          <img className="icon-img" src={selectedTyre} height="25" alt="" />
          <img className="icon-img" src={messageIcon} alt="" />
          <a
            target="_blank"
            href="mailto:connect@bikebazaar.com"
            style={{ marginRight: "10px", fontWeight: "700", fontSize: "13px" }}
          >
            connect@bikebazaar.com
          </a>
        </StyledMenuItem>
        <hr className="small-hr" />
        <MenuItem>
          <div style={{ marginLeft: "20px" }}>
            <a href="https://www.facebook.com/BikeBazaaar">
              {/* <a href="https://www.facebook.com/BikeBazaaar"> */}
              <img className="social-icon-img" src={faceBookIcon} alt="" />
            </a>
          </div>

          <div style={{ marginLeft: "20px" }}>
            <a href="https://www.instagram.com/bikebazaaar/">
              <img className="social-icon-img" src={instagramIcon} alt="" />
            </a>
          </div>

          <div style={{ marginLeft: "20px" }}>
            <a href="https://www.linkedin.com/company/bikebazaar">
              <img className="social-icon-img" src={linkedinIcon} alt="" />
            </a>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <a href="https://twitter.com/BikeBazaaar">
              <img className="social-icon-img" src={twitterIcon} alt="" />
            </a>
          </div>
        </MenuItem>
        <br />
        <Link to={`/copyright`}>
          <StyledMenuItem>
            <span style={{ fontSize: "13px" }}>
              © 2019 BikeBazaar. All rights reserved.
            </span>
          </StyledMenuItem>
        </Link>
        <br />
      </Menu>
    </>
  );
};

const MobNav = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { category, filter, vehicleNames, selectedCity } = useSelector(
    (state) => state.vehicleDetails
  );
  useEffect(() => {
    const filterData = {
      ...filter,
      city: selectedCity,
    };
    if (searchTerm.length > 2)
      setTimeout(() => {
        dispatch(actions.getVehiclesNames(category, filterData, searchTerm));
      }, 10);
  }, [searchTerm, selectedCity]);

  const updateState = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className={classes.header}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "5px",
          justifyContent: "space-between",
        }}
      >
        <Link to="/">
          <img
            style={{ marginTop: "4px" }}
            src={bikeBazaarLogo}
            height="25"
            alt=""
          />
        </Link>
        <HamburgerDropdown />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          paddingLeft: "12%",
        }}
      >
        <form id="searchForm" className="input-field">
          <Grid container component="div" className="search-container-main">
            <Grid item xs={4} sm={4} >
              <div id="searchLocation">
                <LocationDropDown />
              </div>
            </Grid>
            <Grid item xs={6} sm={6} >
              <div className="arrow">
                <Autocomplete
                  id="searchField"
                  style={{ border: "0px !important" }}
                  freeSolo
                  options={searchTerm ? vehicleNames : []}
                  renderInput={(params) => (
                    <StyledTextField
                      placeholder="Search Vehicle"
                      onChange={updateState(params.inputProps.value)}
                      {...params}
                      style={{
                        paddingLeft: "20px !important",
                        margin: "0px",
                      
                      }}
                      label=""
                      margin="normal"
                      variant="outlined"
                    />
                  )}
                />
              </div>
            </Grid>

            {searchTerm && selectedCity ? (
              <Grid item xs={2} sm={2} >
                <Link
                  to={`/category/bike?searchTerm=${searchTerm}&city=${selectedCity}`}
                >
                  <button
                    style={{
                      marginTop: "1px",
                      width: "20% !important",
                      backgroundColor: "#1d1d1d",
                      height:'50%'
                    }}
                    className="btn search-label-btn"
                    type="submit"
                  >
                    <img src={searchIcon} height="10" width="10"  alt="" />
                  </button>
                </Link>
              </Grid>
            ) : (
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <Link to={`/category/bike`}>
                  <button
                    style={{
                      marginTop: "1px",
                      width: "100%",
                      backgroundColor: "#1d1d1d",
                    }}
                    className="btn search-label-btn"
                    type="submit"
                  >
                    <img src={searchIcon} height="25" alt="" />
                  </button>
                </Link>
              </Grid>
            )}
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default MobNav;
