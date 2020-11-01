import React from "react";
import { Link } from "react-router-dom";
import faceBookIcon from "../../assets/facebook-icon.svg";
import twitterIcon from "../../assets/twitter-icon.svg";
import linkedinIcon from "../../assets/linkedin-icon.svg";
import instagramIcon from "../../assets/instagram-icon.svg";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import FooterLogo from "../../assets/FooterLogo.svg";
import callIcon from "../../assets/Phone.svg";
import messageIcon from "../../assets/message.png";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import "./Footer.css";

const Footer = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className="footer">
      {matches ? (
        <div style={{ display: "flex", flexDirection: "row" }} class="row">
          <div
            style={{
              display: "flex-start",
              flexDirection: "column",
              justifyContent: "center",
            }}
            class="col s12 m4 l4"
          >
            <img height="25" src={FooterLogo} alt="footerLogo" />
            <p className="text">
              BikeBazaar aims to provide a hassle-free experience to anyone
              looking to buy/sell a pre-owned 2 wheeler with the help of
              technology and a team of experts.
            </p>

            <Link to="/copyright"><p style={{ marginTop: "20%" }} className="text">
              &copy; BikeBazaar.All rights reserved
            </p></Link>
          </div>
          <div
            style={{
              height: "150px",
              width: "5%",
              borderRight: "1px solid white",
              marginTop: "5%",
              marginRight: "5%",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            class="col s12 m4 l4"
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="text">Quick Links</p>
             <Link to="/about" className="links"><span className="text">About</span></Link> 
             <Link to="/howitworks" className="links">  <span className="text">How it works</span></Link>
              <Link to="/faq" className="links"> <span className="text">FAQs</span></Link>
              <Link to="/privacypolicy" className="links"><span className="text">Privacy Policy</span></Link>
                <Link to="/termsandcondition" className="links">  <span className="text">Terms & Conditions</span></Link>
              <Link to="/contact" className="links">  <span className="text">Contact Us</span></Link>
             
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "12%",
              }}
            >
             <Link className="links" to=""><span className="text">Buy</span></Link> 
             <Link className="links" to="/sell"><span className="text">Sell</span></Link>  
             <Link className="links"  to="/vehicledetails/locate-store"><span className="text">Locate Store</span></Link> 
             <Link className="links" to="/becomefranchiseowner"><span className="text">Become a Franchise-Owner</span></Link> 
             <Link className="links" to=""><span className="text">Blog</span></Link>  
            </div>
          </div>
          <div
            style={{
              height: "150px",
              width: "5%",
              borderRight: "1px solid white",
              marginTop: "5%",
              marginRight: "5%",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            className="col s12 m4 l4 "
          >
            <span style={{ alignContent: "center",marginBottom:'12%' }} className="text">
              Contact Info
            </span>
            <span className="text">
              <img
                style={{ marginRight: "5px" }}
                height="25"
                src={callIcon}
                alt="callIcon"
              />
              8956853498
            </span>

            <span style={{ alignContent: "center" }} className="text">
              <img
                style={{ marginRight: "5px" }}
                height="25"
                src={messageIcon}
                alt="messageIcon"
              />
              connect@bikebazaar.com
            </span>
            <span className="text">Connect with us</span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "40%",
              }}
            >
              <a href="https://www.facebook.com/BikeBazaaar">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/bikebazaaar/">
                <InstagramIcon />
              </a>
              <a href="https://www.linkedin.com/company/bikebazaar">
                <LinkedInIcon />
              </a>
              <a href="https://twitter.com/BikeBazaaar">
                <TwitterIcon />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ flexDirection: "column", display: "flex" }}>
          <div
            style={{ flexDirection: "column", display: "flex-start" ,marginTop:"2%"}}
            class="col s12"
          >
            <img src={FooterLogo} alt="FooterLogo" height="25" />
            <p className="text">
              BikeBazaar aims to provide a hassle-free experience to anyone
              looking to buy/sell a pre-owned 2 wheeler with the help of
              technology and a team of experts.
            </p>
          </div>
          <hr className="horizontal" />
          <div
            style={{
              display: "flex-start",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            class="col s12 m4 l4"
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="text">Quick Links</p>
              <Link className="links" to="/about"><span className="text">About</span></Link>
              <Link className="links" to="/howitworks"><span className="text">How it works</span></Link>
              <Link className="links" to="/faq"><span className="text">FAQs</span></Link>
              <Link className="links" to="/privacypolicy"><span className="text">Privacy Policy</span></Link> 
              <Link className="links" to="/termsandconditions"><span className="text">Terms & Conditions</span></Link>
              <Link className="links" to="/contact"><span className="text">Contact Us</span></Link>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10%",
              }}
            >
             <Link className="links" to=""><span className="text">Buy</span></Link> 
             <Link className="links" to="/sell"><span className="text">Sell</span></Link> 
             <Link className="links" to="/locatestore"><span className="text">Locate Store</span></Link> 
             <Link className="links"  to="/vehicledetails/locate-store"><span className="text">Become a Franchise Owner</span></Link> 
             <Link className="links" to="/becomefranchiseowner"><span className="text">Blog</span></Link> 
            </div>
          </div>
          <hr className="horizontal" />
          <div
            style={{
              display: "flex-start",
              flexDirection: "column",
              justifyContent: "center",
            }}
            className="col s12 "
          >
            <span style={{ alignContent: "center" }} className="text">
              Contact Info
            </span>
            <br />
            <div style={{ marginTop: "2%"}} className="text">
              <img
                style={{ marginRight: "5px" }}
                height="25"
                src={callIcon}
                alt="callIcon"
              />
             <span>8956853498</span> 
            </div>

            <div
              style={{ display: "flex-start", flexDirection: "row" }}
              className="text"
            >
              <img
                style={{ marginRight: "5px" }}
                height="25"
                src={messageIcon}
                alt="messageIcon"
              />
              <span> connect@bikebazaar.com </span>
            </div>
            <br />
            <span className="text">Connect with us</span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "40%",
              }}
            >
              <a href="https://www.facebook.com/BikeBazaaar">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/bikebazaaar/">
                <InstagramIcon />
              </a>
              <a href="https://www.linkedin.com/company/bikebazaar">
                <LinkedInIcon />
              </a>
              <a href="https://twitter.com/BikeBazaaar">
                <TwitterIcon />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
