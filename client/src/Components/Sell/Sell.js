import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "./Sell.css";
import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";
import headingLines from "../../assets/heading-lines.svg";
import blackHeadingLines from '../../assets/black-heading-lines.svg';
import stepsToSell from '../../assets/steps-to-sell.svg';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Tooltip from "../UI/Tooltip/Tooltip";
import axios from "axios";
import isEmpty from "validator/lib/isEmpty";
import isAlpha from "validator/lib/isAlpha";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isAlphaNumeric from "validator/lib/isAlphanumeric";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  banner: {
    marginTop: theme.spacing(5)
  },
  formContainer: {
    marginTop: theme.spacing(1)
  },
  paper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    boxShadow: '0 0 4px 1px rgba(0, 0, 0, 0.2) !important',
    padding: theme.spacing(3),
    fontSize: 16,
    letterSpacing: 0.63,
    color: '#232b2b',
    lineHeight: '28px',
    textAlign: 'center'
  },
  mapContainer: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  formError: {
    color: "red"
  },
  bookAppointmentHeading:{
    paddingTop: 43.8,
    paddingBottom: 15,
    fontWeight: 800,
    fontSize: 36,
    color: '#232c2b'
  },
  sellHeading:{
    paddingBottom: 15,
    fontSize: 32,
    fontWeight: 600,
    color: '#ff0000',
    textAlign: 'center'
  },
  line: {
    textAlign: 'center'
  },
  steps:{
    width:900,
    height:360,
    backgroundImage: 'url("'+stepsToSell+'")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '900px 360px',
    marginLeft: 145
  },
  stepOne:{

  },
  stepTwo:{

  },
  stepThree:{

  },
  stepFour:{
    
  }
}));

const formValidator = (name, value) => {
  switch (name) {
    case "name": {
      return !isAlpha(value) ? "Name must contain only Alphabets" : "";
    }
    case "mobile": {
      return !isMobilePhone(value) ? "Invalid Mobile Number" : "";
    }
    case "email": {
      return !isEmail(value) ? "Invalid Email Id" : "";
    }
    case "query": {
      return !isAlphaNumeric(value)
        ? "Query must only have Alphanumeric Characters"
        : "";
    }
    default: {
      return false;
    }
  }
};

const Sell = props => {
  const classes = useStyles();

  useEffect(() =>{
    try {
      window.scroll({
        top: 70,
        left: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  },[])

  const [formData, setFormData] = useState({
    name: {
      value: "",
      error: false,
      errorMessage: ""
    },
    city: {
      value: "",
      error: false,
      errorMessage: ""
    },
    make: {
      value: "",
      error: false,
      errorMessage: ""
    },
    yom: {
      value: "",
      error: false,
      errorMessage: ""
    },
    mobile: {
      value: "",
      error: false,
      errorMessage: ""
    },
    variant: {
      value: "",
      error: false,
      errorMessage: ""
    },
    email: {
      value: "",
      error: false,
      errorMessage: ""
    },
    address: {
      value: "",
      error: false,
      errorMessage: ""
    },
    model: {
      value: "",
      error: false,
      errorMessage: ""
    },
    kmsdriven: {
      value: "",
      error: false,
      errorMessage: ""
    }
  });

  const [successSubmit, setSuccessSubmit] = useState(false);

  const [tooltipState, setTooltipState] = useState({
    open: false,
    message: "",
    variant: "error"
  });

  const handleClose = () => {
    setTooltipState({
      open: false,
      message: "",
      variant: "success"
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

  const validateAndUpdateFormdata = (event, formData) => {
    let targetValue = event.target.value;
    let targetName = event.target.name;
    let errorMessage = "";
    let error = false;
    if (isEmpty(targetValue)) {
      errorMessage = "This field is required";
      error = true;
    } else {
      errorMessage = formValidator(targetName, targetValue);
      if (errorMessage.length) {
        error = true;
      }
    }
    setFormData({
      ...formData,
      [event.target.name]: {
        value: targetValue,
        error: error,
        errorMessage: errorMessage
      }
    });
  };

  const updateFormdata = (event, formData) => {
    let targetValue = event.target.value;

    setFormData({
      ...formData,
      [event.target.name]: targetValue
    });
  };

  const submitForm = event => {

    axios
      .post("/apis/leadDetail/insertSellrequest", formData)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });

    setTooltipState({
      open: true,
      message: "Your details have been saved",
      variant: "success"
    });
    setSuccessSubmit(true);
  };

  return (
    <div id="Sell">
      <Header />
      <MainMenu />
      {tooltip}
      <Grid container component="div" direction="row" justify="center">
        <Grid item xs={11} md={11} sm={11} lg={11} className={classes.banner}>
            <Banner
              navigation="Sell"
              heading="Sell"
              text="Sell any Two-Wheeler"
              path={props.location.pathname}
            />
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11} className="center-align">
          <h3 className={classes.bookAppointmentHeading}>Book An Appointment</h3>
          <img alt="" src={headingLines} width="57" height="4"/>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11}>
            <Paper className={classes.paper}>
              <Grid container component="div" direction="row">
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className="center-align"
                >
                  <h4>Share Your Details</h4>
                </Grid>
                <Grid container component="div" direction="row">
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <form action="" id="shareYpurDetailsForm">
                      <Grid container component="div" direction="row">
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                          <Grid
                            container
                            component="div"
                            direction="row"
                            className="form-group"
                          >
                            <Grid item xs={12} md={12} sm={12} lg={3}>
                              <label className="fieldname" htmlFor="name">
                                Name* :
                              </label>
                            </Grid>
                            <Grid item xs={12} md={12} sm={12} lg={9}>
                              <input
                                type="text"
                                name="name"
                                id=""
                                placeholder="Your Name"
                                onBlur={event =>
                                  validateAndUpdateFormdata(event, formData)
                                }
                                className={
                                  formData.name.error
                                    ? "invalid"
                                    : formData.name.value
                                    ? "valid"
                                    : ""
                                }
                              />
                              {formData.name.error && (
                                <p className={classes.formError}>
                                  {formData.name.errorMessage}
                                </p>
                              )}
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            component="div"
                            direction="row"
                            className="form-group"
                          >
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                              <label className="fieldname" htmlFor="city">
                                City* :
                              </label>
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} lg={9}>
                              <input
                                type="text"
                                name="city"
                                placeholder="Your City"
                                onBlur={event =>
                                  validateAndUpdateFormdata(event, formData)
                                }
                                className={
                                  formData.city.error
                                    ? "invalid"
                                    : formData.city.value
                                    ? "valid"
                                    : ""
                                }
                              />
                              {formData.city.error && (
                                <p className={classes.formError}>
                                  {formData.city.errorMessage}
                                </p>
                              )}
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            component="div"
                            direction="row"
                            className="form-group"
                          >
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                              <label className="fieldname" htmlFor="make">
                                Make* :
                              </label>
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} lg={9}>
                              <input
                                type="text"
                                name="make"
                                placeholder="Manufacturer"
                                required
                                onBlur={event =>
                                  validateAndUpdateFormdata(event, formData)
                                }
                                className={
                                  formData.make.error
                                    ? "invalid"
                                    : formData.make.value
                                    ? "valid"
                                    : ""
                                }
                              />
                              {formData.make.error && (
                                <p className={classes.formError}>
                                  {formData.make.errorMessage}
                                </p>
                              )}
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            component="div"
                            direction="row"
                            className="form-group"
                          >
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                              <label className="fieldname" htmlFor="variant">
                                Variant :
                              </label>
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} lg={9}>
                              <input
                                type="text"
                                name="variant"
                                placeholder="Variant"
                                onChange={event =>
                                  updateFormdata(event, formData)
                                }
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
                              <label className="fieldname" htmlFor="yom">
                                Year of Manufacture* :
                              </label>
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} lg={9}>
                              <input
                                type="text"
                                name="yom"
                                placeholder="Year of Manufacture"
                                onBlur={event =>
                                  validateAndUpdateFormdata(event, formData)
                                }
                                className={
                                  formData.yom.error
                                    ? "invalid"
                                    : formData.yom.value
                                    ? "valid"
                                    : ""
                                }
                              />
                              {formData.yom.error && (
                                <p className={classes.formError}>
                                  {formData.yom.errorMessage}
                                </p>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                          <Grid
                            container
                            component="div"
                            direction="row"
                            className="form-group"
                          >
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                              <label className="fieldname" htmlFor="mobile">
                                Mobile Number* :
                              </label>
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} lg={9}>
                              <input
                                type="text"
                                name="mobile"
                                placeholder="Your Mobile Number"
                                required
                                onChange={event =>
                                  updateFormdata(event, formData)
                                }
                                onBlur={event =>
                                  validateAndUpdateFormdata(event, formData)
                                }
                                className={
                                  formData.mobile.error
                                    ? "invalid"
                                    : formData.mobile.value
                                    ? "valid"
                                    : ""
                                }
                              />
                              {formData.mobile.error && (
                                <p className={classes.formError}>
                                  {formData.mobile.errorMessage}
                                </p>
                              )}
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            component="div"
                            direction="row"
                            className="form-group"
                          >
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                              <label className="fieldname" htmlFor="address">
                                Address :
                              </label>
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} lg={9}>
                              <textarea
                                name="address"
                                placeholder="Your Address"
                                onChange={event =>
                                  updateFormdata(event, formData)
                                }
                                className={
                                  formData.city.error
                                    ? "invalid"
                                    : formData.city.value
                                    ? "valid"
                                    : ""
                                }></textarea>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            component="div"
                            direction="row"
                            className="form-group"
                          >
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                              <label className="fieldname" htmlFor="model">
                                Model* :
                              </label>
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} lg={9}>
                              <input
                                type="text"
                                name="model"
                                placeholder="Vehicle Model"
                                required
                                onChange={event =>
                                  updateFormdata(event, formData)
                                }
                                onBlur={event =>
                                  validateAndUpdateFormdata(event, formData)
                                }
                                className={
                                  formData.model.error
                                    ? "invalid"
                                    : formData.model.value
                                    ? "valid"
                                    : ""
                                }
                              />
                              {formData.model.error && (
                                <p className={classes.formError}>
                                  {formData.model.errorMessage}
                                </p>
                              )}
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            component="div"
                            direction="row"
                            className="form-group"
                          >
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                              <label
                                className="fieldname"
                                htmlFor="kmsdriven"
                              >
                                KMs Driven :
                              </label>
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} lg={9}>
                              <input
                                type="text"
                                name="kmsdriven"
                                placeholder="Kilometers Driven"
                                onChange={event =>
                                  updateFormdata(event, formData)
                                }
                                className={
                                  formData.kmsdriven.error
                                    ? "invalid"
                                    : formData.kmsdriven.value
                                    ? "valid"
                                    : ""
                                }                                />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container component="div" direction="row">
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          className="center-align"
                        >
                          <div className="form-group">
                            <button
                              type="button"
                              className="btn"
                              onClick={submitForm}
                            >
                              Sell Your Vehicle
                            </button>
                          </div>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <Paper className={classes.paper}>
            <h3 className={classes.sellHeading}>Steps to Sell Your Two-Wheeler</h3>
            <img alt="" src={blackHeadingLines} width="57" height="4"/>
            <div className={classes.steps}>
              <div className={classes.stepOne}>Step 1</div>
              <div className={classes.stepTwo}>Step 2</div>
              <div className={classes.stepThree}>Step 3</div>
              <div className={classes.stepFour}>Step 4</div>
            </div>
          </Paper>
        </Grid>
        </Grid>
      <Footer />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    filter: state.vehicleDetails.filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    kmFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sell);
