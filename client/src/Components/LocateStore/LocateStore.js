import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { connect, useDispatch, useSelector } from "react-redux";
import "./LocateStore.css";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";
import GoogleMap from "../GoogleMap/GoogleMap";
import cityIcon from "../../assets/icons/store-locator-city-icon.svg";
import dropdownIcon from "../../assets/drop-down.svg";
import searchIcon from "../../assets/search-icon.svg";
import headingLines from "../../assets/black-heading-lines.svg";
import M from "materialize-css";
import * as actions from "../../store/actions/index";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import { CHANGE_CITY } from "../../store/actions/actionTypes";
import { useLocation, useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import closeIcon from "../../assets/Close.png";
import mobiledivider from "../../assets/mobiledivider.png";

let useStyles = makeStyles((theme) => ({
  mapContainer: {
    width: "100%",
    height: 400,
  },
  modalBoxSuccess: {
    position: "absolute",
    width: "60%",
    backgroundColor: "green",
    color: "white",
    border: "0 solid #fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
}));

let mapProps = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 11,
};

let LocateStore = (props) => {
  let dispatch = useDispatch();
  let location = useLocation();

 
  const storeParams=new URLSearchParams(props.location.search).get("store-id")

  let classes = useStyles();
  let [singleStore, setSingleScore] = useState(false);
  let theme = useTheme();
  let matches = useMediaQuery(theme.breakpoints.up("sm"));
  let dropDownClass = matches ? "custom-drop" : "custom-drop-mobile";
  let cityIconHeight = matches ? "28.3" : "20.3";
  let { filter } = useSelector((state) => state.vehicleDetails);
  let [open, setOpen] = React.useState(location.state ? true : false);
  let handleModalClose = () => {
    setOpen(false);
  };

  let handleStoreClick = (clickedStore) => {
    let storeFilter = {
      ...filter,
      storeId: clickedStore.storeId,
    };

    // dispatch(actions.getVehiclesByStore(store, null, null, null));
    dispatch(actions.getVehicles(1, storeFilter, null));
    dispatch({ type: CHANGE_CITY, payload: clickedStore.city });
    props.history.push("/category/bike", { storeId: clickedStore.storeId });
  };

  let [mapLocations] = useState([
    {
      city: "Aluva",
      locationName: "BikeBazaar – JKB Motors, Aluva",
      address:
        "Jkb – BikeBazaar, Near JKB Bajaj , Pulinchode Jn. Bypass, Aluva – 683101, Kerala, India . Contact Info: Sandeep  Chandran || Mob No: +91-8956853502",
      coordinates: {
        lat: 10.100809,
        lng: 76.348984,
      },
      storeId: 1,
    },
    {
      city: "Kolkata",
      locationName: "BikeBazaar – 8A Nasiruddin,Kolkata",
      address:
        "8A, Nasiruddin Rd, Lower Range, Beck Bagan, Ballygunge, Kolkata, West Bengal 700017 .Contact Info: Chirag Shah || Mob No: +91- 8956853506",
      coordinates: {
        lat: 22.54145,
        lng: 88.36341,
      },
      storeId: 2,
    },
    {
      city: "Rajahmundry",
      locationName: "BikeBazaar – MCV Wheels, Rajahmundry",
      address:
        "D. No. 77/8/7-1, Beside Bajaj Two Wheeler Showroom, R.T.C Complex Road, Rajahmundry - 533103, Andhra Pradesh, India . Contact Info: Sunil Bisoi || Mob No: +91- 8956854007",
      coordinates: {
        lat: 16.999954,
        lng: 81.786184,
      },
      storeId: 3,
    },
    {
      city: "Thrissur",
      locationName: "BikeBazaar – Sitaram Trade & Services, Thrissur",
      address: `Sitaram Trade & Services, PT Manual Road, Kollothumpadam, Patturaikal, Thrissur, Kerala 
        Contact Info: Sandeep  Chandran || Mob No: +91-8956853502`,
      coordinates: {
        lat: 10.54067,
        lng: 76.213814,
      },
      storeId: 4,
    },
    {
      city: "Bangalore",
      locationName: "BikeBazaar – Rajaji Nagar, Bangalore",
      address:
        "New no.72, Old No.60/61, Dr. Rajkumar Road, Rajaji Nagar, Opp Srinath sanitary wares,Bangalore - 560010",
      coordinates: {
        lat: 12.989492,
        lng: 77.558663,
      },
      storeId: 5,
    },
    // {
    //   city: "Chennai",
    //   locationName: "BikeBazaar – Mootha Centre, Nungambakkam",
    //   address:
    //     "Mootha Centre, Door No 23, Kodambakkam High road, Nungambakkam, Chennai - 600034",
    //   coordinates: {
    //     lat: 13.052892,
    //     lng: 80.246384,
    //   },
    //   storeId: 6,
    // },
    // {
    //   city: "New Delhi",
    //   locationName: "BikeBazaar – S/F Arya Samaj, Karol Bagh",
    //   address:
    //     "1694 S/F Arya Samaj Road Karol Bagh, Near Grace Hotel & Sat Bharaba Govt School, l Karol Bagh, New Delhi - 110005",
    //   coordinates: {
    //     lat: 28.647347,
    //     lng: 77.194833,
    //   },
    //   storeId: 7,
    // },
    // {
    //   city: "Gurgaon",
    //   locationName: "BikeBazaar – Sector-12 A, Gurgaon",
    //   address:
    //     "SCO 37, 3rd Floor, Hall No.1 Sector-12 A, Huda Market, Opp. Telephone Exchange, Near Bikanerwala, Gurgaon - 122001",
    //   coordinates: {
    //     lat: 28.468494,
    //     lng: 77.035545,
    //   },
    //   storeId: 8,
    // },
    // {
    //   city: "Hyderabad",
    //   locationName: "BikeBazaar – Babukhan Estate, Hyderabad",
    //   address:
    //     "5th Floor, Flat No 509/A, Babukhan Estate, Basheerbagh, Hyderabad, Telanagna - 500001",
    //   coordinates: {
    //     lat: 17.400817,
    //     lng: 78.474401,
    //   },
    //   storeId: 9,
    // },
    // {
    //   city: "Jaipur",
    //   locationName: "BikeBazaar – ARG CORPORATE PARK, Jaipur",
    //   address:
    //     "ARG CORPORATE PARK GOPAL BARI BUILDING, Ajmer Road, Panch Batti, Mission Compound, Hathroi, Jaipur, Rajasthan",
    //   coordinates: {
    //     lat: 26.91515,
    //     lng: 75.794112,
    //   },
    //   storeId: 10,
    // },
    // {
    //   city: "Mumbai",
    //   locationName: "BikeBazaar – Sagar Tech Plaza A, Mumbai",
    //   address:
    //     "Office N0. 208, 2nd Floor, Sagar Tech Plaza A, Sakinaka Junction, Mumbai - 400072",
    //   coordinates: {
    //     lat: 19.102637,
    //     lng: 72.885387,
    //   },
    //   storeId: 11,
    // },
    // {
    //   city: "Nagpur",
    //   locationName: "BikeBazaar – Jejani Bhavan, Nagpur",
    //   address:
    //     "Jejani Bhavan, Above Khamgaon urban Bank, Gandhi Grain Market, Telephone Exchange Square, Central Avenue Road, Nagpur - 440009",
    //   coordinates: {
    //     lat: 21.148516,
    //     lng: 79.122348,
    //   },
    //   storeId: 12,
    // },
    // {
    //   city: "Pune",
    //   locationName: "BikeBazaar – Govind Niwas, Pune",
    //   address:
    //     "Office no. 2 and 3, 1st Floor, Govind Niwas, Rasta Peth, Near Naidu Ganapati Rasta Peth, Pune - 411011",
    //   coordinates: {
    //     lat: 18.517641,
    //     lng: 73.867125,
    //   },
    //   storeId: 13,
    // },
  ]);

  let [cities] = useState(["Aluva", "Rajahmundry", "Thrissur", "Kolkata"]);

  let [searchedLocation, setSearchedLocation] = useState(null);

  let setCity = (key) => {
    let city = cities[key];
    setSearchedLocation(city);
    document.querySelector("#currentCity").innerText = city;
  };

  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
    let elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, {});
    if (props.history.location.search.trim() != "") {
      setSingleScore(true);
    } else {
      props.getStoreData();
    }
  }, []);

  let locationCards = (
    props.location.search?<div className="col s12 m12 flex-center" key={1}>
      <div className="locationCard">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleStoreClick(mapLocations[storeParams-1])}
        >
          <h5>{mapLocations[storeParams-1].locationName}</h5>
          <div className="locationAddress">{mapLocations[storeParams-1].address}</div>
        </div>
        <div className="mapContainer">
          <GoogleMap
            center={mapLocations[storeParams-1].coordinates}
            zoom={mapProps.zoom}
            location={mapLocations[storeParams-1].locationName}
          />
        </div>
      </div>
    </div>:<></>
  );

  let multiStore = "";
  let heading = "";
  if (singleStore !== true) {
    multiStore = (
      <>
        <Banner
          navigation="Locate Store"
          heading="Locate BikeBazaar Stores Near You"
          text=""
          path={props.location.pathname}
        />

        <div className="locateDropdownCard">
          <div className="row">
            <div className={matches ? "input-field" : "mobile-input-field"}>
              {matches ? (
                <p>Please Select Your City</p>
              ) : (
                <p style={{ fontSize: "12.5px", marginBottom: "3%" }}>
                  Please Select Your City
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                className={
                  "dropdown-trigger btn white black-text " + dropDownClass
                }
                data-target="cityDropdown"
              >
                <img
                  style={matches ? { marginTop: "3%" } : { marginTop: "4%" }}
                  src={cityIcon}
                  width={matches ? "80" : "30"}
                  height={cityIconHeight}
                  alt=""
                />
                <span
                  style={matches ? { fontSize: "15px" } : { fontSize: "13px" }}
                  id="currentCity"
                >
                  Search Your City
                </span>
                <img
                  style={matches ? { marginTop: "5%" } : { marginTop: "6%" }}
                  src={dropdownIcon}
                  width="22"
                  height="11"
                  alt=""
                />
              </div>
              <ul id="cityDropdown" className="dropdown-content">
                {cities.map((city, key) => {
                  return (
                    <li key={key} onClick={() => setCity(key)}>
                      <a href="#!">{city}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              className={
                matches
                  ? "search-location-button"
                  : "mobileView-search-location-button"
              }
            >
              <img
                src={searchIcon}
                style={
                  matches ? {} : { marginBottom: "20px", marginLeft: "6px" }
                }
                width={matches ? "30" : "20"}
                height={matches ? "30" : "20"}
                alt=""
              />
            </div>
          </div>
        </div>
      </>
    );
    heading = (
      <>
        {matches ? (
          <h4 className="mapHeading">
            List of Stores Nearest to Selected Location
          </h4>
        ) : (
          <p className="mobileMapHeading">
            List of Stores Nearest to
            <br /> Selected Location
          </p>
        )}
      </>
    );

    locationCards = mapLocations.map((thisLocation, key) => {
      if (searchedLocation === null) {
        return (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} key={key}>
            <div
              className="locationCard"
              style={{ marginRight: "10px", marginBottom: "17px" }}
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleStoreClick(thisLocation)}
              >
                <h5>{thisLocation.locationName}</h5>
                <div className="locationAddress">{thisLocation.address}</div>
              </div>
              <div className={classes.mapContainer}>
                <GoogleMap
                  center={thisLocation.coordinates}
                  zoom={mapProps.zoom}
                  location={thisLocation.locationName}
                />
              </div>
            </div>
          </Grid>
        );
      } else {
        if (thisLocation.city === searchedLocation) {
          return (
            <Grid item xs={12} sm={12} md={6} lg={5} xl={4} key={key}>
              <div
                className="locationCard"
                style={{ marginRight: "10px", marginBottom: "15px" }}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => handleStoreClick(thisLocation)}
                >
                  <h5>{thisLocation.locationName}</h5>
                  <div className="locationAddress">{thisLocation.address}</div>
                </div>
                <div className={classes.mapContainer}>
                  <GoogleMap
                    center={thisLocation.coordinates}
                    zoom={mapProps.zoom}
                    location={thisLocation.locationName}
                  />
                </div>
              </div>
            </Grid>
          );
        }
      }
    });
  }

  return (
    <div id="LocateStore">
      <MainMenu />
      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
        }}
        open={open}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modalBoxSuccess}>
          <h4>{location.state ? location.state.message : ""}</h4>
          <img
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={handleModalClose}
            src={closeIcon}
            height="20"
            alt=""
          />
        </div>
      </Modal>
      <Grid
        container
        component="div"
        direction="row"
        justify="center"
        className="mtop40"
      >
        <Grid item xs={11} md={11} sm={11} lg={11}>
          {multiStore}

          <div className="locateDropdownCard">
            {heading}
            <div className="heading-lines">
              {matches ? (
                <img src={headingLines} width="57" height="4" alt="" />
              ) : (
                <img src={mobiledivider} height="4" />
              )}
            </div>
            <Grid
              container
              component="div"
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              {locationCards}
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    loading: state.vehicleDetails.loading,
    stores: state.storeDetails.stores,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    save: (vehicleid) => dispatch(actions.getVehicleData(vehicleid)),
    getStoreData: (storeid) => dispatch(actions.getStoreData(storeid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocateStore);
