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
import { withStyles } from "@material-ui/core/styles";
import selectedTyre from "../../assets/SelectedPageTyre.svg";
import Grid from "@material-ui/core/Grid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { CHANGE_CITY} from "../../store/actions/actionTypes";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

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
  headerContent: {
    display: "flex",
    flexDirection: "row",
    marginTop: "5px",
    justifyContent: "space-between",
  },
  locationDropdown: {
    width: "110px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    cursor: "pointer",
    color: "black",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius:'1px'
  },
}));

const LocationDropDown = ({ matches, classes }) => {
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

  const handleCityChange = (value, matches) => {
    if (value === "Select City") {
      dispatch({ type: CHANGE_CITY, payload: "" });
    } else {
      dispatch({ type: CHANGE_CITY, payload: value });
    }

    handleClose();
    if (window.location.pathname === "/") {
      
        matches
          ? window.scrollTo({
              top: 500,
              behavior: "smooth",
            })
          : window.scrollTo({
              top: 150,
              behavior: "smooth",
            });
      
    }
  };

  return (
    <>
      <div className={classes.locationDropdown} onClick={handleClick}>
        <span style={{ fontSize: "12px" }}>
          {selectedCity ? selectedCity : "Select City"}
        </span>

        <span onClick={handleClick}>
          {select ? (
            <ExpandMoreIcon
              style={{
                paddingTop: "5px",
                marginLeft: "20%",
                justifyContent: "center",
              }}
            />
          ) : (
            <ChevronRightIcon
              style={{
                paddingTop: "5px",
                marginLeft: "20%",
                justifyContent: "center",
              }}
            />
          )}
        </span>
      </div>

      <Menu
        id="customised-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        MenuListProps={{ onMouseLeave: handleClose }}
        PaperProps={{
          style: {
            backgroundColor: "black",
            marginRight: "5%",
            width: "110px",
            scrollbarWidth: "thin",
          },
        }}
      >
        <StyledMenuItem
          onClick={() => handleCityChange("Select City", matches)}
        >
          Select City
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Aluva", matches)}>
          Aluva
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Kolkata", matches)}>
          Kolkata
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => handleCityChange("Rajahmundry", matches)}
        >
          Rajahmundry
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Thrissur", matches)}>
          Thrissur
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Bangalore", matches)}>
          Bangalore
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Chennai", matches)}>
          Chennai
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("New Delhi", matches)}>
          New Delhi
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Gurgaon", matches)}>
          Gurgaon
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Hyderabad", matches)}>
          Hyderabad
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Jaipur", matches)}>
          Jaipur
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Mumbai", matches)}>
          Mumbai
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Nagpur", matches)}>
          Nagpur
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Pune", matches)}>
          Pune
        </StyledMenuItem>
      </Menu>
    </>
  );
};

const HamburgerDropdown = ({ matches }) => {
  const [anchorEl, setAnchorEl] = useState();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {matches ? (
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
      ) : (
        <img
          style={{ marginTop: "5px" }}
          height="15"
          width="22"
          className="menu-icons"
          aria-controls="hamburger-menu"
          aria-haspopup="true"
          onClick={handleClick}
          src={hamburgerIcon}
          alt=""
        />
      )}
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
            marginLeft: "6%",
            height: "550px",
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
        <Link to="/category/bike">
          <StyledMenuItem>
            <img className="icon-img" src={selectedTyre} height="25" alt="" />
            <span style={{ lineHeight: "34px" }}>Buy</span>
          </StyledMenuItem>
        </Link>
        <Link to="/sell">
          <StyledMenuItem>
            <img className="icon-img" src={selectedTyre} height="25" alt="" />
            <span style={{ lineHeight: "34px" }}>Sell</span>
          </StyledMenuItem>
        </Link>
        <Link to="/vehicledetails/locate-store">
          <StyledMenuItem>
            <img className="icon-img" src={selectedTyre} height="25" alt="" />
            <span style={{ lineHeight: "34px" }}>Locate Store</span>
          </StyledMenuItem>
        </Link>

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
            rel="noopener noreferrer"
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
            rel="noopener noreferrer"
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
            <span style={{ fontSize: "11px" }}>
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

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
      <div className={classes.headerContent}>
        {matches ? (
          <Link to="/">
            <img
              style={{ marginTop: "4px" }}
              src={bikeBazaarLogo}
              height="25"
              alt=""
            />
          </Link>
        ) : (
          <Link to="/">
            <img
              style={{ marginTop: "4px", width: "151px", height: "18px" }}
              src={bikeBazaarLogo}
              height="25"
              alt=""
            />
          </Link>
        )}
        <LocationDropDown matches={matches} classes={classes} />
        <HamburgerDropdown matches={matches} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          paddingLeft: "12%",
          paddingRight:'12%'
        }}
      >
        <form id="searchForm" className="input-field">
          <Grid container component="div" className="search-container-main">
           
            <Grid item xs={10}>
              <div className="arrow">
                <Autocomplete
                  id="searchField"
                  style={{ border: "0px !important",width:"100%" }}
                  freeSolo
                  options={searchTerm ? vehicleNames : []}
                  renderInput={(params) => (
                    <StyledTextField   
                      placeholder="Search Your Two-Wheeler"
                      onChange={updateState(params.inputProps.value)}
                      {...params}
                      style={{
                        paddingLeft: "25px !important",
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
              <Grid item xs={2} sm={2} md={2} lg={2}>     
                <Link
                  to={searchTerm?`/category/bike?searchTerm=${searchTerm.trim().toLowerCase()}&city=${selectedCity.trim().toLowerCase()}`:`/category/bike`}
                >
                  <div
                    style={{
                      marginTop: "1px",
                      backgroundColor: "#1d1d1d",
                      height: "50%",
                    }}
                    className="btn search-label-btn"
                    type="submit"
                  >
                    <img src={searchIcon} height="25" width="25" alt="" />
                  </div>
                </Link>
              </Grid>
         
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default MobNav;
