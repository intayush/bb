import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector } from "react-redux";

const Banner = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { category } = useSelector((state) => state.vehicleDetails);

  const CATEGORY = ["All", "Motorcycle", "Scooter", "High-End Motorcycle"];

  return (
    <div className={matches ? "pageDtl" : "mobilePageDtl"}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {matches ? (
          <li className="current">
            <Link to={props.path}>{props.navigation}</Link>
          </li>
        ) : (
          <li className="current">
            <span>{CATEGORY[category]}</span>
          </li>
        )}
      </ul>
      {matches ? <h1>{props.heading}</h1> : <h1>{CATEGORY[category]}</h1>}
      <p>{props.text}</p>
    </div>
  );
};

export default Banner;
