import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import headingLines from "../../assets/heading-lines.svg";
import hfdt from "../../assets/hfdt.svg";
import rp from "../../assets/rp.svg";
import syv from "../../assets/syv.svg";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import mobiledivider from "../../assets/mobiledivider.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2) !important",
    padding: theme.spacing(2),
    fontSize: 16,
    letterSpacing: 0.63,
    color: "#000000",
    lineHeight: "28px",
  },
  heading: {
    color: "#232c2b",
    fontSize: 24,
    fontWeight: 800,
    lineHeight: "55px",
    // paddingBottom: 7
  },
  container: {
    marginTop: 30,
  },
  mobileContainer:{
    marginTop:'1%'
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: "1.5em",
  },
  text: {
    fontSize: 15,
    lineHeight: "1.5em",
  },
  mobileSubHeading:{
    fontSize: 13,
    fontWeight: "bold",
    
  },
  mobileText:{
    fontSize: 10,
    color: "#232b2b"
  },
  mobileHeading:{
    fontWeight: "bold",
    fontSize: "15px",
    textAlign: "center",
    fontStretch: "normal",
   lineHeight: "normal",
   letterSpacing: "normal",
   textAlign: "center"
  },
  mobilePaper:{
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2) !important",
    padding: theme.spacing(2),
    fontSize: 16,
    color: "#000000",
  
  }
}));

const SellingProcess = (props) => {
  const theme=useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  return (
    <div id="SellingProcess">
      <Paper className={matches?(classes.paper + " center-align"):(classes.mobilePaper + " center-align")}>
        {matches?  <h3 className={classes.heading}>{props.heading}</h3>:
           <p
            className={classes.mobileHeading}
         >
           {props.heading}
         </p>
        }
      
      {matches?<img alt="" src={headingLines} width="57" height="4" />:<img src={mobiledivider} height="4"/>}  
        <Grid
          container
          component="div"
          direction="row"
          justify="center"
          className={matches?classes.container:classes.mobileContainer}
        >
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <img src={rp} width={145} alt="" />
            <div>
              <h5 className={matches?classes.subHeading:classes.mobileSubHeading}>
                Get Right Price
                <br />
                for your Vehicle
              </h5>
              <p className={matches?classes.text:classes.mobileText}>
                For any of your two-wheeler,
                <br />
                you get the right market price
              </p>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <img src={syv} width={145} alt="" />
            <div>
              <h5 className={matches?classes.subHeading:classes.mobileSubHeading}>
                Sell your Vehicle
                <br />
                in "1 Visit"
              </h5>

              {matches?<p className={classes.text}>
                Any two-wheeler can be sold
                <br />
                to us just in one visit.
                <br />
                Now encash your two-wheeler
                <br />
                within few hours
              </p>:<p className={classes.mobileText}> Any two-wheeler can be sold
      
                to us just in one visit.
                <br />
                Now encash your two-wheeler
         
                within few hours</p>}


            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <img src={hfdt} width={145} alt="" />
            <div>
              <h5 className={matches?classes.subHeading:classes.mobileSubHeading}>
                Hassle Free
                <br />
                Document Transfer
              </h5>
              <p className={matches?classes.text:classes.mobileText}>
                Document transfer is facilitated and
                <br />
                made easy for buyer and seller
              </p>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default SellingProcess;
