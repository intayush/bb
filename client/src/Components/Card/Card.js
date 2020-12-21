import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import "./watermark.css";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  del: {
    marginLeft: "10px",
    fontSize: "20px",
    // color: 'lightgreen',
    color: "black",
    textDecoration: "line-through",
  },
}));

const Card = (props) => {
  const classes = useStyles();
  const vehicleImagePath = "../../vehicles/";
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  function Item(props) {
    return (
      <Paper>
        <img src={vehicleImagePath + props.item} height="230" alt="" />
      </Paper>
    );
  }

  return (
    <Grid item component="div" lg={4} md={6} sm={12} xs={12} className="Prod">
      <div className="Product">
        {props.sold == "true" ? (
          <div className="Product-image-container watermarked watermarkedCard">
            <img src={vehicleImagePath + props.image} height="230" alt="" />
          </div>
        ) : (
          <div className="Product-image-container">
            {matches ? (
              <img src={vehicleImagePath + props.image} height="230" alt="" />
            ) : (
              <Carousel
                indicators={false}
                autoPlay={false}
                animation={"slide"}
                navButtonsAlwaysVisible={true}
              >
                {props.carouselImages.map((item, i) => (
                  <Item key={i} item={item} />
                ))}
              </Carousel>
            )}
          </div>
        )}
        <Link to={"/vehicledetails/" + props.vehicleid}>
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
              {props.discountPercent
                ? Math.ceil(
                    props.cost - (props.cost * props.discountPercent) / 100
                  )
                : props.cost}
              {props.discountPercent && (
                <span className={classes.del}>
                  <strong>` </strong> {props.cost}
                </span>
              )}
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
        </Link>
      </div>
    </Grid>
  );
};

export default Card;
