import React, { useEffect } from "react";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import blackHeadingLines from "../../assets/black-heading-lines.svg";
import VehicleAdvantage from "../../Components/VehicleAdvantage/VehicleAdvantage";
import buyIcon from "../../assets/Buy-Icon.svg";
import selectIcon from "../../assets/Select-Icon.svg";
import visitIcon from "../../assets/Visit-BB-Store-Icon.svg";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import mobiledivider from "../../assets/mobiledivider.png";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "#f7f7f7",
  },
  banner: {
    marginTop: theme.spacing(4),
  },
  subContainer: {
    marginTop: 50,
  },
  mobilesubContainer: {
    marginTop: "1%",
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(6),
    boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2) !important",
    padding: theme.spacing(3),
    fontSize: 16,
    letterSpacing: 0.63,
    color: "#000000",
    lineHeight: "28px",
  },
  mobilePaper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(6),
    boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2) !important",
    padding: theme.spacing(3),
    color: "#000000",
  },
  redHeading: {
    paddingBottom: 13,
    fontSize: 24,
    fontWeight: 800,
    color: "#ff0000",
    textAlign: "center",
  },
  readHeadingMobile: {
    paddingBottom: 13,
    fontSize: 15,
    fontWeight: "bold",
    color: "#ff0000",
    textAlign: "center",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 600,
  },
  mobilesubHeading: {
    fontSize: 13,
    fontWeight: "bold",
    display:'flex',
    flexDirection:'column'
  },

  text: {
    fontSize: 16,
  },
  mobileText: {
    fontSize: "9px",
  },
  advantageContainer: {
    width: 1200,
    margin: "40px auto 27px",
    paddingTop: "0px",
  },
  mb100: {
    marginBottom: "100px",
  },
  mobilemb100: {
    marginBottom: "10px",
  },
}));

const HowItWorks = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  let matches = useMediaQuery(theme.breakpoints.up("sm"));

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
    <div id="HowItWorks" className={classes.body}>
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
            navigation="How it Works"
            heading="How it Works"
            text=""
            path={props.location.pathname}
          />
        </Grid>
      </Grid>
      <Grid
        container
        component="div"
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <Paper
            className={
              matches
                ? classes.paper + " center-align"
                : classes.mobilePaper + " center-align"
            }
          >
            <h3
              className={
                matches ? classes.redHeading : classes.readHeadingMobile
              }
            >
              {matches ? (
                <span>Best Way to Buy a Pre-Owned Two-Wheeler</span>
              ) : (
                <p>
                  {" "}
                  Best Way to Buy
                  <br />a Pre-Owned Two-Wheeler
                </p>
              )}
            </h3>
            {matches ? (
              <img alt="" src={blackHeadingLines} width="57" height="4" />
            ) : (
              <img alt="" src={mobiledivider} height="4" />
            )}

            <Grid
              container
              component="div"
              direction="row"
              justify="center"
              className={
                matches ? classes.subContainer : classes.mobilesubContainer
              }
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                className={matches ? classes.mb100 : classes.mobilemb100}
              >
                <div>
                  <h5
                    className={
                      matches ? classes.subHeading : classes.mobilesubHeading
                    }
                  >
                    1. Select
                  </h5>
                  {matches ? (
                    <img src={selectIcon} width={300} alt="" />
                  ) : (
                    <img src={selectIcon} height="150" alt="" />
                  )}
                  {matches ? (
                    <p className={classes.text}>
                      Find any Two-Wheeler using
                      <br />
                      multiple filtering options and Select
                      <br />
                      the most suitable two-wheeler for you from hundreds of
                      options.
                    </p>
                  ) : (
                    <>
                      <br />
                      <p className={classes.mobileText}
                        
                      >
                        Find any Two-Wheeler using  multiple filtering options
                        <br />
                      
                        and Select the most suitable two-wheeler for you from
                        <br /> 
                        hundreds of options.
                      
                       </p>
                    </>
                  )}
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                className={matches ? classes.mb100 : classes.mobilemb100}
              >
                <div>
                  <span className={matches ? classes.subHeading : classes.mobilesubHeading}>
                    2. Visit BikeBazaar Store
                  </span>
                  {matches ? (
                    <img src={visitIcon} width="300" alt="" />
                  ) : (
                    <img src={visitIcon} height="140" alt="" />
                  )}
                  {matches ? (
                  <p className={classes.text}>
                  Visit the nearest BikeBazaar Store
                  <br />
                  to have a look & feel of Two-
                  <br />
                  Wheeler chosen by you. You can inspect it on all parameters.
                </p>) : (
                    <p className={classes.mobileText}>
                    Visit the nearest BikeBazaar Store to have a look & feel
                    <br />
                     of Two-Wheeler chosen by you. You can inspect it on all
                    <br />
                    parameters.
                  </p>
                  )}
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={4}
                className={matches ? classes.mb100 : classes.mobilemb100}
              >
                <div>
                  <h5 className={matches ? classes.subHeading : classes.mobilesubHeading}>3. Buy</h5>
                  {matches ? (
                    <img src={buyIcon} width={300} alt="" />
                  ) : (
                    <img src={buyIcon} height="150" alt="" />
                  )}
                  {matches ? (
                  <p className={classes.text}>
                    After you make your decision about
                    <br />
                    any Two-Wheeler,
                    <br />
                    you can buy the vehicle
                    <br />
                    immediately after submitting your
                    <br />
                    identity details.
                  </p>) : (
                    <p className={classes.mobileText}>
                    After you make your decision about any Two-Wheeler,
                    <br />
                     you can buy the vehicle immediately after
                    <br />
                     submitting your identity details.
                
                    
                  </p>
                  )}
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <VehicleAdvantage continerStyle={classes.advantageContainer} />
      </Grid>
      <Footer />
    </div>
  );
};

export default HowItWorks;
