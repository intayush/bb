import React from "react";
import FooterLogo from "./FooterLogo.svg";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import callIcon from "../../assets/Phone.svg";
import messageIcon from "../../assets/message.png";
import faceBookIcon from "../../assets/facebook-icon.svg";
import twitterIcon from "../../assets/twitter-icon.svg";
import linkedinIcon from "../../assets/linkedin-icon.svg";
import instagramIcon from "../../assets/instagram-icon.svg";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  text: {
    color: "white",
    margin: 0,
  },
  copyright: {
    color: "white",
    marginTop: "20%",
  },
  columnsText: {
    padding: 0,
    margin: 0,
    color: "white",
    marginTop: "3%",
  },
}));

const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div className="footer">
      {matches ? (
        <div className={classes.root}>
          <Grid container>
            <Grid item > 
              <div className="first_col">
                <img src={FooterLogo} height="25" alt="FooterLogo" />
                <p style={{ marginTop: "1%" }} className={classes.text}>
                  BikeBazaar aims to provide a hassle-free experience to
                  <br /> anyone looking to buy/sell a pre-owned 2 wheeler with
                  the <br /> help of technology and a team of experts.
                </p>
                <p className={classes.copyright}>
                  &copy;2019 BikeBazaar.All rights reserved
                </p>
              </div>
            </Grid>
            {/* creating vertical lines */}
            <div
              style={{
                borderRight: "1px solid white",
                height: "120px",
                marginTop: "5%",
                marginRight: "1.5%",
                marginLeft: "1.5%",
              }}
            ></div>
            <Grid item md={5}>
              <p style={{ marginBottom: "4%",marginLeft:"3%" }} className={classes.text}>
                Quick Links
              </p>
              {/* for quick links two columns */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div style={{ display: "flex-start", flexDirection: "column" }}>
                  <p className={classes.columnsText}>About</p>
                  <p className={classes.columnsText}>How it works</p>
                  <p className={classes.columnsText}>FAQs</p>
                  <p className={classes.columnsText}>Privacy Policy</p>
                  <p className={classes.columnsText}>Terms & conditions</p>
                  <p className={classes.columnsText}>Contact Us</p>
                </div>

                <div
                  style={{
                    display: "flex-end",
                    flexDirection: "column",
                    marginLeft: "20%",
                  }}
                >
                  <p className={classes.columnsText}>Buy</p>
                  <p className={classes.columnsText}>Sell</p>
                  <p className={classes.columnsText}>Locate Store</p>
                  <p className={classes.columnsText}>
                    Become a Franchise Owner
                  </p>
                  <p className={classes.columnsText}>Blog</p>
                </div>
              </div>
            </Grid>
            {/* creating vertical lines */}
            <div
              style={{
                borderRight: "1px solid white",
                height: "120px",
                marginTop: "5%",
                marginRight: "1.5%",
                marginLeft: "1.5%",
              }}
            ></div>
            <Grid item md={2}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ marginBottom: "4%" }} className={classes.text}>
                  Contact Info
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    color: "white",
                    marginTop: "3%",
                  }}
                >
                  <img
                    className="icon-img"
                    src={callIcon}
                    width="30"
                    height="25"
                    alt=""
                  />
                  <span style={{ marginLeft: "2%" }}>8956853498</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    color: "white",
                    marginTop: "4%",
                  }}
                >
                  <img className="icon-img" src={messageIcon} alt="" />
                  <span style={{ marginLeft: "4%" }}>
                    connect@bikebazaar.com
                  </span>
                </div>

                <div
                  style={{
                    display: "flex-start",
                    flexDirection: "column",
                    width: "70%",
                    marginTop: "18%",
                    letterSpacing: "1px",
                  }}
                >
                  <p style={{ color: "white" }}>Connect with us</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent:'space-between'
                    }}
                  >
                    <img  src={faceBookIcon} />
                    <img  src={instagramIcon} />
                    <img  src={linkedinIcon} />
                    <img  src={twitterIcon} />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Footer;
