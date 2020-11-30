import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Homepage.css";
// import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import logo from "../../assets/logo.svg";
import bikeGIF from "../../assets/Motorcycle-GIF.gif";
import scooterGIF from "../../assets/Scooter-GIF.gif";
import highEndBikeGIF from "../../assets/High-End-Motorcycle-GIF.gif";
import bannerImg from "../../assets/banner.png";
import headingLines from "../../assets/heading-lines.svg";
import bikeStill from "../../assets/motorcycle.svg";
import scooterStill from "../../assets/scooter.svg";
import highEndStill from "../../assets/high-end-motorcycle.svg";
import certifiedAutoExperts from "../../assets/certified_by_auto_experts.svg";
import monthWarranty from "../../assets/6_month_warranty.svg";
import buyerProtection from "../../assets/buyer_protection.svg";
import lowCostEmi from "../../assets/low_cost_emi.svg";
import hassleFreeDocTransfer from "../../assets/hassle_free_document_transfer.svg";
import testimonial_hari from "../../assets/Hari_Raj.png";
import testimonial_md from "../../assets/Md_Aquiluzzaman.png";
import testimonial_azhar from "../../assets/Azhar_Mirza.png";
import M from "materialize-css";
import Grid from "@material-ui/core/Grid";
import * as CATEGORY from "../../shared/constants/category";
import { CHANGE_CATEGORY } from "../../store/actions/actionTypes";
// import { HOMEPAGE_LOAD } from "../../store/actions/actionTypes"
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const Homepage = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [bikeHover, setBikeHover] = useState(false);
  const [scooterHover, setScooterHover] = useState(false);
  const [highEndBikeHover, setHighEndBikeHover] = useState(false);
  const updateState = (event) => {
    setSearchTerm(event.target.value);
  };
  const [sliderState, changeSlider] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryClick = (category) => {
    let category_id = 0;
    if (category === "bike") category_id = 1;
    else if (category === "scooter") category_id = 2;
    else category_id = 3;
    dispatch({ type: CHANGE_CATEGORY, payload: category_id });
    props.history.push("/category/" + category);
  };

  const initCar = (direction) => {
    if (sliderState == null) {
      var instance;
      const testimonialMessages = [
        {
          name: "Hari Raj",
          message:
            "If anyone is looking for a pre owned bikes/scooty then bike bazaar is the right place to go... Awesome experience from team bike bazaar... Especially Subhojit and sandeep helped me a lot to find out the best vehicle which i was exactly looking for...i will always recommend bike bazaar..thankyou team.",
        },
        {
          name: "Md Aquiluzzaman",
          message:
            "Wonderful experience from Bike Bazaar. All paper work done in front of me. Transparency at it's peak. Condition of the bike is absolutely fabulous. Also available at EMI which is quite impossible but Bike Bazaar did it. Also delivered the bike in one day. Absolutely beautiful experience. Recommend Bike Bazaar to everyone, they won't ever disappoint. I bet. Go for it.",
        },
        {
          name: "Azhar Mirza",
          message:
            "Selling a pre-owned bikes is an extensive and uncertain process. One is never sure of their bike's real market value. Listing online leads to more time consumption, multiple calls, random meetings, price haggling etc. BikeBazaar makes selling a bike an easy, fair and quick experience.it offer an efficient and reliable way to bike owners to sell their bikes at the best price.",
        },
      ];
      let carouselOptions = {
        shift: -150,
        padding: 600,
        dist: -200,
        onCycleTo: function (data) {
          let index = data.getAttribute("index");
          let message = testimonialMessages[index].message;
          let name = testimonialMessages[index].name;
          document.querySelector("#clientName").innerText = name;
          document.querySelector("#testimonialMessage").innerText = message;
        },
      };
      let testimonialCarousel = document.querySelectorAll(".carousel");
      instance = M.Carousel.init(testimonialCarousel, carouselOptions);
      changeSlider(instance);
    } else {
      if (direction === "left") {
        sliderState[0].prev();
      } else {
        sliderState[0].next();
      }
    }
  };

  useEffect(() => {
    let topSlider = document.querySelectorAll(".slider");
    M.Slider.init(topSlider, {});
    initCar();
    //dispatch({ type: HOMEPAGE_LOAD });
  }, []);

  return (
    <div className="App">
      {/* <Header /> */}
      <MainMenu />
      <div className="slider hide-on-small-only">
        <ul className="slides">
          <li>
            <img alt="" src={bannerImg} />
            <div className="caption left-align">
              <h3 className="heading">
                India's Favourite Place to Buy
                <br />
                Pre-owned Two-wheelers
              </h3>
              <h4 className="text-white">
                <img alt="" src={logo} className="tick-icon" />
                <span>
                  <span className="bold">Certified</span> Two-wheeler
                </span>
              </h4>
              <h4 className="text-white">
                <img alt="" src={logo} className="tick-icon" />
                <span>
                  6 Months' <span className="bold">Warranty</span>
                </span>
              </h4>
              <h4 className="text-white">
                <img alt="" src={logo} className="tick-icon" />
                <span>
                  Low Cost <span className="bold">EMI</span>
                </span>
              </h4>
            </div>
          </li>
        </ul>
      </div>
      <div className="section-2">
        {matches ? (
          <>
            <Grid container component="div" direction="row" className="row">
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                lg={12}
                className="center-align section-2-heading"
              >
                <h3>WHAT ARE YOU LOOKING FOR?</h3>
                <img alt="" src={headingLines} width="57" height="4" />
              </Grid>
            </Grid>
            <Grid container component="div" direction="row">
              <Grid item xs={12} sm={12} md={4} lg={4} className="flex-center">
                <div
                  className="box-shadow center-align"
                  onMouseEnter={() => setBikeHover(true)}
                  onMouseLeave={() => setBikeHover(false)}
                  style={{ background: "white" }}
                  onClick={() => handleCategoryClick(CATEGORY.BIKE)}
                >
                  <img
                    alt=""
                    src={bikeHover ? bikeGIF : bikeStill}
                    height="170"
                    width="290"
                  />
                  <h5>Motorcycle</h5>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} className="flex-center">
                <div
                  className="box-shadow center-align"
                  onMouseEnter={() => setScooterHover(true)}
                  onMouseLeave={() => setScooterHover(false)}
                  style={{ background: "white" }}
                  onClick={() => handleCategoryClick(CATEGORY.SCOOTER)}
                >
                  <img
                    alt=""
                    src={scooterHover ? scooterGIF : scooterStill}
                    height="170"
                    width="290"
                  />
                  <h5>Scooter</h5>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} className="flex-center">
                <div
                  className="box-shadow center-align"
                  onMouseEnter={() => setHighEndBikeHover(true)}
                  onMouseLeave={() => setHighEndBikeHover(false)}
                  style={{ background: "white" }}
                  onClick={() => handleCategoryClick(CATEGORY.HIGH_END_BIKE)}
                >
                  <img
                    alt=""
                    src={highEndBikeHover ? highEndBikeGIF : highEndStill}
                    height="170"
                    width="290"
                  />
                  <h5>High-End Motorcycle</h5>
                </div>
              </Grid>
            </Grid>
          </>
        ) : (
          <>  

             <Grid container component="div" direction="row" className="column">
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                lg={12}
                className="center-align"
                style={{marginTop:'2%'}}
              >
                <span style={{fontSize:'18px',fontWeight:"bold"}}>WHAT ARE YOU LOOKING FOR?</span><br/>
                <img alt="" src={headingLines} width="57" height="4" />
              </Grid>
            </Grid>
          <Grid style={{padding:'30px'}} container component="div" direction="row">
            <Grid item xs={12} sm={12} md={4} lg={4} className="flex-center">
              <div
                className="vehicle-box-shadow center-align"
                onMouseEnter={() => setBikeHover(true)}
                onMouseLeave={() => setBikeHover(false)}
                style={{ background: "white" }}
                onClick={() => handleCategoryClick(CATEGORY.BIKE)}
              >
                <img
                  alt=""
                  src={bikeHover ? bikeGIF : bikeStill}
                  height="170"
                  width="290"
                />
                <h5>Motorcycle</h5>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} className="flex-center">
              <div
                className="vehicle-box-shadow center-align"
                onMouseEnter={() => setScooterHover(true)}
                onMouseLeave={() => setScooterHover(false)}
                style={{ background: "white" }}
                onClick={() => handleCategoryClick(CATEGORY.SCOOTER)}
              >
                <img
                  alt=""
                  src={scooterHover ? scooterGIF : scooterStill}
                  height="170"
                  width="290"
                />
                <h5>Scooter</h5>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} className="flex-center">
              <div
                className="vehicle-box-shadow center-align"
                onMouseEnter={() => setHighEndBikeHover(true)}
                onMouseLeave={() => setHighEndBikeHover(false)}
                style={{ background: "white" }}
                onClick={() => handleCategoryClick(CATEGORY.HIGH_END_BIKE)}
              >
                <img
                  alt=""
                  src={highEndBikeHover ? highEndBikeGIF : highEndStill}
                  height="170"
                  width="290"
                />
                <h5>High-End Motorcycle</h5>
              </div>
            </Grid>
          </Grid>
          </>
        )}
      </div>
      <div className="section-3">
        <Grid
          container
          component="div"
          direction="row"
          className="advantageRow"
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className="center-align section-3-heading"
          >
            <h3>BIKEBAZAAR ADVANTAGE</h3>
            <img alt="" src={headingLines} width="57" height="4" />
          </Grid>
        </Grid>
        <Grid
          container
          component="div"
          direction="row"
          className="row padHorizontal5"
        >
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <div className="gola-wrapper">
              <div className="gola valign-wrapper">
                <img alt="" src={certifiedAutoExperts} height="69" width="69" />
              </div>
            </div>
            <div className="center-align">
              <h5>Certified by Auto Experts</h5>
              <p className="advantage-subtitle-1">
                Every bike goes through a thorough inspection and is certified
                by our team of Auto Experts
              </p>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <div className="gola-wrapper">
              <div className="gola valign-wrapper">
                <img alt="" src={monthWarranty} height="69" width="69" />
              </div>
            </div>
            <div className="center-align">
              <h5>Free 6 Months' Warranty</h5>
              <p className="advantage-subtitle-1">
                Get 6 Months' Warranty covering critical parts including engine
                and gear box, extendable upto 12 months
              </p>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <div className="gola-wrapper">
              <div className="gola valign-wrapper">
                <img alt="" src={buyerProtection} height="69" width="69" />
              </div>
            </div>
            <div className="center-align">
              <h5>Verified Sellers</h5>
              <p className="advantage-subtitle-1">
                All BikeBazaar Two-Wheelers are procured through Verified
                Sellers
              </p>
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          component="div"
          direction="row"
          className="row"
          justify="center"
          style={{ paddingBottom: "20px" }}
        >
          <Grid item xs={12} sm={12} md={4} lg={5}>
            <div className="gola-wrapper">
              <div className="gola-2 valign-wrapper">
                <img alt="" src={lowCostEmi} height="69" width="69" />
              </div>
            </div>
            <div className="center-align">
              <h5>Low Cost EMI</h5>
              <p className="advantage-subtitle">
                All vehicles are available at EMI starting at ₹ 2000*. Your
                dream bike is not a distant dream now
              </p>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <div className="gola-wrapper">
              <div className="gola-2 valign-wrapper">
                <img
                  alt=""
                  src={hassleFreeDocTransfer}
                  height="69"
                  width="69"
                />
              </div>
            </div>
            <div className="center-align hfdc">
              <h5>Hassle Free Document Transfer</h5>
              <p className="advantage-subtitle">
                Document transfer is facilitated and made easy for buyer and
                seller
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
      {matches?<div className="section-4">
        <Grid
          container
          component="div"
          direction="row"
          className="row center-align"
          style={{ marginBottom: "0px" }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <h3>TESTIMONIALS</h3>
            <img alt="" src={headingLines} width="57" height="4" />
          </Grid>
        </Grid>
        <Grid container component="div" direction="row" className="row mb-0">
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <div className="valign-wrapper arrow-container">
              <button
                className="btn-floating btn-large waves-effect waves-light white"
                id="slideLeft"
                onClick={() => initCar("left")}
              >
                <i className="material-icons icon-black">keyboard_arrow_left</i>
                initCar
              </button>
            </div>
          </Grid>
          <Grid item xs={10} sm={10} md={10} lg={10} className="center-align">
            <div className="carousel" style={{ minHeight: "300px" }}>
              <a
                className="carousel-item"
                href="#one!"
                index="0"
                style={{ marginTop: "-10px" }}
              >
                <img alt="" className="circle" src={testimonial_hari} />
              </a>
              {/* <a className="carousel-item" href="#two!" index="1">
                <img alt="" className="circle" src={testimonial2} />
              </a> */}
              <a
                className="carousel-item"
                href="#two!"
                index="1"
                style={{ marginTop: "-10px" }}
              >
                <img alt="" className="circle" src={testimonial_md} />
              </a>
              <a
                className="carousel-item"
                href="#three!"
                index="2"
                style={{ marginTop: "-10px" }}
              >
                <img alt="" className="circle" src={testimonial_azhar} />
              </a>
              {/* <a className="carousel-item" href="#five!" index="4">
                <img alt="" className="circle" src={testimonial5} />
              </a> */}
            </div>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <div className="valign-wrapper arrow-container">
              <button
                className="btn-floating btn-large waves-effect waves-light white"
                id="slideRight"
                onClick={() => initCar("right")}
              >
                <i className="material-icons icon-black">
                  keyboard_arrow_right
                </i>
              </button>
            </div>
          </Grid>
        </Grid>
        <Grid container component="div" direction="row" className="row">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className="center-align">
              <h4 id="clientName"></h4>
            </div>
            <div id="testimonialMessage"></div>
          </Grid>
        </Grid>
      </div>:<></>}
      <Footer />
    </div>
  );
};

export default Homepage;
