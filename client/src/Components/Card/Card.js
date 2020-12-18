import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import "./watermark.css";
import { makeStyles } from "@material-ui/core/styles";
import {Paper, Button} from '@material-ui/core'

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
  const vehicleImagePath = "../../vehicles/";

  function Item(props)
  {
      return (
          <Paper>
               <img src={vehicleImagePath + props.item} height="230" alt="" />
          </Paper>
      )
  }

  return (
    <Grid item component="div" lg={4} md={6} sm={12} xs={12} className="Prod">
        <div className="Product">
          {props.sold === "true" ? (
            <div className="watermarked watermarkedCard">
              <img src={vehicleImagePath + props.image} height="230" alt="" />
            </div>
          ) : (
            <div >
              <img src={vehicleImagePath + props.image} height="230" alt="" />
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
          </Link>
        </div>
    </Grid>
  );
};

export default Card;
