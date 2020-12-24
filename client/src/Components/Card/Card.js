import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import "./watermark.css";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CustomCarousel from "./CustomCarousel/Carousel";

const useStyles = makeStyles(theme => ({
  del: {
  marginLeft: '10px',
  fontSize: '20px',
  // color: 'lightgreen',
  color: 'black',
  textDecoration: 'line-through',
  }
}));

const Card = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const vehicleImagePath = "../../vehicles/";
  return (
    <Grid item component="div" lg={4} md={6} sm={12} xs={12} className="Prod">
      {matches?<Link to={"/vehicledetails/" + props.vehicleid}>
        <div className="Product">
          {matches? props.sold == "true" ? (
            <div className="Product-image-container watermarked watermarkedCard">
              <img src={vehicleImagePath + props.image} height="230" alt="" />
            </div>
          ) : (
            <div className="Product-image-container ">
              <img src={vehicleImagePath + props.image} height="230" alt="" />
            </div>
          ):<CustomCarousel carouselImages={props.carouselImages}/>}
         
          <div className="detail">
            <div className="bike-name">
              <h3>{props.name} </h3>
            </div>
            <p className="price">
              <img
                className="rupees"
                src={require("../../assets/icons/rupee-indian-red.svg")}
                alt=""
              />
              {props.discountPercent ? Math.ceil(props.cost - (props.cost * props.discountPercent / 100)) : props.cost}
              {props.discountPercent && <span className={classes.del}><strong>` </strong> {props.cost}</span>}
            </p>
            <ul className="detailPoints">
              <li className="year">
                <span>{props.year}</span>
              </li>
              <li className="km">
                <span>{props.kms} KMs</span>
              </li>
              <li className="cc">
                <span>{props.cc} CC</span>
              </li>
              <li className="owner">
                <span>
                  1<sup>st</sup> Owner
                </span>
              </li>
            </ul>
            <br className="clr" />
            <p className="location">{props.loc}</p>
          </div>
        </div>
      </Link>:
        <div className="Product">
          {matches? props.sold == "true" ? (
            <div className="Product-image-container watermarked watermarkedCard">
              <img src={vehicleImagePath + props.image} height="230" alt="" />
            </div>
          ) : (
            <div className="Product-image-container ">
              <img src={vehicleImagePath + props.image} height="230" alt="" />
            </div>
          ):<CustomCarousel vehicleid={props.vehicleid} carouselImages={props.carouselImages}/>}
         
          <div className="detail">
            <div className="bike-name">
              <h3>{props.name} </h3>
            </div>
            <p className="price">
              <img
                className="rupees"
                src={require("../../assets/icons/rupee-indian-red.svg")}
                alt=""
              />
              {props.discountPercent ? Math.ceil(props.cost - (props.cost * props.discountPercent / 100)) : props.cost}
              {props.discountPercent && <span className={classes.del}><strong>` </strong> {props.cost}</span>}
            </p>
            <ul className="detailPoints">
              <li className="year">
                <span>{props.year}</span>
              </li>
              <li className="km">
                <span>{props.kms} KMs</span>
              </li>
              <li className="cc">
                <span>{props.cc} CC</span>
              </li>
              <li className="owner">
                <span>
                  1<sup>st</sup> Owner
                </span>
              </li>
            </ul>
            <br className="clr" />
            <p className="location">{props.loc}</p>
          </div>
        </div>
     }
    </Grid>
  );
};

export default Card;