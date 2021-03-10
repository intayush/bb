import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "../UI/Tooltip/Tooltip";
import axios from "axios";
import isEmpty from "validator/lib/isEmpty";
import isAscii from "validator/lib/isAscii";
import isEmail from "validator/lib/isEmail";
import isNumeric from "validator/lib/isNumeric";
import "../Card/watermark.css";
import ImageGallery from "react-image-gallery";
import Modal from "@material-ui/core/Modal";
import whiteCloseIcon from "../../assets/whiteCloseIcon.png";
import temporaryblackiconformobile from "../../assets/Close.png";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { BRANDS } from "../../shared/mappings/brands";
import { MODELS } from "../../shared/mappings/bike_models";
import calenderIcon from "../../assets/calenderIcon.png";
import engineIcon from "../../assets/engineIcon.png";
import kilometerIcon from "../../assets/kilometerIcon.png";
import locationIcon from "../../assets/locationIcon.png";
import personIcon from "../../assets/personIcon.png";
import CustomCarousel from "./Carousel/Carousel";
import Customwebcarousel from "./Customwebcarousel";

import "./VehicleData.css";

const useStyles = makeStyles((theme) => ({
  imagePopupModal: {
    position: "absolute",
    width: "80%",
    height: "90%",
    backgroundColor: "black",
    border: "0 solid #fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    outline: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  formError: {
    color: "red",
    fontSize: 13,
  },
}));

const formValidator = (name, value) => {
  switch (name) {
    case "name": {
      const nameValue = value.replace(/ /g, "");
      return !isAscii(nameValue) || value.length > 100
        ? "Enter valid name"
        : "";
    }
    case "phone": {
      return value.length > 15 || !isNumeric(value)
        ? "Invalid Mobile Number"
        : "";
    }
    case "email": {
      return !isEmail(value) ? "Invalid Email Id" : "";
    }
    case "emi": {
      return true;
    }
    case "vehicleid": {
      return true;
    }
    default: {
      return false;
    }
  }
};

const VehicleData = ({vehicle,data,history}) => {

  let name = vehicle._source.model <= MODELS.length - 1 && vehicle._source.brand <= BRANDS.length - 1 ? BRANDS[vehicle._source.brand] +  " " + MODELS[vehicle._source.model] : "NA";

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [openImgPopup, setOpenImgPopup] = React.useState(false);
  const [counterOfImagesForWebCarousel,setcounterOfImagesForWebCarousel]=useState(0)
  
  const handleImgPopupClose = () => {
    setOpenImgPopup(false);
  };

  const imgPopup = () => {
    const images = sliderImages.map((image) => ({
      original: vehicleImagePath + image,
      thumbnail: vehicleImagePath + image,
    }));

    return (
      <>
        {data.sold === "true" ? (
          <div className="watermarked watermarkedCarousel">
            <ImageGallery
              thumbnailPosition="left"
              items={images}
              showPlayButton={false}
            />
          </div>
        ) : (
        matches? <Customwebcarousel setcounterOfImagesForWebCarousel ={setcounterOfImagesForWebCarousel} images={images}/>: <ImageGallery
        thumbnailPosition="left"
        items={images}
        showPlayButton={false}
      />
        )}
      </>
    );
  };

  const [sliderImages, setSliderImages] = useState(data.images);

  const [formData, setFormData] = useState({
    name: {
      value: "",
      error: false,
      errorMessage: "",
    },
    emi: {
      value: 1,
      error: false,
      errorMessage: "",
    },
    email: {
      value: "",
      error: false,
      errorMessage: "",
    },
    phone: {
      value: "",
      error: false,
      errorMessage: "",
    },
    vehicleid: {
      value: 0,
      error: false,
      errorMessage: "",
    },
    vehiclelink: {
      value: window.location.href,
      error: false,
      errorMessage: "",
    },
  });

  const [tooltipState, setTooltipState] = useState({
    open: false,
    message: "",
    variant: "error",
  });

  const handleClose = () => {
    setTooltipState({
      open: false,
      message: "",
      variant: "success",
    });
  };

  const tooltip = (
    <Tooltip
      open={tooltipState.open}
      message={tooltipState.message}
      variant={tooltipState.variant}
      handleClose={handleClose}
    />
  );

  const vehicleImagePath = "../../vehicles/";
  let discount = null;
  let discountAmt = 0;


  if (data.discountPercent) {
    discountAmt = Math.ceil(
      (data.discountPercent * data.price) / 100
    );
    discount = (
      <>
        <span className="save">
          Save <strong>` </strong>
          {discountAmt}
        </span>
      </>
    );
  }

  
  // for the mobile discount
  let mobilediscount = null;
  let mobilediscountAmt = 0;

  if (data.discountPercent) {
    mobilediscountAmt = Math.ceil(
      (data.discountPercent * data.price) / 100
    );
    mobilediscount = (
      <>
        <span className="mobilesave">
        <span style={{color:'white'}}>Save {data.discountPercent}% Off</span>
         
        </span>
      </>
    );
  }


  const updateFormdata = (event, formData) => {
    let targetName = event.target.name;
    let targetValue =
      targetName === "emi" ? event.target.checked : event.target.value;
    let errorMessage = "";
    let error = false;
    if (targetName !== "emi") {
      if (isEmpty(targetValue)) {
        errorMessage = "This field is required";
        error = true;
      } else {
        errorMessage = formValidator(targetName, targetValue);
        if (errorMessage.length) {
          error = true;
        }
      }
    } else {
      targetValue = targetValue ? 1 : 0;
    }
    let newData = {
      ...formData,
      [targetName]: {
        value: targetValue,
        error: error,
        errorMessage: errorMessage,
      },
    };
    setFormData(newData);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const formDataCopy = formData;
    let errorFlag = false;
    Object.entries(formData).forEach((data) => {
      let targetValue = data[1].value;
      let targetName = data[0];
      let errorMessage = "";
      let error = false;
      if (targetValue === "") {
        errorMessage = "This field is required";
        error = true;
      }
      formDataCopy[targetName].errorMessage = errorMessage;
      formDataCopy[targetName].error = error;
      if (error) {
        errorFlag = true;
      }
    });
    if (!errorFlag) {
      axios
        .post("/apis/leadDetail/insertBuyRequest", formData)
        .then((response) => {
          //  sending SMS
          history.push(`locate-store?store-id=${data.storeId}`, {
            message:
              "Thank you for reaching out to us. The location of the store is provided below:",
          });
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFormData({
        ...formData,
        formDataCopy,
      });
    }
  };

  useEffect(() => {
    let vehicleId = {
      ...formData,
      vehicleid: {
        value: data.id,
        error: false,
        errorMessage: "",
      },
    };
    setFormData(vehicleId);
    setSliderImages(data.images);
  }, [data.images]);

 

  return (
    <Grid container component="div" direction="row">
      {tooltip}
      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
          
        }}
        open={openImgPopup}
        onClose={handleImgPopupClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {/* <div className={classes.imagePopupModal}> */}
        <Grid
          container
          component="div"
          direction="row"
          className={classes.imagePopupModal}
        >
           {matches?<Grid item xs={1} md={1} sm={1} lg={1}>
         <div style={{display:'flex',flexDirection:'row',fontSize:'20px',fontWeight:'bold',color:'white'}}> {`${counterOfImagesForWebCarousel + 1} of ${sliderImages.length}` }</div>
        </Grid>:<></>}
          <Grid item xs={10} md={10} sm={10} lg={10}>
            {imgPopup()}
          </Grid>
         
         {/* for the close icon mobile and web viewport */}
          {matches?<Grid item xs={1} md={1} sm={1} lg={1}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>  <img
              style={{ cursor: "pointer" }}
              onClick={handleImgPopupClose}
              src={whiteCloseIcon}
              height="30"
              width="30"
              alt=""
            />
            <span style={{fontWeight:"bold",fontSize:'20px',color:'white'}}>close</span>
            </div>
          
          </Grid>:<Grid item xs={1} md={1} sm={1} lg={1}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>  <img
              style={{ cursor: "pointer" }}
              onClick={handleImgPopupClose}
              src={temporaryblackiconformobile}
              height="20"
              width="20"
              alt=""
            />
            <span style={{fontWeight:"bold",fontSize:'20px',color:'white'}}>close</span>
            </div>
          
          </Grid>}

        </Grid>
        {/* </div> */}
      </Modal>
      {matches && (
        <Grid item xs={12} md={12} sm={12} lg={6} className="vehicleGalSec">
          <div className="vehicleGal" style={{ minHeight: "610px" }}>
            {data.sold ==="true" ? (
              <Carousel
                dynamicHeight={true}
                showThumbs={true}
                key={sliderImages[0]}
                useKeyboardArrows={true}
              >
                {sliderImages.map((image, key) => {
                  return (
                    <div
                      key={key}
                      style={{ cursor: "pointer" }}
                      onClick={() => setOpenImgPopup(true)}
                      className="watermarked watermarkedCarousel"
                    >
                      <img
                        height="100%"
                        src={vehicleImagePath + image}
                        alt=""
                      />
                    </div>
                  );
                })}
              </Carousel>
            ) : (
              <Carousel
                dynamicHeight={true}
                showThumbs={true}
                key={sliderImages[0]}
                useKeyboardArrows={true}
              >
                {sliderImages.map((image, key) => {
                  return (
                    <div
                      key={key}
                      style={{ cursor: "pointer" }}
                      onClick={() => setOpenImgPopup(true)}
                    >
                      <img
                        height="100%"
                        src={vehicleImagePath + image}
                        alt=""
                      />
                    </div>
                  );
                })}
              </Carousel>
            )}
          </div>
        </Grid>
      )}

      <Grid item xs={12} md={12} sm={12} lg={6}>
        <div
          className="vehicleDetails"
          style={{ minHeight: "610px", borderRadius: "5px" }}
        >
          {matches ? (
            <></>
          ) : (
       
             <CustomCarousel imagePopUp={()=>setOpenImgPopup(true)} carouselImages={vehicle._source.images}/>
          )}
          {matches ? (
            <div className="PriceSec">
              <p className="price">
                <strong>`</strong> {data.price - discountAmt}
                {discount && (
                  <span className="del">
                    <strong> </strong> {data.price}
                  </span>
                )}
              </p>
              {discount}
            </div>
          ) : (
            <>
            <div style={{display:'flex',flexDirection:'column'}}><span style={{ fontSize: "17px", fontWeight: "bold",paddingLeft:'5%', }}>
                {name}
              </span> 
              
              
            
            <div
              style={{ display: "inline-block",padding:"5px",flexDirection:'row' }}
            >
              
              <div className="mobilePriceSec">
              <p className="price">
                <strong>`</strong> {data.price - discountAmt}
                {discount && (
                  <span className="del">
                    <strong>` </strong> {data.price}
                  </span>
                )}
              </p>
              {mobilediscount}
            </div>
              <Grid
                component="div"
                container
                xs={12}
                md={12}
                lg={12}
                style={{paddingLeft:'4%'}}
              >
                <div style={{width:"45%"}}>
                 
                  <ul>
                    <li className="year"><img src={calenderIcon} alt="calenderIcon"/><span  className="cardText">{data.myear}</span></li>
                    <li style={{width:'100px',marginTop:'10px'}} className="cc"><img src={engineIcon} alt="engineIcon"/><span  className="cardText">{data.cc}</span> CC</li>
                  </ul>
                </div>

                <div style={{width:"45%"}}>
                 
                  <ul >
                    <li style={{width:'100px'}} className="km"><img src={kilometerIcon} alt="kilometerIcon"/><span className="cardText">{data.kmdriven}<span >KMs</span></span> </li>
                    <li style={{width:'100px',marginTop:'10px'}} className="owner"><img src={personIcon} alt="ownerIcon"/><span className="cardText">{data.owner}</span></li>
                  </ul>
                </div>

              </Grid>
              
            </div>
            </div>
            <hr className="horizontalLines"/>
              <div style={{marginLeft:'5%',display:'flex',flexDirection:'row'}}>
                  <img height="18" src={locationIcon} alt="locationIcon" /><span className="cardText">{data.city}</span>
              </div>
             
            <hr className="horizontalLines"/>
            </>
          )}
          {matches ? (
            <div className="ProductDetail">
              <ul className="detailPoints">
                <li className="year">{data.myear}</li>
                <li className="km">{data.kmdriven} KMs</li>
                <li className="cc">{data.cc} CC</li>
                <li className="owner">{data.owner}</li>
                <li className="location">
                  {data.loc + ", " + data.city}
                </li>
              </ul>
              <br className="clr" />
            </div>
          ) : (
            <></>
          )}
          <div className={matches?"ProductForm":"mobileProductForm"}>
            <form method="post" action="" name="0" id="" className="">
              <Grid
                container
                component="div"
                direction="row"
                className="form-group"
              >
                <Grid item xs={12} md={12} sm={12} lg={3}>
                  {matches ? (
                    <label className="fieldname" htmlFor="txtOrgName">
                      Name* :
                    </label>
                  ) : (
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Name*
                    </span>
                  )}
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={9}>
                  {matches ? (
                    <input
                      type="text"
                      autoComplete="off"
                      name="name"
                      id=""
                      placeholder="Type Your Name"
                      onBlur={(event) => updateFormdata(event, formData)}
                      required
                      className={formData.name.error ? "invalid" : formData.name.value ? "valid" : ""}
                    />
                  ) : (
                    <input
                      style={{ height: "30px" }}
                      type="text"
                      autoComplete="off"
                  
                      name="name"
                      id=""
                      placeholder="Type Your Name"
                      onBlur={(event) => updateFormdata(event, formData)}
                      required
                      className={
                        formData.name.error
                          ? "invalid"
                          : formData.name.value
                          ? "valid"
                          : ""
                      }
                    />
                  )}
                  {formData.name.error && (
                    <p className={classes.formError}>
                      {formData.name.errorMessage}
                    </p>
                  )}
                </Grid>
              </Grid>
              <Grid
                container
                component="div"
                direction="row"
                className="form-group"
              >
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  {matches ? (
                    <label className="fieldname" htmlFor="txtOrgName">
                      Phone No.* :
                    </label>
                  ) : (
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Phone No *
                    </span>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  {matches ? (
                    <input
                      type="text"
                      autoComplete="off"
                      
                      name="phone"
                      id=""
                      placeholder="Type Your Contact Number"
                      onBlur={(event) => updateFormdata(event, formData)}
                      required
                      className={
                        formData.phone.error
                          ? "invalid"
                          : formData.phone.value
                          ? "valid"
                          : ""
                      }
                    />
                  ) : (
                    <input
                      style={{ height: "30px" }}
                      type="text"
                      autoComplete="off"
                      
                      name="phone"
                      id=""
                      placeholder="Type Your Contact Number"
                      onBlur={(event) => updateFormdata(event, formData)}
                      required
                      className={
                        formData.phone.error
                          ? "invalid"
                          : formData.phone.value
                          ? "valid"
                          : ""
                      }
                    />
                  )}
                  {formData.phone.error && (
                    <p className={classes.formError}>
                      {formData.phone.errorMessage}
                    </p>
                  )}
                </Grid>
              </Grid>
              <Grid
                container
                component="div"
                direction="row"
                className="form-group"
              >
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  {matches ? (
                    <label className="fieldname" htmlFor="txtOrgName">
                      Email Id :
                    </label>
                  ) : (
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                      Email Id:
                    </span>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                  {matches ? (
                    <input
                      type="text"
                      
                      autoComplete="off"
                      name="email"
                      id=""
                      placeholder="Type Your Email Id"
                      onBlur={(event) => updateFormdata(event, formData)}
                      required
                      className={
                        formData.email.error
                          ? "invalid"
                          : formData.email.value
                          ? "valid"
                          : ""
                      }
                    />
                  ) : (
                    <input
                      style={{ height: "30px" }}
                      type="text"
                     
                      autoComplete="off"
                      name="email"
                      id=""
                      placeholder="Type Your Email Id"
                      onBlur={(event) => updateFormdata(event, formData)}
                      required
                      className={
                        formData.email.error
                          ? "invalid"
                          : formData.email.value
                          ? "valid"
                          : ""
                      }
                    />
                  )}

                  {formData.email.error && (
                    <p className={classes.formError}>
                      {formData.email.errorMessage}
                    </p>
                  )}
                </Grid>
              </Grid>
              <Grid
                container
                component="div"
                direction="row"
                className="form-group"
                justify={matches ? "center" : ""}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  style={matches ? { textAlign: "center" } : {}}
                >
                  <label className="fieldname">
                    <input
                      type="checkbox"
                      name="emi"
                      className="filled-in"
                      onClick={(event) => updateFormdata(event, formData)}
                      defaultChecked
                    />
                    {matches ? (
                      <span>Interested in Low-Cost EMI Option</span>
                    ) : (
                      <span style={{ fontSize: "12px" }}>
                        Interested in Low-Cost EMI Option
                      </span>
                    )}
                  </label>
                </Grid>
              </Grid>
              <Grid
                container
                component="div"
                direction="row"
                className="form-group"
                justify="center"
              >
                <Grid item xs={9} sm={9} md={9} lg={9}>
                  <div className="form-group" style={{ textAlign: "center" }}>
                    <button type="button" className="btn" onClick={submitForm}>
                      Get Store Details
                    </button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </Grid>
    </Grid>
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
    save: (vehicleid) => dispatch(actions.getVehicleData(vehicleid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleData);
