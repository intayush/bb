import React, { useEffect } from "react";
// import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";
import SellingProcess from "../SellingProcess/SellingProcess";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import blackHeadingLines from "../../assets/black-heading-lines.svg";
import missionIcon from "../../assets/Mission-Icon.svg";
import visionIcon from "../../assets/Vision-Icon.svg";
import VehicleAdvantage from "../../Components/VehicleAdvantage/VehicleAdvantage";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "#f7f7f7",
  },
  banner: {
    marginTop: theme.spacing(4),
  },
  banner1: {
    marginTop: theme.spacing(1),
  },
  paper: {
    marginBottom: theme.spacing(6),
    boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2) !important",
    padding: theme.spacing(3),
    fontSize: 18,
    letterSpacing: 0.63,
    color: "#000000",
    lineHeight: "28px",
    fontWeight: 500,
  },
  paper2: {
    marginBottom: theme.spacing(1),
    boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2) !important",
    padding: "24px 90px 24px 90px",
    fontSize: 18,
    letterSpacing: 0.63,
    color: "#000000",
    lineHeight: "28px",
    fontWeight: 500,
  },
  paper2Mobile: {
    marginBottom: theme.spacing(5),
    boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2) !important",
    fontSize: 10,
    letterSpacing: 0.63,
    color: "#000000",
    fontWeight: 500,
  },
  redHeading: {
    paddingBottom: 10,
    fontSize: 24,
    fontWeight: 800,
    color: "#ff0000",
  },
  flexEnd: {
    display: "flex",
    justifyContent: "flex-end",
  },
  mTop50: {
    marginTop: 50,
  },
  advantageContainer: {
    width: 1200,
    margin: "40px auto 27px",
    padding: "20px",
  },
  ml50: {
    marginLeft: "50px",
  },
  ml70: {
    marginLeft: "70px",
  },
  fs17: {
    fontSize: "17px",
    textAign: "center",
  },
  center: {
    textAlign: "center",
  },
  mobileRedHeading: {
    paddingBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "#ff0000",
  },
  mobilePaper: {
    marginBottom: theme.spacing(6),
    boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2) !important",
    padding: theme.spacing(3),
    fontSize: 10,
    color: "#000000",
    fontWeight: 500,
  },
}));

const About = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const paper2 = matches ? classes.paper2 : classes.paper2Mobile;
  const ml50 = matches ? "" : classes.ml50;
  const ml70 = matches ? "" : classes.ml70;
  const centerClass = matches ? "" : classes.center;
  const fs17 = matches ? "" : classes.fs17;
  const flexEndClass = matches ? classes.flexEnd : "";

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

  return (
    <div id="About" className={classes.body}>
      {/* <Header /> */}
      <MainMenu />
      <Grid
        container
        component="div"
        direction="row"
        justify="center"
        className={classes.banner}
      >
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <Banner navigation="About" heading="About" text="" />
        </Grid>
      </Grid>
      {matches ? (
        <Grid
          container
          component="div"
          direction="row"
          justify="center"
          className={classes.banner1}
        >
          <Grid item xs={11} sm={11} md={11} lg={11}>
            <Paper className={classes.paper}>
              <h3 className={classes.redHeading + " center-align"}>
                About BikeBazaar
              </h3>
              <div className="center-align">
                <img alt="" src={blackHeadingLines} width="57" height="4" />
              </div>
              BikeBazaar aims to provide a hassle-free experience to anyone
              looking to buy/sell a pre-owned 2 wheeler with the help of
              technology and a team of experts.
              <br />
              <br />
              For the buyer we ensure quality and make the process smooth by
              offering "Free 6 Months' Warranty", "Certified Two-Wheelers",
              "Low-Cost EMI", "Hassle-Free Document Transfer" and more.
              <br />
              <br />
              For the seller, we make the process quick & smooth through "Rich
              Market Place", "Ensuring the transaction is completed within one
              visit" and "Hassle-Free Document Transfer".
              <br />
              <br />
              We are building up a hybrid model (mix of Online & Offline) to
              bring in structure to this domain and ensure a great and
              hassle-free experience for our Customers.
            </Paper>
          </Grid>
          <Grid item xs={11} sm={11} md={11} lg={11}>
            <Paper className={paper2}>
              <Grid container component="div" direction="row" justify="center">
                <Grid item xs={11} sm={11} md={5} lg={5}>
                  <img alt="" src={missionIcon} height="250" className={ml70} />
                </Grid>
                <Grid item xs={11} sm={11} md={7} lg={7}>
                  <h3
                    className={
                      classes.redHeading +
                      " " +
                      classes.mTop50 +
                      " " +
                      centerClass
                    }
                  >
                    Mission
                  </h3>
                  <p className={fs17}>
                    Our mission is to become the most trusted company in the
                    Pre-Owned Two-Wheeler market. We strive to position
                    ourselves as a one-stop destination for buyers and sellers
                    of Pre-Owned Two-Wheelers.
                  </p>
                </Grid>
              </Grid>
              {/* {visionCard} */}
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          component="div"
          direction="row"
          justify="center"
          className={classes.banner1}
        >
          <Grid item xs={11} sm={11} md={11} lg={11}>
            <Paper className={classes.mobilePaper}>
              <h3 className={classes.mobileRedHeading + " center-align"}>
                About BikeBazaar
              </h3>
              <div className="center-align">
                <img alt="" src={blackHeadingLines} width="57" height="4" />
              </div>
              BikeBazaar aims to provide a hassle-free experience to anyone
              looking to buy/sell a pre-owned 2 wheeler with the help of
              technology and a team of experts.
              <br />
              <br />
              For the buyer we ensure quality and make the process smooth by
              offering "Free 6 Months' Warranty", "Certified Two-Wheelers",
              "Low-Cost EMI", "Hassle-Free Document Transfer" and more.
              <br />
              <br />
              For the seller, we make the process quick & smooth through "Rich
              Market Place", "Ensuring the transaction is completed within one
              visit" and "Hassle-Free Document Transfer".
              <br />
              <br />
              We are building up a hybrid model (mix of Online & Offline) to
              bring in structure to this domain and ensure a great and
              hassle-free experience for our Customers.
            </Paper>
          </Grid>

          <Grid item xs={11} sm={11} md={11} lg={11}>
            <Paper className={classes.paper2Mobile}>
              <Grid container component="div" direction="row" justify="center">
                <Grid item xs={11} sm={11} md={5} lg={5}>
                    <div style={{textAlign:'center',width:'100%',fontSize: "15px",fontWeight: "bold",color:'#ff0000'}}>
                        <p>
                        Mission
                        </p>
                    </div>
                  
                  <img
                    alt=""
                    src={missionIcon}
                    height="100"
                    width="100"
                    style={{ marginLeft: "35%" }}
                  />
                </Grid>
                <Grid item xs={11} sm={11} md={7} lg={7}>
                  <p style={{ fontSize: "10px" }}>
                    Our mission is to become the most trusted company in the
                    Pre-Owned Two-Wheeler market. We strive to position
                    ourselves as a one-stop destination for buyers and sellers
                    of Pre-Owned Two-Wheelers.
                  </p>
                </Grid>
              </Grid>
              {/* {visionCard} */}
            </Paper>
          </Grid>
        </Grid>
      )}

      <VehicleAdvantage
        continerStyle={classes.advantageContainer}
        heading="BikeBazaar Brings Great Advantage for Buyers"
      />

      
      <Grid
        container
        component="div"
        direction="row"
        justify="center"
        className={classes.banner1}
      >
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <SellingProcess heading="Selling Process made easy by BikeBazaar" />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default About;
