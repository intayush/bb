import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../assets/search-icon.svg";
import bikeBazaarLogo from "../../assets/BikeB-logo.png";
import personLogo from "../../assets/Person.png";
import locationLogo from "../../assets/gps.svg";
import hamburgerIcon from "../../assets/Hamburger_Icon.png";
import callIcon from "../../assets/Phone.svg";
import messageIcon from "../../assets/message.png";
import closeIcon from "../../assets/Close.png";
import faceBookIcon from "../../assets/facebook-icon.svg";
import twitterIcon from "../../assets/twitter-icon.svg";
import linkedinIcon from "../../assets/linkedin-icon.svg";
import instagramIcon from "../../assets/instagram-icon.svg";
import selectedTyre from "../../assets/SelectedPageTyre.svg";
import Grid from "@material-ui/core/Grid";
import M from "materialize-css";
import "./MainMenu.css";
import MobNav from "../MobileNav/MobNav";
import { withStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector, connect, useDispatch } from "react-redux";
import { CHANGE_CITY, CHANGE_CATEGORY } from "../../store/actions/actionTypes";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import * as actions from "../../store/actions/index";
import _ from "lodash";
import useDebounce from "./use-debounce";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

// --look for this chevron thing as well
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const StyledMenuItem = withStyles({
  root: {
    "&:hover": {
      backgroundColor: "white",
      color: "black",
      fontWeight: 600,
    },
    // #1d1d1d
    color: "white",
    backgroundColor: "#1d1d1d",
    fontWeight: 400,
    fontSize: 16,
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

const BuyButton = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCategoryClose = (category) => {
    dispatch({ type: CHANGE_CATEGORY, payload: category });
    setAnchorEl(null);
  };

  return (
    <li>
      <span className="buy-dropdown-text" onClick={handleClick}>
        BUY
        <ExpandMoreIcon className="buy-dropdown-icon" />
      </span>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        MenuListProps={{ onMouseLeave: handleClose }}
        PaperProps={{
          style: {
            backgroundColor: "black",
          },
        }}
      >
        <Link to={`/category/bike`}>
          <StyledMenuItem onClick={() => handleCategoryClose(1)}>
            Motorcycle
          </StyledMenuItem>
        </Link>
        <Link to={`/category/scooter`}>
          <StyledMenuItem onClick={() => handleCategoryClose(2)}>
            Scooter
          </StyledMenuItem>
        </Link>
        <Link to={`/category/high_end_bike`}>
          <StyledMenuItem onClick={() => handleCategoryClose(3)}>
            High-End Motorcycle
          </StyledMenuItem>
        </Link>
      </Menu>
    </li>
  );
};

const PersonDropdown = () => {
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
        className="menu-icons"
        aria-controls="person-menu"
        aria-haspopup="true"
        onClick={handleClick}
        src={personLogo}
        alt=""
      />
      <Menu
        id="person-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        MenuListProps={{ onMouseLeave: handleClose }}
        PaperProps={{
          style: {
            backgroundColor: "black",
          },
        }}
      >
        {/* <Link to={`/signin`}>
        <StyledMenuItem >
          Sign In
        </StyledMenuItem>
      </Link>
      <Link to={`/signup`}>
        <StyledMenuItem >
          Sign Up
        </StyledMenuItem>
      </Link> */}
        <StyledMenuItem>Sign In</StyledMenuItem>
        <StyledMenuItem>Sign Up</StyledMenuItem>
      </Menu>
    </>
  );
};

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

  const handleCityChange = (value) => {
   
    console.log()
    if (value === "Select City") {
      dispatch({ type: CHANGE_CITY, payload: "" });
    } else {
      dispatch({ type: CHANGE_CITY, payload: value });
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
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          cursor: "pointer",
          color: "black",
        }}
        onClick={handleClick}
      >
        <img
          className="menu-icons1"
          aria-controls="location-menu"
          aria-haspopup="true"
          src={locationLogo}
          alt=""
        />
        <span className="span-select-city">
          {selectedCity ? selectedCity : "Select City"}
        </span>
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
          horizontal: "center",
        }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        MenuListProps={{ onMouseLeave: handleClose }}
        PaperProps={{
          style: {
            backgroundColor: "black",
            marginLeft: "-0.1%",
            width: "11.72%",
            scrollbarWidth: "thin",
          },
        }}
      >
        <StyledMenuItem onClick={() => handleCityChange("Select City")}>
          Select City
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Aluva")}>
          Aluva
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Kolkata")}>
          Kolkata
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Rajahmundry")}>
          Rajahmundry
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Thrissur")}>
          Thrissur
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Bangalore")}>
          Bangalore
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Chennai")}>
          Chennai
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("New Delhi")}>
          New Delhi
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Gurgaon")}>
          Gurgaon
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Hyderabad")}>
          Hyderabad
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Jaipur")}>
          Jaipur
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Mumbai")}>
          Mumbai
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Nagpur")}>
          Nagpur
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleCityChange("Pune")}>
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
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        MenuListProps={{ onMouseLeave: handleClose }}
        PaperProps={{
          style: {
            backgroundColor: "#1d1d1d",
            width: "25.5%",
            marginTop: "-16px",
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
            style={{ marginRight: "10px", fontWeight: "700", fontSize: "16px" }}
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
            style={{ marginRight: "10px", fontWeight: "700", fontSize: "16px" }}
          >
            connect@bikebazaar.com
          </a>
        </StyledMenuItem>
        <hr className="small-hr" style={{ width: "37%", marginLeft: "10%" }} />
        <MenuItem>
          <div style={{ marginLeft: "4%" }}>
            <a href="https://www.facebook.com/BikeBazaaar">
              <img
                className="social-icon-img"
                src={faceBookIcon}
                style={{ marginLeft: "15px" }}
                alt=""
              />
            </a>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <a href="https://twitter.com/BikeBazaaar">
              <img className="social-icon-img" src={twitterIcon} alt="" />
            </a>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <a href="https://www.linkedin.com/company/bikebazaar">
              <img className="social-icon-img" src={linkedinIcon} alt="" />
            </a>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <a href="https://www.instagram.com/bikebazaaar/">
              <img className="social-icon-img" src={instagramIcon} alt="" />
            </a>
          </div>
        </MenuItem>
        <br />
        <Link to={`/copyright`}>
          <StyledMenuItem>
            {/* style={{marginTop:'12px'}} style removed added by Ankit */}
            <span style={{ fontSize: "16px" }}>
              © 2019 BikeBazaar. All rights reserved.
            </span>
          </StyledMenuItem>
        </Link>
        <br />
      </Menu>
    </>
  );
};

const MainMenu = (props) => {
  const dispatch = useDispatch();
  const { category, filter, vehicleNames, selectedCity } = useSelector(
    (state) => state.vehicleDetails
  );
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchLocation, setSearchLocation] = useState(selectedCity);

  const debouncedSearchTerm = useDebounce(searchTerm, 300); //node side search with min of 300 msec

  useEffect(() => {
    const filterData = {
      ...filter,
      city: selectedCity,
    };
    if (debouncedSearchTerm.length > 2) {
      setTimeout(() => {
        dispatch(
          actions.getVehiclesNames(category, filterData, debouncedSearchTerm)
        );
      }, 10);
    }
  }, [debouncedSearchTerm, selectedCity]);

  const updateState = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  if (matches) {
    return (
      <nav className="nav-extended nav-color sticky-nav">
        <Grid
          container
          component="div"
          direction="row"
          className="nav-wrapper"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={2} sm={2} md={2} lg={2} className="header-title">
            <Link to="/">
              <img src={bikeBazaarLogo} height="25" id="logoImg" alt="" />
            </Link>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Grid container component="div" direction="row">
              <Grid item xs={12} sm={12} md={12} lg={12}>

                <form id="searchForm" className="input-field">
                  <Grid
                    container
                    component="div"
                    className="search-container-main"
                    direction="row"
                  >
                    <Grid item xs={2} sm={2} md={3} lg={3}>
                      <div id="searchLocation">
                        <LocationDropDown />
                      </div>
                    </Grid>
                    <Grid item xs={8} sm={8} md={7} lg={7}>
                      <div className="arrow">
                        <Autocomplete
                          id="searchField"
                          style={{ border: "0px !important" }}
                          freeSolo
                          options={searchTerm ? vehicleNames : []}
                          renderInput={(params) => (
                            <StyledTextField
                              placeholder=" Search Your Two-wheeler"
                              onChange={updateState(params.inputProps.value)}
                              {...params}
                              style={{
                                paddingLeft: "13px !important",
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
                    {searchTerm ? (
                      <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Link
                          to={`/category/bike?searchTerm=${searchTerm}&city=${selectedCity}`}
                        >
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
              </Grid>
            </Grid>
            <Grid container component="div" direction="row">
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <ul className="nav-options">
                  <BuyButton />
                  <li style={{ paddingTop: "1px" }}>
                    <Link to="/sell">SELL</Link>
                  </li>
                  <li style={{ paddingTop: "1px" }}>
                    <Link to="/vehicledetails/locate-store">LOCATE STORE</Link>
                  </li>
                  {/* <li style={{paddingTop: '1px'}}> 
                      <Link to="/blog">BLOG</Link>
                    </li> */}
                </ul>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
          <Grid
            item
            xs={2}
            sm={2}
            md={2}
            lg={2}
            className="location-btn-container"
          >
            <Grid
              container
              component="div"
              direction="row"
              style={{
                paddingTop: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid item xs={2} sm={2} md={4} lg={4}>
                <PersonDropdown />
              </Grid>
              <Grid item xs={2} sm={2} md={4} lg={4}>
                <a target="/" href="mailto:connect@bikebazaar.com">
                  <img
                    height="25"
                    style={{ marginLeft: -5 }}
                    src={messageIcon}
                    alt=""
                  />
                </a>
              </Grid>
              <Grid item xs={1} sm={1} md={2} lg={2}>
                <HamburgerDropdown />
              </Grid>
            </Grid>
            <Grid container component="div" direction="row">
              <Grid item xs={9} sm={9} md={9} lg={9}>
                <a
                  target="_blank"
                  href="tel:+8956853498"
                  className="phone-number"
                >
                  <div className="phone-number-container">
                    <img
                      className="icon-img"
                      src={callIcon}
                      height="25"
                      alt=""
                    />
                    8956853498
                  </div>
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </nav>
    );
  } else {
    return <MobNav />;
  }
};

export default MainMenu;
