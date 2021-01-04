import React, { useEffect } from "react";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";
import SellingProcess from "../SellingProcess/SellingProcess";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import blackHeadingLines from "../../assets/black-heading-lines.svg";
import missionIcon from "../../assets/Mission-Icon.svg";
import VehicleAdvantage from "../../Components/VehicleAdvantage/VehicleAdvantage";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import mobiledivider from "../../assets/mobiledivider.png";
import StylingObj from "./MaterialUIStylingObj/MaterialUIStyling";

const useStyles =StylingObj;

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
                <img alt="" src={mobiledivider}  height="4" />
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
