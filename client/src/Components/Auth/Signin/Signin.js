import React, { useEffect, useState } from "react";
import "./Signin.css";
// import Header from "../../Header/Header";
import MainMenu from "../../MainMenu/MainMenu";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import isAlphaNumeric from "validator/lib/isAlphanumeric";
import facebookIcon from "../../../assets/icons/social_media/facebook-icon.png";
import googleIcon from "../../../assets/icons/social_media/google-icon.png";
import { connect } from "react-redux";
import { loginUser } from "../../../store/actions/authActions";
import Tooltip from "../../UI/Tooltip/Tooltip";


const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3, 2)
  },
  body: {
    backgroundColor: "#f7f7f7"
  },
  logInHeading: {
    color: "#ff0000",
    textAlign: "center",
    fontWeight: 600,
    fontSize: 32,
    marginBottom: 50
  },
  formContainers: {
    marginBottom: theme.spacing(5)
  },
  formError: {
    color: "red"
  },
  signInButton: {
    backgroundColor: "#ff0000",
    padding: "6px 30px",
    borderRadius: 24,
    height: 48,
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    boxShadow: "none",
    marginLeft: 10
  },
  socialLogin: {
    marginTop: theme.spacing(5)
  },
  golaContainer: {
    display: "flex",
    justifyContent: "center",
    "& div:first-child": {
      marginRight: 5
    },
    "& div:nth-child(2)": {
      marginLeft: 5
    }
  },
  socialGola: {
    display: "inline-block",
    textAlign: "center",
    boxShadow: "0 0 12px 0 rgba(0, 0, 0, 0.17)",
    height: 45,
    width: 45,
    paddingTop: 10,
    borderRadius: 45,
    marginTop: 10,
    cursor: "pointer"
  },
  newtobb: {
    marginTop: 10,
    textAlign: "center"
  }
}));

const formValidator = (name, value) => {
  switch (name) {
    case "loginid": {
      return !isAlphaNumeric(value) && !isEmail(value)
        ? "Loginid must be alphanumeric or a valid email id"
        : "";
    }
    case "password": {
      return value.length > 6
        ? true
        : false
          ? "Password length must be of minimum 6 characters"
          : "";
    }
    default: {
      return false;
    }
  }
};

const Signin = ({auth,history,errors,loginUser}) => {
 
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



  useEffect(() => {
    if (auth.isAuthenticated === true) {
      history.push("/"); // push user to dashboard when they login
    }
  }, [auth.isAuthenticated,history]);

  useEffect(() => {
    if (Object.entries(errors).length) {
      setTooltipState({
        open: true,
        message: errors.emailnotfound,
        variant: "error"
      });
    }
  }, [errors]);


  const classes = useStyles();

  const [formData, setFormData] = useState({
    loginid: {
      value: "",
      error: false,
      errorMessage: ""
    },
    password: {
      value: "",
      error: false,
      errorMessage: ""
    }
  });

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

  const submitForm = event => {
    event.preventDefault();
    const formDataCopy = formData;
    let errorFlag = false;
    Object.entries(formData).forEach(data => {
      let targetValue = data[1].value;
      let targetName = data[0];
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
      if (error) {
        errorFlag = true;
      }
      formDataCopy[targetName].errorMessage = errorMessage;
      formDataCopy[targetName].error = error;
    });
    if (!errorFlag) {
      loginUser(formData); // push user to dashboard when they login
    } else {
      setFormData({
        ...formData,
        formDataCopy
      });
    }
  };

  return (

    <div id="Signin" className={classes.body}>
      {/* <Header /> */}
      <MainMenu />
      {tooltip}

      <Grid
        container
        component="div"
        direction="row"
        alignItems="center"
        justify="center"
        className={classes.container}
      >
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <Paper>
            <Grid
              container
              direction="row"
              component="div"
              alignItems="center"
              justify="center"
              className={classes.container}
            >
              <Grid item xs={9} sm={9} md={9} lg={9}>
                <h4 className={classes.logInHeading}>Sign In</h4>
                <form id="signinForm">
                  <Grid
                    container
                    component="div"
                    direction="row"
                    className={classes.formContainers}
                  >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <label htmlFor="loginid" className="black-text">
                        Login Id:*
                      </label>
                      <input
                        type="text"
                        name="loginid"
                        id="loginid"
                        placeholder="(eg. VarunamReddy_108 or abc@gmail.com)"
                        onBlur={event =>
                          validateAndUpdateFormdata(event, formData)
                        }
                        className={
                          formData.loginid.error
                            ? "invalid"
                            : formData.loginid.value
                              ? "valid"
                              : ""
                        }
                      />
                      {formData.loginid.error && (
                        <p className={classes.formError}>
                          {formData.loginid.errorMessage}
                        </p>
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    component="div"
                    direction="row"
                    className={classes.formContainers}
                  >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <label htmlFor="password" className="black-text">
                        Password:*
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="(eg. VarunamReddy@123)"
                        onBlur={event =>
                          validateAndUpdateFormdata(event, formData)
                        }
                        className={
                          formData.password.error
                            ? "invalid"
                            : formData.password.value
                              ? "valid"
                              : ""
                        }
                      />
                      {formData.password.error && (
                        <p className={classes.formError}>
                          {formData.password.errorMessage}
                        </p>
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    component="div"
                    direction="row"
                    className={classes.formContainers}
                  >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <div className="center-align">
                        <button
                          id="submitButton"
                          className={classes.signInButton + " btn"}
                          onClick={submitForm}
                        >
                          Sign In
                        </button>
                      </div>
                      <Grid
                        container
                        component="div"
                        direction="row"
                        justify="center"
                        className={classes.socialLogin}
                      >
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <div className="center-align">
                            Or you can log in with
                          </div>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          className={classes.golaContainer}
                        >
                          <div className={classes.socialGola} id="googleSignup">
                            <img src={googleIcon} height={25} alt="" />
                          </div>
                          <div
                            className={classes.socialGola}
                            id="facebookSignup"
                          >
                            <img src={facebookIcon} height={25} alt="" />
                          </div>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          className={classes.newtobb}
                        >
                          New to BikeBazaar?{" "}
                          <span>
                            <Link to="/signup">Sign Up</Link>
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Signin);
