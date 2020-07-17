import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Grid from "@material-ui/core/Grid";
import Tooltip from "../UI/Tooltip/Tooltip";
import axios from "axios";
import isEmpty from "validator/lib/isEmpty";
import isAscii from "validator/lib/isAscii";
import isEmail from "validator/lib/isEmail";
import isNumeric from "validator/lib/isNumeric";
import "../Card/watermark.css";

import "./VehicleData.css";

const formValidator = (name, value) => {
  switch (name) {
    case "name": {
      const nameValue = value.replace(/ /g, "");
      return !isAscii(nameValue) || value.length > 100 ? "Enter valid name" : "";
    }
    case "phone": {
      return value.length > 15 || !isNumeric(value) ? "Invalid Mobile Number" : "";
    }
    case "email": {
      return !isEmail(value) ? "Invalid Email Id" : "";
    }
    case "emi": {
      return true;
    }
    case "vehicleid": {
      return true;
    }
    default: {
      return false;
    }
  }
};

const VehicleData = (props) => {
  const [sliderImages, setSliderImages] = useState(props.data.images);

  const [formData, setFormData] = useState({
    name: {
      value: "",
      error: false,
      errorMessage: "",
    },
    emi: {
      value: 1,
      error: false,
      errorMessage: "",
    },
    email: {
      value: "",
      error: false,
      errorMessage: "",
    },
    phone: {
      value: "",
      error: false,
      errorMessage: "",
    },
    vehicleid: {
      value: 0,
      error: false,
      errorMessage: "",
    },
    vehiclelink: {
      value: window.location.href,
      error: false,
      errorMessage: "",
    },
  });

  const [successSubmit, setSuccessSubmit] = useState(false);

  const [tooltipState, setTooltipState] = useState({
    open: false,
    message: "",
    variant: "error",
  });

  const handleClose = () => {
    setTooltipState({
      open: false,
      message: "",
      variant: "success",
    });
  };

  const tooltip = (
    <Tooltip
      open={tooltipState.open}
      message={tooltipState.message}
      variant={tooltipState.variant}
      handleClose={handleClose}
    />
  );

  const vehicleImagePath = "../../vehicles/";
  let discount = null;
  let discountAmt = 0;

  if (props.data.discountPercent) {
    discountAmt = Math.ceil((props.data.discountPercent * props.data.price)/100);
    discount = (
      <>
      <span style={{color: 'black'}}>{props.data.discountPercent}% Off</span>
      <span className="save">
        Save <strong>` </strong>
        {discountAmt}
      </span>
      </>
    );
  }

  const updateFormdata = (event, formData) => {
    let targetName = event.target.name;
    let targetValue =
      targetName == "emi" ? event.target.checked : event.target.value;
    let errorMessage = "";
    let error = false;
    if (targetName !== "emi") {
      if (isEmpty(targetValue)) {
        errorMessage = "This field is required";
        error = true;
      } else {
        errorMessage = formValidator(targetName, targetValue);
        if (errorMessage.length) {
          error = true;
        }
      }
    } else {
      targetValue = targetValue ? 1 : 0;
    }
    let newData = {
      ...formData,
      [targetName]: {
        value: targetValue,
        error: error,
        errorMessage: errorMessage,
      },
    };
    setFormData(newData);
  };

  const submitForm = (event) => {
    event.preventDefault();
    props.history.push(`locate-store?store-id=${props.data.storeId}`);
    axios
      .post("/apis/leadDetail/insertBuyRequest", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    setTooltipState({
      open: true,
      message: "Your details have been saved",
      variant: "success",
    });
    setSuccessSubmit(true);
  };

  useEffect(() => {
    console.log("props.data.images", props.data);
    let vehicleId = {
      ...formData,
      vehicleid: {
        value: props.data.id,
        error: false,
        errorMessage: "",
      },
    };
    setFormData(vehicleId);
    setSliderImages(props.data.images);
    // var ul = document.querySelector('.thumbs');
    // ul.innerHTML = '';
    // for(var i=0;i<props.data.images.length;i++){
    //   var li = document.createElement('li');
    //   li.classList = 'thumb';
    //   li.role = 'button';
    //   li.tabIndex = 0;
    //   var img = document.createElement('img');
    //   img.src = vehicleImagePath + props.data.images[i];
    //   li.appendChild(img);
    //   ul.appendChild(li);
    // }
  }, [props.data.images]);

  return (
    <Grid container component="div" direction="row">
      {tooltip}
      <Grid item xs={12} md={12} sm={12} lg={6} className="vehicleGalSec">
        <div
          className="vehicleGal"
          style={{ minHeight: "610px", maxHeight: "610px" }}
        >
          {props.data.sold == "true" ? (
            <Carousel
              dynamicHeight={true}
              showThumbs={true}
              key={sliderImages[0]}
              useKeyboardArrows={true}
            >
              {sliderImages.map((image, key) => {
                return (
                  <div key={key} className="watermarked watermarkedCarousel">
                    <img src={vehicleImagePath + image} alt="" />
                  </div>
                );
              })}
            </Carousel>
          ) : (
            <Carousel
              dynamicHeight={true}
              showThumbs={true}
              key={sliderImages[0]}
              useKeyboardArrows={true}
            >
              {sliderImages.map((image, key) => {
                return (
                  <div key={key}>
                    <img src={vehicleImagePath + image} alt="" />
                  </div>
                );
              })}
            </Carousel>
          )}
        </div>
      </Grid>
      <Grid item xs={12} md={12} sm={12} lg={6}>
        <div
          className="vehicleDetails"
          style={{ minHeight: "610px", borderRadius: "5px" }}
        >
          <div className="PriceSec">
            <p className="price">
              <strong>`</strong> {props.data.price - discountAmt}
              {discount && (
                <span className="del">
                  <strong>` </strong> {props.data.price}
                </span>
              )}
            </p>
            {discount}
          </div>
          <div className="ProductDetail">
            <ul className="detailPoints">
              <li className="year">{props.data.myear}</li>
              <li className="km">{props.data.kmdriven} KMs</li>
              <li className="cc">{props.data.cc} CC</li>
              <li className="owner">{props.data.owner}</li>
              <li className="location">
                {props.data.loc + ", " + props.data.city}
              </li>
            </ul>
            <br className="clr" />
          </div>
          <div className="ProductForm">
            <form method="post" action="" name="0" id="" className="">
              <Grid
                container
                component="div"
                direction="row"
                className="form-group"
              >
                <Grid item xs={12} md={12} sm={12} lg={3}>
                  <label className="fieldname" htmlFor="txtOrgName">
                    Name* :
                  </label>
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={9}>
                  <input
                    type="text"
                    autoComplete="off"
                    className="name"
                    name="name"
                    id=""
                    placeholder="Type Your Name"
                    onBlur={(event) => updateFormdata(event, formData)}
                    required
                  />
                </Grid>
              </Grid>
              <Grid
                container
                component="div"
                direction="row"
                className="form-group"
              >
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <label className="fieldname" htmlFor="txtOrgName">
                    Phone No.* :
                  </label>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <input
                    type="text"
                    autoComplete="off"
                    className="phone"
                    name="phone"
                    id=""
                    placeholder="Type Your Contact Number"
                    onBlur={(event) => updateFormdata(event, formData)}
                    required
                  />
                </Grid>
              </Grid>
              <Grid
                container
                component="div"
                direction="row"
                className="form-group"
              >
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <label className="fieldname" htmlFor="txtOrgName">
                    Email Id :
                  </label>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  <input
                    type="text"
                    className="email"
                    autoComplete="off"
                    name="email"
                    id=""
                    placeholder="Type Your Email Id"
                    onBlur={(event) => updateFormdata(event, formData)}
                    required
                  />
                </Grid>
              </Grid>
              <Grid
                container
                component="div"
                direction="row"
                className="form-group"
                justify="center"
              >
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <label className="fieldname">
                    <input
                      type="checkbox"
                      name="emi"
                      className="filled-in"
                      onClick={(event) => updateFormdata(event, formData)}
                      defaultChecked
                    />
                    <span>Interested in Low-Cost EMI Option</span>
                  </label>
                </Grid>
              </Grid>
              <Grid
                container
                component="div"
                direction="row"
                className="form-group"
                justify="center"
              >
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <div className="form-group">
                    <button type="button" className="btn" onClick={submitForm}>
                      Get Store Details
                    </button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    vehicle: state.vehicleDetails.vehicle,
    loading: state.vehicleDetails.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    save: (vehicleid) => dispatch(actions.getVehicleData(vehicleid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleData);
