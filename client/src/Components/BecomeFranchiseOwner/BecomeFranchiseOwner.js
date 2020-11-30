import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import "./BecomeFranchiseOwner.css";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";
import StoreSection from "./StoreSection/StoreSection";
import headingLines from "../../assets/heading-lines.svg";
import blackHeadingLines from "../../assets/black-heading-lines.svg";
import certifiedIcon from "../../assets/images/icons/certified.png";
import BikeBazaarStore from "../../assets/BikeBazaarStore.png";
import strongItInfra from "../../assets/icons/strong-it-infra.svg";
import callCentre from "../../assets/icons/call-centre.svg";
import shakeHand from "../../assets/icons/shake-hand.svg";
import strongOnlinePresence from "../../assets/icons/strong-online-presence.svg";
import moreSalesThanEver from "../../assets/icons/more-than-sales.svg";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import isEmpty from "validator/lib/isEmpty";
import isAlpha from "validator/lib/isAlpha";
import isAscii from "validator/lib/isAscii";
import isEmail from "validator/lib/isEmail";
import isNumeric from "validator/lib/isNumeric";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Modal from "@material-ui/core/Modal";
import closeIcon from "../../assets/Close.png";
import advantageIcon from "../../assets/images/icons/advantage-icon-lt.png";
import rightRedLine from "../../assets/images/icons/advantage-icon-rt.png";
import mobiledivider from "../../assets/mobiledivider.png";

const formValidator = (name, value) => {
  switch (name) {
    case "name": {
      const nameValue = value.replace(/ /g, "");
      return !isAscii(nameValue) || value.length > 100
        ? "Enter a valid name"
        : "";
    }
    case "mobile": {
      return value.length > 15 || !isNumeric(value)
        ? "Invalid Mobile Number"
        : "";
    }
    case "email": {
      return !isEmail(value) ? "Invalid Email Id" : "";
    }
    case "city": {
      const cityValue = value.replace(/ /g, "");
      return !isAlpha(cityValue) || value.length > 100
        ? "Query must only have alphabet Characters"
        : "";
    }
    case "address": {
      return !isAscii(value) || value.length > 100
        ? "Address must have Valid Characters"
        : "";
    }
    case "pin": {
      return !isNumeric(value) || value.length > 10
        ? "PIN Code must only have Numeric Characters"
        : "";
    }
    default: {
      return false;
    }
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  banner: {
    marginTop: theme.spacing(4),
  },
  bold: {
    fontWeight: 800,
  },
  form: {
    marginTop: theme.spacing(1),
    "& .MuiGrid-item": {
      marginTop: theme.spacing(1),
    },
  },

  mobileform: {
    padding: "1px",
  },
  submitButton: {
    position: "relative",
    background: "#ff0000",
    padding: "6px 30px",
    borderRadius: 24,
    height: 48,
    fontSize: 20,
    fontWeight: 600,
    textTransform: "capitalize",
    boxShadow: "none",
    marginLeft: 10,
    top: 52,
  },
  submitmobileButton: {
    position: "relative",
    background: "#ff0000",
    padding: "6px 30px",
    borderRadius: 24,
    height: 48,
    fontSize: 20,
    fontWeight: 600,
    textTransform: "capitalize",
    boxShadow: "none",
  },
  divider: {
    width: 1,
    height: 395,
    backgroundColor: "#a7aaaa",
  },
  label: {
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: "0.83px",
    color: "#000",
  },
  mobileLabel: {
    fontSize: "12.5px",
    color: "#232c2b",
  },
  padding0: {
    padding: "0px !important",
  },
  item1: {
    order: 2,
    [theme.breakpoints.up("md")]: {
      order: 1,
    },
  },
  item2: {
    order: 1,
    [theme.breakpoints.up("md")]: {
      order: 2,
    },
  },
  item3: {
    order: 3,
    [theme.breakpoints.up("md")]: {
      order: 3,
    },
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
  modalBoxErr: {
    position: "absolute",
    width: "60%",
    backgroundColor: "orange",
    color: "white",
    border: "0 solid #fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  advantageIcon: {
    marginLeft: "40%",
  },
  textFieldInputProps: {
    borderBottom: "1px solid #9e9e9e",
    paddingBottom: "9%",
    paddingRight: "2%",
    paddingTop: "0%",
  },
}));

const BecomeFranchiseOwner = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const paddingClass = matches ? "" : "padding0";
  const marginClass = matches ? "" : "margin0";
  const advMobile = matches ? "" : "advantageArrowMobile";
  const adv1Mobile = matches ? "" : "advantage1ArrowMobile";
  const advantagePadding = matches ? "" : "franchiseAdvantagePadding";
  const mobileHeading = matches ? "" : "mobileHeading";
  const divider = matches ? (
    <Divider orientation="vertical" className={classes.divider} />
  ) : (
    <hr style={{ width: "100%", margin: "4% 0% 4% 0% " }} />
  );

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
  }, []);

  const [formData, setFormData] = useState({
    name: {
      value: "",
      error: false,
      errorMessage: "",
    },
    city: {
      value: "",
      error: false,
      errorMessage: "",
    },
    email: {
      value: "",
      error: false,
      errorMessage: "",
    },
    mobile: {
      value: "",
      error: false,
      errorMessage: "",
    },
    address: {
      value: "",
      error: false,
      errorMessage: "",
    },
    pin: {
      value: "",
      error: false,
      errorMessage: "",
    },
  });

  const [success, setSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleModalClose = () => {
    setOpen(false);
    props.history.go(0);
  };
  const [modalMesg, setModalMesg] = React.useState("");

  const tooltip = (
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
      <div className={success ? classes.modalBoxSuccess : classes.modalBoxErr}>
        <h4>{modalMesg}</h4>
        <img
          style={{ marginLeft: "10px", cursor: "pointer" }}
          onClick={handleModalClose}
          src={closeIcon}
          height="20"
          alt=""
        />
      </div>
    </Modal>
  );

  const updateFormdata = (event, formData) => {
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
        errorMessage: errorMessage,
      },
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    const formDataCopy = formData;
    let errorFlag = false;
    Object.entries(formData).forEach((data) => {
      let targetValue = data[1].value;
      let targetName = data[0];
      let errorMessage = "";
      let error = false;
      if (targetValue === "") {
        errorMessage = "This field is required";
        error = true;
      }
      if (error) {
        errorFlag = true;
      }
      formDataCopy[targetName].errorMessage = errorMessage;
      formDataCopy[targetName].error = error;
    });
    if (!errorFlag) {
      axios
        .post("/apis/leadDetail/insertFranchiseRequest", formData)
        .then((response) => {
          setSuccess(true);
          setOpen(true);
          setModalMesg(
            "Thanks for sharing your details. We will get back to you shortly."
          );
        })
        .catch((err) => {
          console.log(err);
          setSuccess(false);
          setOpen(true);
          setModalMesg("Something went wrong, please try later.");
        });
    } else {
      setFormData({
        ...formData,
        formDataCopy,
      });
    }
  };
  return (
    <div id="BecomeFranchiseOwner" className={classes.root}>
      {tooltip}
      {/* <Header /> */}
      <MainMenu />
      <Grid
        container
        component="div"
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={11} sm={11} md={11} lg={11} className={classes.banner}>
          <Banner
            navigation="Become Franchise Owner"
            heading="Become Franchise Owner"
            text=""
            path={props.location.pathname}
          />
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        id={matches ? "paper" : "paperMobile"}
      >
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <div className="paper">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <h4 className={matches ? "redhead" : "mobileRedHead"}>
                    About BikeBazaar
                  </h4>
                </Grid>

                <Grid
                  item
                  className={classes.item1}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={7}
                >
                  {matches ? (
                    <p className="about-bb">
                      BikeBazaar aims to provide a hassle-free experience to
                      anyone looking to
                      <br />
                      buy/sell a pre-owned two-wheeler with the help of
                      technology & team of
                      <br />
                      experts.
                      <br />
                      <br />
                      For the buyer we ensure quality and make the process
                      smooth by offering
                      <br />
                      <span className={classes.bold}>
                        "Free 6 Months' Warranty"
                      </span>
                      ,
                      <span className={classes.bold}>
                        "Certified Two-Wheelers"
                      </span>
                      , <span className={classes.bold}>"Low Cost EMI"</span>,
                      <br />
                      <span className={classes.bold}>
                        "Hassle-Free Document Transfer"
                      </span>
                      and more.
                      <br />
                      <br />
                      We are building a hybrid model (Mix of Online and Offline)
                      to bring structure
                      <br />
                      to this domain and ensure a great and hassle-free
                      experience for our
                      <br />
                      Customers.
                      <br />
                      <br />
                      And we are offering a reliable and hassle-free way to buy
                      and sell any Pre-Owned
                      <br />
                      Two-Wheeler stakeholders would rely on BikeBazaar for
                      their purchasing or
                      <br />
                      selling decisions regarding their vehicles.
                      <br />
                      <br />
                      It's why becoming a Franchise Partner of BikeBazaar
                      provides you great business opportunities.
                    </p>
                  ) : (
                    <p className="mobile-about-bb">
                      BikeBazaar aims to provide a hassle-free experience to
                      anyone looking to buy/sell a pre-owned two-wheeler <br />
                      with the help of technology & team of experts.
                      <br />
                      <br />
                      For the buyer we ensure quality and make the process
                      smooth by offering
                      <span style={{fontWeight:'bold',marginLeft:'1%'}}>
                        "Free 6 Months' Warranty ,"
                      </span>
                        <br/>
                      <span style={{fontWeight:'bold'}}>
                        "Certified Two-Wheelers"
                      </span>
                      , <span style={{fontWeight:'bold'}}>"Low Cost EMI"</span>,
                      <br />
                      <span style={{fontWeight:'bold'}}>
                        "Hassle-Free Document Transfer"
                      </span>
                      and more.
                      <br />
                      <br />
                      We are building a hybrid model (Mix of Online and Offline)
                      to bring structure to this domain and ensure a great and
                      hassle-free experience for our Customers.
                      <br />
                      <br />
                      And we are offering a reliable and hassle-free way to buy
                      and sell any Pre-Owned Two-Wheeler, stakeholders would
                      rely on BikeBazaar for their purchasing or
                      <br />
                      selling decisions regarding their vehicles.
                      <br />
                      <br />
                      It's why becoming a Franchise Partner of BikeBazaar
                      provides you great business opportunities.
                    </p>
                  )}
                </Grid>
                {matches ? (
                  <Grid
                    item
                    className={classes.item2}
                    xs={12}
                    sm={12}
                    md={6}
                    lg={5}
                  >
                    <img
                      src={BikeBazaarStore}
                      width="500px"
                      className={matches ? "" : "imageMobile"}
                    />
                  </Grid>
                ) : (
                  <Grid style={{ textAlign: "center" }} xs={12} sm={12}>
                    <img alt="" src={mobiledivider} height="4" />
                    <img
                      height="98%"
                      width="100%"
                      src={BikeBazaarStore}
                      alt=""
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid
          item
          xs={11}
          sm={11}
          md={11}
          lg={11}
          className="franchiseAdvantageSec"
        >
          <div className={"franchiseAdvantage " + advantagePadding}>
            {matches ? (
              <h2 className="center-align centerAdv">BikeBazaar Advantage</h2>
            ) : (
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                  BikeBazaar Advantage
                </span>
              </div>
            )}
            <div className="center-align">
              <img src={headingLines} alt="" width="57" height="3" />
            </div>

            {/* for giving the space */}
            {matches ? (
              <>
                <br />
                <br />
              </>
            ) : (
              <>
                <br />
              </>
            )}

            <div className="franchiseAdvantageSec">
              {matches ? (
                <Grid
                  container
                  component="div"
                  direction="row"
                  className={"advantage " + paddingClass}
                >
                  <Grid item xs={6} sm={6} md={1} lg={1}>
                    <div className="advantageIconLeft">
                      <img
                        className="strong-presence"
                        src={strongOnlinePresence}
                        alt=""
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6} sm={6} md={11} lg={11}>
                    <h3 className={advMobile}>Strong Online Presence</h3>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  style={{ marginBottom: "5%" }}
                  xs={12}
                  sm={12}
                  direction="row"
                  component="div"
                >
                  <div style={{ display: "flex" }}>
                    <>
                      <div className="mobileAdvantageIconLeft">
                        <img
                          height="35"
                          style={{ marginTop: "25%" }}
                          src={strongOnlinePresence}
                        />
                      </div>

                      <img
                        style={{ marginTop: "8%" }}
                        width="70"
                        height="15"
                        src={advantageIcon}
                        alt=""
                      />
                    </>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "12.5px",
                      fontWeight: "bold",
                    }}
                  >
                    <p style={{ marginTop: "2%" }}>Strong Online Presence</p>
                  </div>
                </Grid>
              )}

              {matches ? (
                <Grid
                  container
                  component="div"
                  direction="row"
                  className={"advantage1 " + paddingClass}
                >
                  <Grid item xs={6} sm={6} md={11} lg={11}>
                    <h3 className={adv1Mobile}>Certified Two-Wheelers</h3>
                  </Grid>
                  <Grid item xs={6} sm={6} md={1} lg={1} className="icon">
                    <div className={"advantageIconRight " + marginClass}>
                      <img className="certified" src={certifiedIcon} alt="" />
                    </div>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  style={{ marginBottom: "5%" }}
                  xs={12}
                  sm={12}
                  component="div"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "16%",
                    }}
                  >
                    <img
                      style={{ transform: "scaleX(-1)", marginTop: "10%" }}
                      height="17"
                      width="80"
                      src={advantageIcon}
                      alt=""
                    />
                    <div className="mobileAdvantageIconLeftAlign">
                      <img
                        height="35"
                        width="30"
                        style={{ marginTop: "25%" }}
                        src={certifiedIcon}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "12.5px",
                      fontWeight: "bold",
                    }}
                  >
                    <p style={{ marginTop: "2%" }}>Certified Two-Wheelers</p>
                  </div>
                </Grid>
              )}

              {matches ? (
                <Grid
                  container
                  component="div"
                  direction="row"
                  className={"advantage " + paddingClass}
                >
                  <Grid item xs={6} sm={6} md={1} lg={1}>
                    <div className="advantageIconLeft">
                      <img className="strong-infa" src={strongItInfra} alt="" />
                    </div>
                  </Grid>
                  <Grid item xs={6} sm={6} md={11} lg={11}>
                    <h3 className={advMobile}>Strong IT Infrastructure</h3>
                  </Grid>
                </Grid>
              ) : (
                <Grid component="div" direction="row" xs={12} sm={12}>
                  <div style={{ display: "flex" }}>
                    <>
                      <div className="mobileAdvantageIconLeft">
                        <img
                          height="35"
                          style={{ marginTop: "25%" }}
                          src={strongItInfra}
                        />
                      </div>

                      <img
                        style={{ marginTop: "8%" }}
                        width="70"
                        height="15"
                        src={advantageIcon}
                        alt=""
                      />
                    </>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "12.5px",
                      fontWeight: "bold",
                    }}
                  >
                    <p style={{ marginTop: "2%" }}>Strong IT Infrastructure</p>
                  </div>
                </Grid>
              )}

              {matches ? (
                <Grid
                  container
                  component="div"
                  direction="row"
                  className={"advantage1 " + paddingClass}
                >
                  <Grid item xs={6} sm={6} md={11} lg={11} className="detail">
                    <h3 className={adv1Mobile}>Dedicated Call-Center</h3>
                  </Grid>
                  <Grid item xs={6} sm={6} md={1} lg={1} className="icon">
                    <div className={"advantageIconRight " + marginClass}>
                      <img className="call-centre" src={callCentre} alt="" />
                    </div>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  style={{ marginBottom: "5%" }}
                  xs={12}
                  sm={12}
                  component="div"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "16%",
                    }}
                  >
                    <img
                      style={{ transform: "scaleX(-1)", marginTop: "10%" }}
                      height="17"
                      width="80"
                      src={advantageIcon}
                      alt=""
                    />
                    <div className="mobileAdvantageIconLeftAlign">
                      <img
                        height="40"
                        width="40"
                        style={{ marginTop: "25%" }}
                        src={callCentre}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "12.5px",
                      fontWeight: "bold",
                    }}
                  >
                    <p style={{ marginTop: "2%" }}>Dedicated Call-Center</p>
                  </div>
                </Grid>
              )}

              {matches ? (
                <Grid
                  container
                  component="div"
                  direction="row"
                  className={"advantage " + paddingClass}
                >
                  <Grid item xs={6} sm={6} md={1} lg={1}>
                    <div className="advantageIconLeft">
                      <img
                        className="more-sales"
                        src={moreSalesThanEver}
                        height="90"
                        alt=""
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6} sm={6} md={11} lg={11}>
                    <h3 className={advMobile}>More Sales Than Ever</h3>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  style={{ marginBottom: "5%" }}
                  xs={12}
                  sm={12}
                  direction="row"
                  component="div"
                >
                  <div style={{ display: "flex" }}>
                    <>
                      <div className="mobileAdvantageIconLeft">
                        <img
                          height="35"
                          style={{ marginTop: "25%" }}
                          src={moreSalesThanEver}
                        />
                      </div>

                      <img
                        style={{ marginTop: "8%" }}
                        width="70"
                        height="15"
                        src={advantageIcon}
                        alt=""
                      />
                    </>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "12.5px",
                      fontWeight: "bold",
                    }}
                  >
                    <p style={{ marginTop: "2%" }}>More Sales Than Ever</p>
                  </div>
                </Grid>
              )}

              {matches ? (
                <Grid
                  container
                  component="div"
                  direction="row"
                  className={"advantage1 " + paddingClass}
                >
                  <Grid item xs={6} sm={6} md={11} lg={11} className="detail">
                    <h3 className={adv1Mobile}>
                      BTL Activities and B2B Tieups
                    </h3>
                  </Grid>
                  <Grid item xs={6} sm={6} md={1} lg={1} className="icon">
                    <div className={"advantageIconRight " + marginClass}>
                      <img className="btl" src={shakeHand} alt="" />
                    </div>
                  </Grid>
                </Grid>
              ) : (
                // <Grid compoennt="div" xs={12} sm={12}>
                //   <div className="mobileAdvantageIconLeft">
                //     <img
                //       src={shakeHand}
                //       height="40"
                //       width="60"
                //       style={{ marginTop: "20%" }}
                //       alt=""
                //     />
                //   </div>
                //   <div
                //     style={{
                //       textAlign: "center",
                //       fontSize: "12.5px",
                //       fontWeight: "bold",
                //     }}
                //   >
                //     <p style={{ marginTop: "4%" }}>
                //       BTL Activities and B2B Tieups
                //     </p>
                //   </div>
                // </Grid>

                <Grid
                  style={{ marginBottom: "5%" }}
                  xs={12}
                  sm={12}
                  component="div"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "16%",
                    }}
                  >
                    <img
                      style={{ transform: "scaleX(-1)", marginTop: "10%" }}
                      height="17"
                      width="80"
                      src={advantageIcon}
                      alt=""
                    />
                    <div className="mobileAdvantageIconLeftAlign">
                      <img
                        height="50"
                        width="50"
                        style={{ marginTop: "15%" }}
                        src={shakeHand}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "12.5px",
                      fontWeight: "bold",
                    }}
                  >
                    <p style={{ marginTop: "4%" }}>
                      BTL Activities and B2B Tieups
                    </p>
                  </div>
                </Grid>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginBottom: "35px" }}
      >
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <div className="paper">
            <Grid container component="div" direction="row">
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                className="center-align"
              >
                {matches ? (
                  <h4 className="redhead">
                    Share Your Details to own a BikeBazaar Store
                  </h4>
                ) : (
                  <p className="mobileRedHead">
                    Share Your Details <br />
                    to own a BikeBazaar Store
                  </p>
                )}

                {matches ? (
                  <img src={blackHeadingLines} alt="" width="57" height="4" />
                ) : (
                  <img src={mobiledivider} alt="" />
                )}
              </Grid>
              <form
                action=""
                id={
                  matches
                    ? "shareYourDetailsForm"
                    : "shareYourDetailsFormMobile"
                }
                className={matches ? classes.form : classes.mobileform}
              >
                <Grid container component="div" direction="row">
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid
                      container
                      component="div"
                      direction="row"
                      justify="space-between"
                    >
                      {matches ? (
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <label className="fieldname" htmlFor="name">
                            <span className={classes.label}>Name:*</span>
                            &nbsp;&nbsp;(eg. Varunam Reddy)
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onBlur={(event) => updateFormdata(event, formData)}
                          />
                          {formData.name.error && (
                            <div className="invalid-feedback d-block">
                              {formData.name.errorMessage}
                            </div>
                          )}
                        </Grid>
                      ) : (
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <label htmlFor="name">
                            <span className={classes.mobileLabel}>Name:*</span>
                            &nbsp;&nbsp;(eg. Varunam Reddy)
                          </label>
                          <input
                            style={{ height: "25px" }}
                            type="text"
                            name="name"
                            id="name"
                            onBlur={(event) => updateFormdata(event, formData)}
                          />
                          {formData.name.error && (
                            <div className="invalid-feedback d-block">
                              {formData.name.errorMessage}
                            </div>
                          )}
                        </Grid>
                      )}

                      {matches ? (
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <label className="fieldname" htmlFor="mobile">
                            <span className={classes.label}>Mobile No:*</span>
                            &nbsp;&nbsp;(eg. +91 9999999999)
                          </label>
                          <input
                            type="text"
                            name="mobile"
                            className={
                              formData.mobile.error
                                ? "invalid"
                                : formData.mobile.value
                                ? "valid"
                                : ""
                            }
                            onBlur={(event) => updateFormdata(event, formData)}
                          />
                          {formData.mobile.error && (
                            <div className="invalid-feedback d-block">
                              {formData.mobile.errorMessage}
                            </div>
                          )}
                        </Grid>
                      ) : (
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <label htmlFor="mobile">
                            <span className={classes.mobileLabel}>
                              Mobile No:*
                            </span>
                            &nbsp;&nbsp; (eg. +91 9999999999)
                          </label>
                          <input
                            style={{ height: "25px" }}
                            type="text"
                            name="mobile"
                            className={
                              formData.mobile.error
                                ? "invalid"
                                : formData.mobile.value
                                ? "valid"
                                : ""
                            }
                            onBlur={(event) => updateFormdata(event, formData)}
                          />
                          {formData.mobile.error && (
                            <div className="invalid-feedback d-block">
                              {formData.mobile.errorMessage}
                            </div>
                          )}
                        </Grid>
                      )}

                      {matches ? (
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <label className="fieldname" htmlFor="email">
                            <span className={classes.label}>Email:*</span>
                            &nbsp;&nbsp;(eg. abc@gmail.com)
                          </label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            className={
                              formData.email.error
                                ? "invalid"
                                : formData.email.value
                                ? "valid"
                                : ""
                            }
                            onBlur={(event) => updateFormdata(event, formData)}
                          />
                          {formData.email.error && (
                            <div className="invalid-feedback d-block">
                              {formData.email.errorMessage}
                            </div>
                          )}
                        </Grid>
                      ) : (
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <label htmlFor="email">
                            <span className={classes.mobileLabel}>Email:*</span>
                            &nbsp;&nbsp;(eg. abc@gmail.com)
                          </label>
                          <input
                            style={{ height: "25px" }}
                            type="text"
                            name="email"
                            id="email"
                            className={
                              formData.email.error
                                ? "invalid"
                                : formData.email.value
                                ? "valid"
                                : ""
                            }
                            onBlur={(event) => updateFormdata(event, formData)}
                          />
                          {formData.email.error && (
                            <div className="invalid-feedback d-block">
                              {formData.email.errorMessage}
                            </div>
                          )}
                        </Grid>
                      )}

                      {matches ? (
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <label className="fieldname" htmlFor="city">
                            <span className={classes.label}>City:*</span>
                            &nbsp;&nbsp;(eg. Pune, Kolkata)
                          </label>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            className={
                              formData.city.error
                                ? "invalid"
                                : formData.city.value
                                ? "valid"
                                : ""
                            }
                            onBlur={(event) => updateFormdata(event, formData)}
                          />
                          {formData.city.error && (
                            <div className="invalid-feedback d-block">
                              {formData.city.errorMessage}
                            </div>
                          )}
                        </Grid>
                      ) : (
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <label htmlFor="city">
                            <span className={classes.mobileLabel}>City:*</span>
                            &nbsp;&nbsp;(eg. Pune, Kolkata)
                          </label>
                          <input
                            style={{ height: "25px" }}
                            type="text"
                            name="city"
                            id="city"
                            className={
                              formData.city.error
                                ? "invalid"
                                : formData.city.value
                                ? "valid"
                                : ""
                            }
                            onBlur={(event) => updateFormdata(event, formData)}
                          />
                          {formData.city.error && (
                            <div className="invalid-feedback d-block">
                              {formData.city.errorMessage}
                            </div>
                          )}
                        </Grid>
                      )}

                      {matches ? (
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <label className="fieldname" htmlFor="variant">
                            <span className={classes.label}>Address:*</span>
                            &nbsp;&nbsp;(eg. 123, abc colony, Mumbai)
                          </label>
                          <input
                            type="text"
                            name="address"
                            id="address"
                            className={
                              formData.address.error
                                ? "invalid"
                                : formData.address.value
                                ? "valid"
                                : ""
                            }
                            onBlur={(event) => updateFormdata(event, formData)}
                          />
                          {formData.address.error && (
                            <div className="invalid-feedback d-block">
                              {formData.address.errorMessage}
                            </div>
                          )}
                        </Grid>
                      ) : (
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <label htmlFor="variant">
                            <span className={classes.mobileLabel}>
                              Address:*
                            </span>
                            &nbsp;&nbsp;(eg. 123, abc colony, Mumbai)
                          </label>
                          <input
                            style={{ height: "25px" }}
                            type="text"
                            name="address"
                            id="address"
                            className={
                              formData.address.error
                                ? "invalid"
                                : formData.address.value
                                ? "valid"
                                : ""
                            }
                            onBlur={(event) => updateFormdata(event, formData)}
                          />
                          {formData.address.error && (
                            <div className="invalid-feedback d-block">
                              {formData.address.errorMessage}
                            </div>
                          )}
                        </Grid>
                      )}

                      {matches ? (
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <label className="fieldname" htmlFor="pin">
                            <span className={classes.label}>Pincode:*</span>
                            &nbsp;&nbsp;(eg. 110075)
                          </label>
                          <input
                            type="text"
                            name="pin"
                            id="pin"
                            className={
                              formData.pin.error
                                ? "invalid"
                                : formData.name.value
                                ? "valid"
                                : ""
                            }
                            onBlur={(event) => updateFormdata(event, formData)}
                          />
                          {formData.pin.error && (
                            <div className="invalid-feedback d-block">
                              {formData.pin.errorMessage}
                            </div>
                          )}
                        </Grid>
                      ) : (
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <label tmlFor="pin">
                            <span className={classes.mobileLabel}>
                              Pincode:*
                            </span>
                            &nbsp;&nbsp;(eg. 110075)
                          </label>
                          <input
                            style={{ height: "25px" }}
                            type="text"
                            name="pin"
                            id="pin"
                            className={
                              formData.pin.error
                                ? "invalid"
                                : formData.name.value
                                ? "valid"
                                : ""
                            }
                            onBlur={(event) => updateFormdata(event, formData)}
                          />
                          {formData.pin.error && (
                            <div className="invalid-feedback d-block">
                              {formData.pin.errorMessage}
                            </div>
                          )}
                        </Grid>
                      )}
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
                    {matches ? (
                      <button
                        type="submit"
                        style={{ marginBottom: 60 }}
                        className={classes.submitButton + " btn"}
                        onClick={submitForm}
                      >
                        Share
                      </button>
                    ) : (
                      <button
                        type="submit"
                        style={{ marginBottom: 5 }}
                        className={classes.submitmobileButton + " btn"}
                        onClick={submitForm}
                      >
                        Share
                      </button>
                    )}
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <div className="paper">
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
              className="support"
            >
              <Grid item xs={12} sm={12} md={5} lg={5} className="center-align">
                {matches ? (
                  <h4 className="center-align redhead">Pre-Launch Support</h4>
                ) : (
                  <p className="mobileRedHead">Pre-Launch Support</p>
                )}
                {matches ? (
                  <img
                    style={{ marginBottom: "10%" }}
                    src={blackHeadingLines}
                    alt=""
                  />
                ) : (
                  <img
                    style={{ marginBottom: "7%" }}
                    alt=""
                    src={mobiledivider}
                  />
                )}

                {matches ? (
                  <Grid
                    container
                    component="div"
                    direction="row"
                    className="advantage"
                  >
                    <Grid item xs={4} sm={4} md={2} lg={2}>
                      <div className="advantageIconLeft">
                        <img
                          className="rupees"
                          src={strongOnlinePresence}
                          alt=""
                        />
                      </div>
                    </Grid>
                    <Grid item xs={8} sm={8} md={10} lg={10}>
                      <h3 className={mobileHeading}>Strong Online Presence</h3>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container component="div" direction="column">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div className="mobileAdvantageIconLeft">
                        <img
                          style={{ marginTop: "20%" }}
                          height="40"
                          width="40"
                          src={strongOnlinePresence}
                          alt=""
                        />
                      </div>
                      <img className="redLine" src={advantageIcon} alt="" />
                    </div>

                    <p className="mobileHeading">Strong Online Presence</p>
                  </Grid>
                )}

                {matches ? (
                  <Grid
                    container
                    component="div"
                    direction="row"
                    className="advantage1"
                  >
                    <Grid item xs={8} sm={8} md={10} lg={10}>
                      <h3 className={mobileHeading}>
                        Showroom Branding & Exhaustive
                        <br />
                        Guidelines for CI of Showroom
                      </h3>
                    </Grid>
                    <Grid item xs={4} sm={4} md={2} lg={2} className="icon">
                      <div className="advantageIconRight">
                        <img
                          className="rupees"
                          src={strongOnlinePresence}
                          alt=""
                        />
                      </div>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container component="div" direction="column">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "20%",
                      }}
                    >
                      <img className="redLine" src={rightRedLine} />
                      <div className="mobileAdvantageIconRight">
                        <img
                          style={{ marginTop: "20%" }}
                          height="40"
                          width="40"
                          src={strongOnlinePresence}
                          alt=""
                        />
                      </div>
                    </div>

                    <p className={mobileHeading}>
                      Showroom Branding & Exhaustive
                      <br />
                      Guidelines for CI of Showroom
                    </p>
                  </Grid>
                )}

                {matches ? (
                  <Grid
                    container
                    component="div"
                    direction="row"
                    className="advantage"
                  >
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                      <div className="advantageIconLeft">
                        <img
                          className="rupees"
                          src={strongOnlinePresence}
                          alt=""
                        />
                      </div>
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10}>
                      <h3 className={mobileHeading}>
                        Training & Development for
                        <br />
                        High Performance
                      </h3>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container component="div" direction="column">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div className="mobileAdvantageIconLeft">
                        <img
                          style={{ marginTop: "20%" }}
                          height="40"
                          width="40"
                          src={strongOnlinePresence}
                          alt=""
                        />
                      </div>
                      <img className="redLine" src={advantageIcon} alt="" />
                    </div>

                    <p className={mobileHeading}>
                      Training & Development for
                      <br />
                      High Performance
                    </p>
                  </Grid>
                )}
              </Grid>
              {divider}

              <Grid item xs={12} sm={12} md={5} lg={5} className="center-align">
                {matches ? (
                  <h4 className="center-align redhead">Post-Launch Support</h4>
                ) : (
                  <p className="mobileRedHead">Post-Launch Support</p>
                )}
                {matches ? (
                  <img
                    style={{ marginBottom: "10%" }}
                    src={blackHeadingLines}
                    alt=""
                  />
                ) : (
                  <img
                    style={{ marginBottom: "5%" }}
                    src={mobiledivider}
                    alt=""
                  />
                )}
                {matches ? (
                  <Grid
                    container
                    component="div"
                    direction="row"
                    className="advantage"
                  >
                    <Grid item xs={4} sm={4} md={2} lg={2}>
                      <div className="advantageIconLeft">
                        <img
                          className="rupees"
                          src={strongOnlinePresence}
                          alt=""
                        />
                      </div>
                    </Grid>
                    <Grid item xs={8} sm={8} md={10} lg={10}>
                      <h3 className={mobileHeading}>
                        Online Demand Generation
                        <br />& BTL Activities
                      </h3>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid
                    style={{ marginBottom: "5%" }}
                    xs={12}
                    sm={12}
                    direction="row"
                    component="div"
                  >
                    <div style={{ display: "flex" }}>
                      <>
                        <div className="mobileAdvantageIconLeft">
                          <img
                            height="35"
                            style={{ marginTop: "25%" }}
                            src={strongOnlinePresence}
                          />
                        </div>

                        <img className="redLine" src={advantageIcon} alt="" />
                      </>
                    </div>

                    <div
                      style={{
                        textAlign: "center",
                        fontSize: "12.5px",
                        fontWeight: "bold",
                      }}
                    >
                      <p className={mobileHeading}>
                        Online Demand Generation
                        <br />& BTL Activities
                      </p>
                    </div>
                  </Grid>
                )}

                {matches ? (
                  <Grid
                    container
                    component="div"
                    direction="row"
                    className="advantage1"
                  >
                    <Grid item xs={8} sm={8} md={10} lg={10}>
                      <h3 className={mobileHeading}>
                        Tools and Technologies for
                        <br />
                        Business Efficiency
                      </h3>
                    </Grid>
                    <Grid item xs={4} sm={4} md={2} lg={2} className="icon">
                      <div className="advantageIconRight">
                        <img
                          className="rupees"
                          src={strongOnlinePresence}
                          alt=""
                        />
                      </div>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container component="div" direction="column">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "20%",
                      }}
                    >
                      <img src={rightRedLine} className="redLine" alt="" />
                      <div className="mobileAdvantageIconRight">
                        <img
                          style={{ marginTop: "20%" }}
                          height="40"
                          width="40"
                          src={strongOnlinePresence}
                          alt=""
                        />
                      </div>
                    </div>

                    <p className={mobileHeading}>
                      Tools and Technologies for
                      <br />
                      Business Efficiency
                    </p>
                  </Grid>
                )}

                {matches ? (
                  <Grid
                    container
                    component="div"
                    direction="row"
                    className="advantage"
                  >
                    <Grid item xs={4} sm={4} md={2} lg={2}>
                      <div className="advantageIconLeft">
                        <img
                          className="rupees"
                          src={strongOnlinePresence}
                          alt=""
                        />
                      </div>
                    </Grid>
                    <Grid item xs={8} sm={8} md={10} lg={10}>
                      <h3 className={mobileHeading}>
                        Qualified Team & Dedicated
                        <br />
                        Call Center
                      </h3>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container component="div" direction="column">
                   
                    <div style={{display:'flex',flexDirection:'row'}}>

                          <div className="mobileAdvantageIconLeft">
                            <img
                              style={{ marginTop: "20%" }}
                              height="40"
                              width="40"
                              src={strongOnlinePresence}
                              alt=""
                            />
                          </div>
                          <img src={advantageIcon} className="redLine" alt=""/>
                    </div>
                  
                    <p className={mobileHeading}>
                      Qualified Team & Dedicated
                      <br />
                      Call Center
                    </p>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <StoreSection />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default BecomeFranchiseOwner;
