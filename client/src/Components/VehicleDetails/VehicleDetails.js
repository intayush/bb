import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "./VehicleDetails.css";
import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import VehicleData from "../VehicleData/VehicleData";
import VehicleMetaData from "../VehicleMetaData/VehicleMetaData";
import VehicleAdvantage from "../VehicleAdvantage/VehicleAdvantage";
import Spinner from "../UI/Spinner/Spinner";
import Banner from "../Banner/Banner";
import M from "materialize-css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BRANDS } from "../../shared/mappings/brands";
import { MODELS } from "../../shared/mappings/bike_models";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "#f7f7f7",
  },
  banner: {
    marginTop: theme.spacing(2),
  },
}));

const CATEGORY = ["All", "Motorcycle", "Scooter", "High-End Motorcycle"];

const VehicleDetails = (props) => {
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
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll("select");
      M.FormSelect.init(elems, {});
    });

    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems, {});
    });

    if (props.match.params.vehicleid !== undefined) {
      props.getVehicleData(props.match.params.vehicleid);
    }
  }, []);

  var vehicle = <Spinner />;
  if (props.vehicle != null) {
    let name =
      props.vehicle._source.model <= MODELS.length - 1 &&
      props.vehicle._source.brand <= BRANDS.length - 1
        ? BRANDS[props.vehicle._source.brand] +
          " " +
          MODELS[props.vehicle._source.model]
        : "NA";
    vehicle = (
      <div className="">
        <Grid
          container
          component="div"
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.banner}>
            <Banner
              navigation={CATEGORY[props.vehicle._source.category]}
              heading={name}
              text=""
              path={props.location.pathname}
            />
          </Grid>
        </Grid>
        <VehicleData history={props.history} data={props.vehicle._source} />
        <VehicleMetaData vehicleDetails={props.vehicle._source} />
        <br className="clr" />
      </div>
    );
  }

  return (
    <div id="VehicleDetails" className={classes.body}>
      {/* <Header /> */}
      <MainMenu />
      <Grid
        container
        component="div"
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={11} sm={11} md={11} lg={11} className={classes.banner}>
          {vehicle}
          <VehicleAdvantage continerStyle="advantageContainer" />
          {/* <SimilarVehicles /> */}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    vehicle: state.vehicleDetails.vehicle,
    loading: state.vehicleDetails.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getVehicleData: (vehicleid) => dispatch(actions.getVehicleData(vehicleid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetails);
