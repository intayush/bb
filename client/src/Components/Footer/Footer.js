import React from "react";
import FooterLogo from "../../assets/footerLogo.svg";
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
import {Link} from "react-router-dom";
import {CHANGE_CATEGORY} from "../../store/actions/actionTypes";
import {useDispatch} from "react-redux";
import "./Footer.css";


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
    marginTop: "18%",
  },
  columnsText: {
    padding: 0,
    margin: 0,
    color: "white",
    marginTop: "4%",
  },
  columnsText1: {
    padding: 0,
    margin: 0,
    color: "white",
    marginTop: "6%",
  },
  iconImg: {
    width: "100%",
  },
}));

const Footer = ({props}) => {

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch=useDispatch();
  const footerCss=matches?"footer":"mobilefooter";

  return (
    <div className={footerCss}>
      {matches ? (
        <div className={classes.root}>
          <Grid container>
            <Grid item md={4}>
              <div className="first_col">
                <img src={FooterLogo} height="25" alt="FooterLogo" />
                <p style={{ marginTop: "5%" }} className={classes.text}>
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
              className="verticalLine"
            ></div>
            <Grid item md={4}>
              <div style={{display:'flex',flexDirection:'column'}}>
              <div>
                  <p
                    style={{ marginBottom: "4%", marginLeft: "8%" }}
                    className={classes.text}
                  >
                    Quick Links
                  </p>
              </div>

              {/* for quick links two columns */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    display: "flex-start",
                    flexDirection: "column",
                    flexFlow: "column",
                  }}
                >
                  <p className={classes.columnsText1}><Link style={{letterSpacing:'0px'}} to="/about">About</Link></p>
                  <p className={classes.columnsText1}><Link style={{letterSpacing:'0px'}}to="/howitworks">How it works</Link></p>
                  <p className={classes.columnsText1}><Link style={{letterSpacing:'0px'}}to="/faq">FAQs</Link></p>
                  <p className={classes.columnsText1}><Link style={{letterSpacing:'0px'}}to="//privacypolicy">Privacy Policy</Link></p>
                  <p className={classes.columnsText1}><Link style={{letterSpacing:'0px'}}to="/termsandconditions">Terms & conditions</Link></p>
                  <p className={classes.columnsText1}><Link style={{letterSpacing:'0px'}}to="/contact">Contact Us</Link></p>
                </div>

                <div
                  style={{
                    display: "flex-end",
                    flexDirection: "column",
                    flexFlow: "column",
                  }}
                >
                  <p className={classes.columnsText}><Link style={{letterSpacing:'0px'}}to="/category/bike">Buy</Link></p>
                  <p className={classes.columnsText}><Link style={{letterSpacing:'0px'}}to="/sell">Sell</Link></p>
                  <p className={classes.columnsText}><Link style={{letterSpacing:'0px'}}to="/vehicledetails/locate-store">Locate Store</Link></p>
                  <p className={classes.columnsText}><Link style={{letterSpacing:'0px'}}to="/becomefranchiseowner"> Become a Franchise Owner</Link>

                  </p>
                
                </div>
              </div>
              </div>

            </Grid>
            {/* creating vertical lines */}
            <div
              className="verticalLineRight"
            ></div>

            <Grid item>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "14%",
                }}
              >
                <p style={{ marginBottom: "4%" }} className={classes.text}>
                  Contact Info
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    color: "white",
                    marginTop: "8%",
                  }}
                >
                  <img
                    style={{ marginLeft: "1%" }}
                    className="icon-img"
                    src={callIcon}
                    width="25"
                    height="30"
                    alt=""
                  />
                  <span style={{ marginLeft: "2%" }}>8956853498</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    color: "white",
                    marginTop: "8%",

                    justifyContent: "space-between",
                  }}
                >
                  <img
                    style={{
                      marginLeft: "1%",

                    }}
                    className="iconImg"
                    src={messageIcon}
                    height="20"
                    width="25"
                    alt=""
                  />
                  <span style={{ marginLeft: "8%" }}>
                    connect@bikebazaar.com
                  </span>
                </div>

                <div
                  style={{
                    display: "flex-start",
                    flexDirection: "column",
                    marginTop: "20%",
                    wordSpacing: "3.5px",
                    letterSpacing: "2px",
                  }}
                >
                  <p style={{ color: "white" ,fontSize:'15px'}}>Connect with us</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "85%",
                      fontWeight: "500",
                      marginTop: "3%",
                    }}
                  >
                    <img src={faceBookIcon} />
                    <img
                      style={{ marginLeft: "2%", cursor: "pointer" }}
                      src={instagramIcon}
                    />
                    <img
                      style={{ marginLeft: "2%", cursor: "pointer" }}
                      src={linkedinIcon}
                    />
                    <img
                      style={{ marginLeft: "2%", cursor: "pointer" }}
                      src={twitterIcon}
                    />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div style={{width:"100%"}}>
          <img src={FooterLogo} height="25" alt="" />
          <p style={{ fontSize: "10px", color: "white" , lineHeight: '1.3'}}>
            BikeBazaar aims to provide a hassle-free experience to anyone
            looking to buy/sell a pre-owned 2 wheeler with the help of
            technology and a team of experts.
          </p>
          <p style={{ color: "white" ,fontSize:'10px'}}>
            © 2019 BikeBazaar. All rights reserved.
          </p>

          <span
            style={{
              color: "white",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            Quick Links
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop:'1%'
            }}
          >
            <div style={{ display: "flex-start", flexDirection: "column" ,width:'40%'}}>
                  <span style={{ fontSize:'10px ' }}><Link style={{color:'white',letterSpacing:'0px'}} to="/about">About</Link></span><br/>
                  <span style={{fontSize:'10px ' }}><Link style={{color:'white',letterSpacing:'0px'}} to="/howitworks">How it works</Link></span><br/>
                  <span style={{ fontSize:'10px '}}><Link style={{color:'white',letterSpacing:'0px'}} to="/faq">FAQs</Link></span><br/>
                  <span style={{ fontSize:'10px '}}><Link style={{color:'white',letterSpacing:'0px'}} to="/privacypolicy">Privacy Policy</Link></span><br/>
                  <span style={{fontSize:'10px ' }}><Link style={{color:'white',letterSpacing:'0px'}} to="/termsandconditions">Terms & Conditions</Link></span><br/>
                  <span style={{ fontSize:'10px '}}><Link style={{color:'white',letterSpacing:'0px'}} to="/contact">Contact Us</Link></span>
            </div>
            <div style={{ display: "flex-start", flexDirection: "column" ,marginLeft:'20%'}}>
                  <span  style={{ fontSize:'10px ',color:'white'}}> <Link style={{letterSpacing:'0px',color:'white'}}to="/category/bike">Buy</Link></span><br/>
                  <span style={{ fontSize:'10px '}}><Link style={{color:'white',letterSpacing:'0px'}} to="/sell">Sell</Link></span><br/>
                  <span style={{fontSize:'10px '}}><Link style={{color:'white',letterSpacing:'0px'}} to="/vehicledetails/locate-store">Locate Store</Link></span><br/>
                  <span style={{ fontSize:'10px '}}><Link style={{color:'white',letterSpacing:'0px'}} to="/becomefranchiseowner">Become a Franchise Owner</Link></span><br/>
                 
            </div>
          </div>
          <hr style={{ marginTop: "3%", marginBottom: "3%" }} />
          <span style={{ color: "white",fontWeight:'600' }}>Contact Info</span>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              color: "white",
              marginTop: "1%",
            }}
          >
            <img
              style={{ marginLeft: "1%" }}
              className="icon-img"
              src={callIcon}
              width="18"
              height="14"
              alt=""
            />
            <span style={{ marginLeft: "1%",fontSize:'13px' }}>8956853498</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              color: "white",
              marginTop: "2%",
            }}
          >
            <img
              style={{
                marginLeft: "1%",
              }}
              src={messageIcon}
              height="14"
              width="18"
              alt=""
            />
            <span style={{ marginLeft: "4%",fontSize:'13px' }}>connect@bikebazaar.com</span>
          </div>
          <div
            style={{
              display: "flex-start",
              flexDirection: "column",
              marginTop: "8%",
              wordSpacing: "3.5px",
              marginBottom:"30px",
              
            }}
          >
            <p style={{ color: "white" ,fontWeight:'600'}}>Connect with us</p>
            <div
              style={{
                display: "flex-start",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "70%",
                fontWeight: "500",
                marginTop: "1%",
              }}
            >
              <img src={faceBookIcon} style={{height:'13px',width:'16px'}} />
              <img
                style={{ marginLeft: "8%", cursor: "pointer",height:'13px',width:'16px' }}
                src={instagramIcon}
              />
              <img
                style={{ marginLeft: "10%", cursor: "pointer",height:'13px',width:'16px' }}
                src={linkedinIcon}
              />
              <img
                 style={{ marginLeft: "10%", cursor: "pointer",height:'13px',width:'16px' }}
                src={twitterIcon}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Footer;
