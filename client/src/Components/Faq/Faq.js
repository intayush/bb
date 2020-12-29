import React, { useEffect, useState } from "react";
import "./Faq.css";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import faqPageIcon from "../../assets/faqPageIcon.svg";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "#f7f7f7",
  },
  banner: {
    marginTop: theme.spacing(5),
  },
  paper: {
    margin: theme.spacing(3, 0),
    padding: theme.spacing(3),
  },
  mobilepaper: {
    padding: "20px 16px 26px",
  },
  faqHeading: {
    fontSize: 24,
    letterSpacing: 0.65,
    color: "#ff0000",
    fontWeight: 600,
  },
  faqSteps: {
    fontSize: 18,
    letterSpacing: 0.53,
    color: "#000000",
    marginBottom: 30,
  },
  faqQuestion: {
    fontSize: 18,
    color: "#000000",
    letterSpacing: 0.53,
    fontWeight: 600,
    padding:'0px !important'
  },
  collapsible: {
    "& .MuiExpansionPanelDetails-root": {
      fontSize: 17,
      letterSpacing: 0.53,
      padding:'0px'
    },
  },

  expansionPaddingZero:{
    padding:"0px !important"
  }
}));

const Faq = (props) => {
  const [showImage, setshowImage] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();

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
    <>
      {matches ? (
        <div id="faq" className={classes.body}>
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
              <Banner
                navigation="FAQs"
                heading="Frequently Asked Questions"
                text=""
              />
            </Grid>
          </Grid>
          <Grid container component="div" direction="row" justify="center">
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper className={classes.paper}>
                <h5 id="faqHeading" className={classes.faqHeading}>
                  How do I select a suitable two-wheeler for myself?
                </h5>
                <p className={classes.faqSteps}>
                  Step 1: Select the category of the two-wheeler you want to buy
                  out of Motorcycles, Scooters and High-End Motorcycles
                </p>
                <p className={classes.faqSteps}>
                  Step 2: Use the filter for City, Manufacturing Year, Budget,
                  Brand and KMs driven for the chosen category of the
                  two-wheeler.
                </p>
                <p className={classes.faqSteps}>
                  Step 3: You will be shown multiple options to select from for
                  the two-wheeler you want to buy, select any of them to see
                  further.
                </p>

                <ExpansionPanel
                  style={{ border: "none" }}
                  className={classes.collapsible}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    className={classes.faqQuestion}
                  >
                    I want to see two-wheeler nearest to my location how do I do
                    it?
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    After selecting the two-wheeler category, you can use the
                    “Sort By” option to see the two-wheelers nearest to your
                    location.
                    <br />
                    <br />
                    Another way to see two-wheeler nearest to your location is
                    by using the “Locate Store” feature, through which you can
                    find out the BikeBazaar store nearest to your location.
                  </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel className={classes.collapsible}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    className={classes.faqQuestion}
                  >
                    I liked one of the listed Bike and want to see it, what
                    should I do next?
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    When you like any two-wheeler, you just need to share your
                    details (Name, Mobile Number & Email ID) and BikeBazaar will
                    help you with all the details related to the location of the
                    BikeBazaar store.
                    <br />
                    <br />
                    You can visit the store and have a look at the bike and
                    inspect it on all the parameters crucial for you.
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.collapsible}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    className={classes.faqQuestion}
                  >
                    How can I be assured of the vehicle's quality? What if I see
                    some issue in the bike after purchasing?
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    All the bikes available at BikeBazaar store goes through a
                    thorough inspection by auto experts.
                    <br />
                    <br />
                    Then it goes through a thorough refurbishment process and
                    all the issues are resolved.
                    <br />
                    <br />
                    So, when a bike is displayed for sale through BikeBazaar
                    store, it’s free of any issues and you can be assured of its
                    quality.
                    <br />
                    <br />
                    All the vehicles are also covered with "Buyer protection"
                    (Any unforeseen issue in a week’s time is resolved for Free)
                    and "Free 6 Months' Warranty" (warranty on Engine &
                    Transmission, extendable up-to 1 Year).
                    <br />
                    <br />
                    So, you can buy the vehicle at "Zero Risk" from BikeBazaar
                    stores.
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.collapsible}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    className={classes.faqQuestion}
                  >
                    I like the bike but, have some financial issues which are
                    stopping me from purchasing the bike right now. Can you help
                    me with this?
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    Nothing can stop you from buying your dream bike, not even
                    financial issues.
                    <br />
                    <br />
                    BikeBazaar provides financial assistance to you through
                    which you can purchase your dream bike at EMI starting at as
                    low as ₹2000*.
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.collapsible}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    className={classes.faqQuestion}
                  >
                    How can I buy the bike at low cost EMI?
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    If you want to avail the facility of low-cost EMI for the
                    dream bike you want to purchase then you just need to show
                    the interest in taking the loan by clicking on the checkbox
                    “Interested in taking a loan”, while sharing your details.
                    <br />
                    <br />
                    Our team will help you in taking the loan with low-cost EMI
                    even if you don’t purchase the bike from the BikeBazaar
                    store and buy it from somewhere else.
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.collapsible}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    className={classes.faqQuestion}
                  >
                    I have decided to buy a bike but, have some doubts about
                    document transfer... Will it be Hassle-free?
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    Hassle-free document transfer is one of the biggest
                    advantages of buying the used two-wheeler form BikeBazaar
                    store.
                    <br />
                    <br />
                    We make all the efforts in making the process of transfer of
                    ownership very smooth for both buyer and seller.
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Paper>
            </Grid>
          </Grid>
          <Footer />
        </div>
      ) : (
        <div id="faq" className={classes.body}>
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
              <Banner
                navigation="FAQs"
                heading="Frequently Asked Questions"
                text=""
              />
            </Grid>
          </Grid>
          <Grid container component="div" direction="row" justify="center">
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Paper elevation={3} className={classes.mobilepaper}>
                <img
                  style={{ marginLeft: "20%" }}
                  height="165"
                  width="165"
                  src={faqPageIcon}
                  alt=""
                />
                <ExpansionPanel
                  defaultExpanded
                  style={{ border: "none" }}
                  className={classes.collapsible }
                  
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon style={{ width: "20px" }} />}
                    aria-controls="panel1a-content"
                    className={classes.faqQuestion}
                    style={{
                      color: "#ff0000",
                      fontSize: "12px",
                      fontWeight: "bold",
                      letterSpacing: "0px",
                    }}
                  >
                    How do I select a suitable two-wheeler for myself?
                  </ExpansionPanelSummary>

                  <ExpansionPanelDetails>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "-5%",
                      }}
                    >
                      <span style={{ fontSize: "10px" }}>
                        Step 1: Select the category of the two-wheeler you want
                        to buy out of Motorcycles, Scooters and High-End
                        Motorcycles
                      </span>
                      <span style={{ fontSize: "10px", marginTop: "3%" }}>
                        Step 2: Use the filter for City, Manufacturing Year,
                        Budget, Brand and KMs driven for the chosen category of
                        the two-wheeler.
                      </span>
                      <span style={{ fontSize: "10px", marginTop: "3%" }}>
                        Step 3: You will be shown multiple options to select
                        from for the two-wheeler you want to buy, select any of
                        them to see further.
                      </span>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel className={classes.collapsible}>
                  <ExpansionPanelSummary
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      letterSpacing: "0px",
                    }}
                    expandIcon={<ExpandMoreIcon style={{ width: "20px" }} />}
                    aria-controls="panel1a-content"
                    className={classes.faqQuestion}
                  >
                    I want to see two-wheeler nearest to my location how do I do
                    it?
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{ fontSize: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "-5%",
                      }}
                    >
                       After selecting the two-wheeler category, you can use the
                    “Sort By” option to see the two-wheelers nearest to your
                    location.
                    <br />
                    <br />
                    Another way to see two-wheeler nearest to your location is
                    by using the “Locate Store” feature, through which you can
                    find out the BikeBazaar store nearest to your location.
                    </div>
                   
                  </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel
                  style={{ border: "none" }}
                  className={classes.collapsible}
                >
                  <ExpansionPanelSummary
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      letterSpacing: "0px",
                    }}
                    expandIcon={<ExpandMoreIcon style={{ width: "20px" }} />}
                    aria-controls="panel1a-content"
                    className={classes.faqQuestion}
                  >
                    I liked one of the listed Bike and want to see it, what
                    should I do next?
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{ fontSize: "10px" }}>
                  <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "-5%",
                      }}
                    >
                    When you like any two-wheeler, you just need to share your
                    details (Name, Mobile Number & Email ID) and BikeBazaar will
                    help you with all the details related to the location of the
                    BikeBazaar store.
                    <br />
                    <br />
                    You can visit the store and have a look at the bike and
                    inspect it on all the parameters crucial for you.
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.collapsible}>
                  <ExpansionPanelSummary
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      letterSpacing: "0px",
                    }}
                    expandIcon={<ExpandMoreIcon style={{ width: "20px" }} />}
                    aria-controls="panel1a-content"
                    className={classes.faqQuestion}
                  >
                    How can I be assured of the vehicle's quality? What if I see
                    some issue in the bike after purchasing?
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{ fontSize: "10px" }}>
                  <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "-5%",
                      }}
                    >
                       All the bikes available at BikeBazaar store goes through a
                    thorough inspection by auto experts.
                    <br />
                    <br />
                    Then it goes through a thorough refurbishment process and
                    all the issues are resolved.
                    <br />
                    <br />
                    So, when a bike is displayed for sale through BikeBazaar
                    store, it’s free of any issues and you can be assured of its
                    quality.
                    <br />
                    <br />
                    All the vehicles are also covered with "Buyer protection"
                    (Any unforeseen issue in a week’s time is resolved for Free)
                    and "Free 6 Months' Warranty" (warranty on Engine &
                    Transmission, extendable up-to 1 Year).
                    <br />
                    <br />
                    So, you can buy the vehicle at "Zero Risk" from BikeBazaar
                    stores.
                      </div>
                   
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    letterSpacing: "0px",
                    border: "none",
                  }}
                  className={classes.collapsible}
                >
                  <ExpansionPanelSummary
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      letterSpacing: "0px",
                    }}
                    expandIcon={<ExpandMoreIcon style={{ width: "20px" }} />}
                    aria-controls="panel1a-content"
                    className={classes.faqQuestion}
                  >
                    I like the bike but, have some financial issues which are
                    stopping me from purchasing the bike right now. Can you help
                    me with this?
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{ fontSize: "10px" }}>
                  <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "-5%",
                        fontWeight:"100"
                      }}
                    >
                    Nothing can stop you from buying your dream bike, not even
                    financial issues.
                    <br />
                    <br />
                    BikeBazaar provides financial assistance to you through
                    which you can purchase your dream bike at EMI starting at as
                    low as ₹2000*.
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.collapsible}>
                  <ExpansionPanelSummary
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      letterSpacing: "0px",
                    }}
                    expandIcon={<ExpandMoreIcon style={{ width: "20px" }} />}
                    aria-controls="panel1a-content"
                    className={classes.faqQuestion}
                  >
                    How can I buy the bike at low cost EMI?
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{ fontSize: "10px" }}>
                  <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "-5%",
                      }}
                    >
                    If you want to avail the facility of low-cost EMI for the
                    dream bike you want to purchase then you just need to show
                    the interest in taking the loan by clicking on the checkbox
                    “Interested in taking a loan”, while sharing your details.
                    <br />
                    <br />
                    Our team will help you in taking the loan with low-cost EMI
                    even if you don’t purchase the bike from the BikeBazaar
                    store and buy it from somewhere else.
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.collapsible}>
                  <ExpansionPanelSummary
                    style={{
                      fontSize: "11px",
                      fontWeight: "bold",
                      letterSpacing: "0px",
                    }}
                    expandIcon={<ExpandMoreIcon style={{ width: "20px" }} />}
                    aria-controls="panel1a-content"
                    className={classes.faqQuestion}
                  >
                    I have decided to buy a bike but, have some doubts about
                    document transfer... Will it be Hassle-free?
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{ fontSize: "10px" }}>
                  <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "-5%",
                      }}
                    >
                    Hassle-free document transfer is one of the biggest
                    advantages of buying the used two-wheeler form BikeBazaar
                    store.
                    <br />
                    <br />
                    We make all the efforts in making the process of transfer of
                    ownership very smooth for both buyer and seller.
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Paper>
            </Grid>
          </Grid>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Faq;
