import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "./Sell.css";
// import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";
import SellingProcess from '../SellingProcess/SellingProcess';
import headingLines from "../../assets/heading-lines.svg";
import blackHeadingLines from '../../assets/black-heading-lines.svg';
import stepsToSell from '../../assets/steps-to-sell.svg';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
// import Tooltip from "../UI/Tooltip/Tooltip";
import axios from "axios";
import isEmpty from "validator/lib/isEmpty";
import isAlpha from "validator/lib/isAlpha";
// import isMobilePhone from "validator/lib/isMobilePhone";
// import isAlphaNumeric from "validator/lib/isAlphanumeric";
import isAscii from "validator/lib/isAscii";
import isNumeric from "validator/lib/isNumeric";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import stepsToSellMobile from '../../assets/steps_to_sell_ mobile.jpg';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import closeIcon from "../../assets/Close.png";
import InputAdornment from '@material-ui/core/InputAdornment';
import { Input } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  body: {
    backgroundColor: '#f7f7f7'
  },
  banner: {
    marginTop: theme.spacing(2),
    
  },
  formContainer: {
    marginTop: theme.spacing(4),
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    boxShadow: '0 0 4px 1px rgba(0, 0, 0, 0.2) !important',
    padding: theme.spacing(3),
    fontSize: 16,
    letterSpacing: 0,
    color: '#000000',
    lineHeight: '15px',
  },
  paper1: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    boxShadow: '0 0 4px 1px rgba(0, 0, 0, 0.2) !important',
    paddingTop: theme.spacing(3),
    fontSize: 16,
    letterSpacing: 0,
    color: '#000000',
    lineHeight: '28px',
  },
  mapContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  formError: {
    color: "red",
    fontSize: 13
  },
  bookAppointmentHeading:{
    paddingTop: 30,
    paddingBottom: 15,
    fontWeight: 800,
    fontSize: 24,
    color: '#232c2b'
  },
  label: {
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: '0px',
    color: '#232c2b'
  },
  sellHeading:{
    paddingBottom: 13,
    fontSize: 24,
    fontWeight: 800,
    color: '#ff0000',
    textAlign: 'center'
  },
  sellHeadingMobile:{
    paddingBottom: 13,
    fontSize: 15,
    fontWeight: 800,
    color: '#ff0000',
    textAlign: 'center'
  },
  line: {
    textAlign: 'center'
  },
  steps:{
    position: 'relative',
    width:'100%',
    height:550,
    backgroundImage: 'url("'+stepsToSell+'")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '900px 360px',
    // paddingRight: theme.spacing(3),
    // paddingRight: '15%',
    padding: theme.spacing(1),
    marginTop: 50,
  },
  stepOne:{
    position: 'absolute',
    top: 50,
    fontWeight: 600,
    paddingRight: '18%',
    paddingLeft: '22%'
  },
  stepTwo:{
    position: 'absolute',
    left: 268,
    top: 30,
    fontWeight: 600,
    paddingRight: '18%',
    paddingLeft: '23%'
  },
  stepThree:{
    position: 'absolute',
    left: 517,
    fontWeight: 600,
    paddingLeft: '23%',
    paddingRight: '15%',
  },
  stepFour:{
    position: 'absolute',
    left: 716,
    top: -18,
    fontWeight: 600,
    paddingLeft: '23%',
    paddingRight: '15%',
  },
  advantageHeading:{
    color: '#232c2b',
    fontSize: 36,
    fontWeight: 800,
    lineHeight: '55px'
  },
  advantageContainer:{
    marginTop: 50
  },
  advantageSubHeading:{
    fontSize: 19,
    fontWeight: 600
  },
  advantageText:{
    fontSize: 15
  },
  imageUploadButton: {
    borderRadius: 5,
    fontSize: 12,
    fontWeight: 600,
    backgroundColor: '#2c3232',
    boxShadow: 'none',
    textTransform: 'capitalize',
    padding: 8,
    border: 'none',
    letterSpacing: '0px',
    color: 'white'
  },
  modalBoxSuccess: {
    position: 'absolute',
    width: '60%',
    backgroundColor: 'green',
    color: 'white',
    border: '0 solid #fff',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  modalBoxErr: {
    position: 'absolute',
    width: '60%',
    backgroundColor: 'orange',
    color: 'white',
    border: '0 solid #fff',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
}));

const formValidator = (name, value) => {
  switch (name) {
    case "name": {
      const nameValue = value.replace(/ /g,'');
      return !isAscii(nameValue) || value.length > 100 ? "Enter valid name" : "";
    }
    case "mobile": {
      return value.length > 15 || !isNumeric(value) ? "Invalid Mobile Number" : "";
    }
    case "city":{
      const cityValue = value.replace(/ /g,'');
      return !isAlpha(cityValue) ? "City name must only be Alphabetic" : "";
    }
    case "address": {
      const addressValue = value.replace(/ /g,'');
      return !isAscii(addressValue) || value.length > 100 ? "Enter valid address" : "";
    }
    case "make": {  
      const makeValue = value.replace(/ /g, '');
      return !isAlpha(makeValue) ? "Make must conatin only aplhabets" : "";
    }
    case "model": {
      return !isAscii(value) || value.length > 50 ? "Enter valid Model" : "";
    }
    case "variant":{
      return !isAscii(value) || value.length > 50 ? "Enter valid variant" : "";
    }
    case "yom": {
      return !isNumeric(value) || value.length > 4 ? "Enter valid year" : "" ;
    }
    case "kmsdriven" :{
      return !isAscii(value) ? "Kms. driven must be number" : "";
    }
    default: {
      return false;
    }
  }
};

const Sell = props => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const classes = useStyles();

  useEffect(() =>{
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  },[])

  const [formData, setFormData] = useState({
    name: {
      value: "",
      error: false,
      errorMessage: ""
    },
    city: {
      value: "",
      error: false,
      errorMessage: ""
    },
    make: {
      value: "",
      error: false,
      errorMessage: ""
    },
    yom: {
      value: "",
      error: false,
      errorMessage: ""
    },
    mobile: {
      value: "",
      error: false,
      errorMessage: ""
    },
    variant: {
      value: "",
      error: false,
      errorMessage: ""
    },
    // email: {
    //   value: "",
    //   error: false,
    //   errorMessage: ""
    // },
    address: {
      value: "",
      error: false,
      errorMessage: ""
    },
    model: {
      value: "",
      error: false,
      errorMessage: ""
    },
    kmsdriven: {
      value: "",
      error: false,
      errorMessage: ""
    },
    promocode: {
      value: "",
      error: false,
      errorMessage: ""
    },
    image: {
      images: [],
      imageNames: [],
      message: "",
      error: false,
      errorMessage: ''
    }
  });

  const [previewImage, setPreviewImage] = useState([]);

  const [successSubmit, setSuccessSubmit] = useState(false);

  // const [tooltipState, setTooltipState] = useState({
  //   open: false,
  //   message: "",
  //   variant: "error"
  // });

  // const handleClose = () => {
  //   setTooltipState({
  //     open: false,
  //     message: "",
  //     variant: "success"
  //   });
  // };
  const [open, setOpen] = React.useState(false);
  const handleModalClose = () => {
    setOpen(false);
    props.history.go(0);
  };
  const [modalMesg, setModalMesg] = React.useState(
    ""
  )

  const tooltip = (
    // <Tooltip
    //   open={tooltipState.open}
    //   message={tooltipState.message}
    //   variant={tooltipState.variant}
    //   handleClose={handleClose}
    // />
    <Modal
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none'}}
      open={open}
      onClose={handleModalClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={successSubmit ? classes.modalBoxSuccess : classes.modalBoxErr}>
        <h4>{modalMesg}</h4>
        <img style={{marginLeft: '10px', cursor: 'pointer'}} onClick={handleModalClose} src={closeIcon} height="20"  alt="" />
      </div>
    </Modal>
  );

  const removeImageHandler = (i) => {
    let imgs = formData.image.images;
    imgs.splice(i, 1);
    let imgNames = imgs.map(img => img.name);
    let msg = `${imgs.length} valid image(s) selected`;
    setFormData({
      ...formData,
      image: {
        images: imgs,
        imageNames: imgNames,
        message: msg
      }
    });
  }

  const selectFiles = (event, formData) => {
    let images = formData.image.images;
    for (let i = 0; i < event.target.files.length; i++) {
      images.push(event.target.files.item(i));
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|tiff)$/));
    if(images.length > 3){
      images = images.slice(images.length-3, images.length);
    }
    setPreviewImage(images);
    let imgNames = images.map(image => image.name);
    let message = `${images.length} valid image(s) selected`;
    setFormData({
      ...formData,
      image: {
        images: images,
        imageNames: imgNames,
        message: message
      }
    });
  }

  const uploadImagesAndEmail = (formData) => {
    const uploadImgs = formData.image.images.map(image => {
      const data = new FormData();
      data.append("image", image, image.name);
      
      return axios.post('/apis/leadDetail/tempUpload', data)
      .then(response => {})
    });
    axios.all(uploadImgs).then(() => {
      axios
      .post("/apis/leadDetail/insertSellrequest", formData)
      .then(response => {
        setSuccessSubmit(true);
        setOpen(true);
        setModalMesg("Thank you. Your details have been saved. We will get back to you shortly.");
      })
      .catch(err => {
        console.log(err);
        setSuccessSubmit(false);
        setOpen(true);
        setModalMesg("Something went wrong, please try later.");
      })
    }).catch(err => alert(err.message));
  }

  const validateAndUpdateFormdata = (event, formData) => {
    let targetValue = event.target.value;
    let targetName = event.target.name;
    let errorMessage = "";
    let error = false;
    if (isEmpty(targetValue)) {
      errorMessage = "This field is required";
      error = true;
    } else {
      errorMessage = formValidator(targetName, targetValue);
      if (errorMessage.length) {
        error = true;
      }
    }
    setFormData({
      ...formData,
      [event.target.name]: {
        value: targetValue,
        error: error,
        errorMessage: errorMessage
      }
    });
  };

  const updateFormdata = (event, formData) => {
    let targetValue = event.target.value;
    let targetName = event.target.name;
    let errorMessage = "";
    let error = false;
    if (isEmpty(targetValue)) {
      errorMessage = "";
      error = false;
    } else {
      errorMessage = formValidator(targetName, targetValue);
      if (errorMessage.length) {
        error = true;
      }
    }
    setFormData({
      ...formData,
      [event.target.name]: {
        value: targetValue,
        error: error,
        errorMessage: errorMessage
      }
    });
  };

  const submitForm = async(event) => {
    event.preventDefault();
    const formDataCopy = formData;
    let errorFlag = false;
    Object.entries(formData).forEach(data => {
      let targetValue = data[1].value;
      let targetName = data[0];
      let errorMessage = "";
      let error = false;
      if(targetName !== "image" && targetName !== "variant" && targetName !== "address" && targetName !== "kmsdriven" && targetName !== "promocode"){
        if(targetValue === ""){
          errorMessage = "This field is required";
          error = true;
        }
        formDataCopy[targetName].errorMessage = errorMessage;
        formDataCopy[targetName].error = error;
      }
      // if(targetName === 'image'){
      //   if(formData.image.images.length === 0){
      //     error = true;
      //     formDataCopy[targetName].errorMessage = 'Please select images to be uploaded';
      //     formDataCopy[targetName].error = error;
      //   }
      // }
      if (error) {
        errorFlag = true;
      }      
    });
    if(!errorFlag) {
      uploadImagesAndEmail(formData);
    } else {
      setFormData({
        ...formData,
        formDataCopy
      });
    }
  };

  let stepsToSellSection = (matches) ? <Grid item Grid item xs={11} sm={11} md={11} lg={11}>
            <Paper className={classes.paper1+ ' center-align'}>
              <h3 className={classes.sellHeading}>Steps to Sell Your Two-Wheeler</h3>
              <img alt="" src={blackHeadingLines} width="57" height="4"/>
                <div className={classes.steps}>
                  <div className={classes.stepOne}>Share Your<br/>Two-Wheeler's Details</div>
                  <div className={classes.stepTwo}>Inspection by our<br/>Auto Expert</div>
                  <div className={classes.stepThree}>Document<br/>Verification</div>
                  <div className={classes.stepFour}>Instant Payment For<br/>Your Two-Wheeler</div>
                </div>
            </Paper>
            {/* </Grid> */}
          </Grid> :
          // <Grid item xs={12} sm={12} md={8}>
            <Paper className={classes.paper1+ ' center-align'}>
                <h3 className={classes.sellHeadingMobile}>Steps to Sell Your Two-Wheeler</h3>
                <img src={stepsToSellMobile} width="750" alt=""/>
            </Paper>
          // </Grid>;

  return (
    <div id="Sell" className={classes.body}>
      {/* <Header /> */}
      <MainMenu />
      {tooltip}

      {matches? <Grid container component="div" direction="row" justify="center"> 
        <Grid item xs={11} md={11} sm={11} lg={11} className={classes.banner}>
            <Banner navigation="Sell" heading="Sell any Two-Wheeler" text="" path={props.location.pathname}/>
        </Grid>
        {stepsToSellSection}
        <Grid item xs={11} sm={11} md={11} lg={11} className="center-align">
          <h3 className={classes.bookAppointmentHeading}>Book An Appointment</h3>
          <img alt="" src={headingLines} width="57" height="4"/>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11}>
            <Paper className={classes.paper}>
              <Grid container component="div" direction="row">
                <Grid container component="div" direction="row">
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <form action="" id="shareYourDetailsForm" encType="multipart/form-data">
                     {/* 1st row for Appointment Form */}
                     <Grid container component="div" direction="row" justify="space-evenly">
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                          <Grid container component="div" direction="row"  justify="space-evenly" >
                            <Grid item xs={12} md={12} sm={5} lg={5}>
                              <label htmlFor="name">
                                <span className={classes.label}>Name:*</span>&nbsp;&nbsp;(eg. Varunam Reddy)
                              </label>
                              <input  type="text" name="name" id="name"
                                onBlur={event =>
                                  validateAndUpdateFormdata(event, formData)
                                }
                                className={
                                  formData.name.error
                                    ? "invalid"
                                    : formData.name.value
                                    ? "valid"
                                    : ""
                                }/>
                              {formData.name.error && (
                                <p className={classes.formError}>
                                  {formData.name.errorMessage}
                                </p>
                              )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <label htmlFor="mobile">
                                <span  className={classes.label}>Mobile No:*</span>&nbsp;&nbsp;(eg. +91 9999999999)
                              </label>
                              <input type="text" name="mobile" required
                                onBlur={event =>
                                  validateAndUpdateFormdata(event, formData)
                                }
                                className={
                                  formData.mobile.error
                                    ? "invalid"
                                    : formData.mobile.value
                                    ? "valid"
                                    : ""
                                }/>
                              {formData.mobile.error && (
                                <p className={classes.formError}>
                                  {formData.mobile.errorMessage}
                                </p>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      
                      {/* 2nd row for Appointment Form */}
                      <Grid container component="div" direction="row" justify="space-evenly">
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                          <Grid container component="div" direction="row"  justify="space-evenly" >
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                                <label htmlFor="city">
                                  <span  className={classes.label}>City:*</span>&nbsp;&nbsp;(eg. Pune, Kolkata)
                                </label>
                                <input type="text" name="city" id="city"
                                  onBlur={event =>
                                    validateAndUpdateFormdata(event, formData)
                                  }
                                  className={
                                    formData.city.error
                                      ? "invalid"
                                      : formData.city.value
                                      ? "valid"
                                      : ""
                                  }/>
                                {formData.city.error && (
                                  <p className={classes.formError}>
                                    {formData.city.errorMessage}
                                  </p>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <label htmlFor="address">
                                <span  className={classes.label}>Address:</span>&nbsp;&nbsp;(eg. 123, abc colony, Mumbai)
                              </label>
                              <textarea name="address"
                                onBlur={event =>
                                  updateFormdata(event, formData)
                                }
                                className={
                                  formData.address.error
                                    ? "invalid materialize-textarea"
                                    : formData.address.value
                                    ? "valid materialize-textarea"
                                    : "materialize-textarea"
                                }></textarea>
                                {formData.address.error && (
                                <p className={classes.formError}>
                                  {formData.address.errorMessage}
                                </p>
                                )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      
                      {/* 3rd row for Appointment Form */}
                      <Grid container component="div" direction="row" justify="space-evenly">
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                          <Grid container component="div" direction="row"  justify="space-evenly" >
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                                <label htmlFor="make">
                                  <span  className={classes.label}>Make:*</span>&nbsp;&nbsp;(eg. Honda, Bajaj)
                                </label>
                                <input type="text" name="make" required
                                  onBlur={event =>
                                    validateAndUpdateFormdata(event, formData)
                                  }
                                  className={
                                    formData.make.error
                                      ? "invalid"
                                      : formData.make.value
                                      ? "valid"
                                      : ""
                                  }/>
                                {formData.make.error && (
                                  <p className={classes.formError}>
                                    {formData.make.errorMessage}
                                  </p>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <label htmlFor="model">
                                <span  className={classes.label}>Model:*</span>&nbsp;&nbsp;(eg. Activa, Pulsar)
                              </label>
                              <input type="text" name="model" required
                                onBlur={event =>
                                  validateAndUpdateFormdata(event, formData)
                                }
                                className={
                                  formData.model.error
                                    ? "invalid"
                                    : formData.model.value
                                    ? "valid"
                                    : ""
                                }/>
                              {formData.model.error && (
                                <p className={classes.formError}>
                                  {formData.model.errorMessage}
                                </p>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      
                      {/* 4nd row for Appointment Form */}
                      <Grid container component="div" direction="row" justify="space-evenly">
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                          <Grid container component="div" direction="row"  justify="space-evenly" >
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                                <label htmlFor="variant">
                                  <span  className={classes.label}>Variant:</span>&nbsp;&nbsp;(eg. 150cc std)
                                </label>
                                <input type="text" name="variant" id="variant"
                                  onBlur={event =>
                                    updateFormdata(event, formData)}
                                    className={
                                      formData.variant.error
                                        ? "invalid"
                                        : formData.variant.value
                                        ? "valid"
                                        : ""
                                    }/>
                                  {formData.variant.error && (
                                    <p className={classes.formError}>
                                      {formData.variant.errorMessage}
                                    </p>
                                  )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <label htmlFor="kmsdriven">
                                <span  className={classes.label}>KMs Driven:</span>&nbsp;&nbsp;(eg. 40,0000 km)
                              </label>
                              <input type="text" name="kmsdriven" id="kmsdriven"
                                onBlur={event =>
                                  updateFormdata(event, formData)
                                }
                                className={
                                  formData.kmsdriven.error
                                    ? "invalid"
                                    : formData.kmsdriven.value
                                    ? "valid"
                                    : ""
                                }/>
                              {formData.kmsdriven.error && (
                                <p className={classes.formError}>
                                  {formData.kmsdriven.errorMessage}
                                </p>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      
                      {/* 5nd row for Appointment Form */}
                      <Grid container component="div" direction="row" justify="space-evenly">
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                          <Grid container component="div" direction="row"  justify="space-evenly" >
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                                <label htmlFor="yom">
                                  <span  className={classes.label}>Year of Manufacture:*</span>&nbsp;&nbsp;(eg. 2013)
                                </label>
                                <input
                                  type="text"
                                  name="yom"
                                  onBlur={event =>
                                    validateAndUpdateFormdata(event, formData)
                                  }
                                  className={
                                    formData.yom.error
                                      ? "invalid"
                                      : formData.yom.value
                                      ? "valid"
                                      : ""
                                  }/>
                                {formData.yom.error && (
                                  <p className={classes.formError}>
                                    {formData.yom.errorMessage}
                                  </p>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <label htmlFor="promocode">
                                <span  className={classes.label}>Promocode:</span>&nbsp;&nbsp;(If applicable)
                              </label>
                              <input type="text" name="promocode" id="promocode"
                                onBlur={event =>
                                  updateFormdata(event, formData)
                                }
                                className={
                                  formData.promocode.error
                                    ? "invalid"
                                    : formData.promocode.value
                                    ? "valid"
                                    : ""
                                }/>
                              {formData.promocode.error && (
                                <p className={classes.formError}>
                                  {formData.promocode.errorMessage}
                                </p>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container component="div" direction="row" justify="space-evenly">
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                      </Grid>
                      <Grid container component="div" direction="row" justify="space-evenly" className={classes.banner+' form-group'}>
                              <Grid item xs={11} sm={11} md={11} lg={11}>
                                <label className="fieldname">
                                    <input type="checkbox" className="filled-in" defaultChecked />
                                    <span>Interested in Exchange</span>
                                </label>
                              </Grid>
                          </Grid>
                          <Grid container component="div" direction="row" justify="space-evenly">
                            <Grid item xs={11} sm={11} md={11} lg={11}>
                              <label htmlFor="image">
                                <span className={classes.label}> Upload images </span>&nbsp;&nbsp;(Images should be in jpeg, png or tiff formats only)
                              </label>
                              <br />
                              <input 
                               title=""
                               className="form-control transparent" 
                               type="file"
                               onChange={(event)=>selectFiles(event, formData)} 
                               multiple
                               />
                              <br />
                              { formData.image.message? <p className="text-info">{formData.image.message}</p>: ''}
                              {/* {formData.image.error && (
                                <p className={classes.formError}>
                                  {formData.image.errorMessage}
                                </p>
                              )} */}
                              <div className={matches ? "preview-image-container" : "preview-image-container-mobile"}>
                                {previewImage.map((file, _i)=>(
                                  <div key={_i} className="image-preview">
                                    <img src={URL.createObjectURL(file)} width={200} height={150} />
                                    <span title="Remove image"><DeleteIcon className="delete-icon" onClick={() => removeImageHandler(_i)} /></span>
                                  </div>
                                  ))}
                              </div>  
                            </Grid> 
                          </Grid>
                        </Grid>
                      <Grid container component="div" direction="row">
                        <Grid item xs={12} sm={12} md={12} lg={12} className="center-align">
                          <div className="form-group">
                            <button type="button" className="btn" onClick={submitForm} >
                              Sell Your Vehicle
                            </button>
                            {/* <button type="button" onClick={handleOpen}>
                              Open Modal
                            </button> */}
                          </div>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={11} sm={11} md={11} lg={11}>
            <SellingProcess heading="BikeBazaar Advantage"/>
          </Grid>
        </Grid>
        

        //mobile View sell page
        :

        <Grid container component="div" direction="row" justify="center"> 
        <Grid item xs={11} md={11} sm={11} lg={11} className={classes.banner}>
            <Banner navigation="Sell" heading="Sell any Two-Wheeler" text="" path={props.location.pathname}/>
        </Grid>
        {stepsToSellSection}
        <Grid item xs={11} sm={11} md={11} lg={11} className="center-align">
          <h3 className={classes.bookAppointmentHeading}>Book An Appointment</h3>
          <img alt="" src={headingLines} width="57" height="4"/>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11}>
            <Paper className={classes.paper}>
              <Grid container component="div" direction="row">
                <Grid container component="div" direction="row">
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <form action="" id="shareYourDetailsForm" encType="multipart/form-data">
                     {/* 1st row for Appointment Form */}
                     <Grid container component="div" direction="row" justify="space-evenly">
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                          <Grid container component="div" direction="row"  justify="space-evenly" >
                            {/* <Grid item xs={12} md={12} sm={5} lg={5}>
                              <label htmlFor="name">
                                <span className={classes.label}>Name:*</span>&nbsp;&nbsp;(eg. Varunam Reddy)
                              </label>
                              <input type="text" name="name" id="name"
                                onBlur={event =>
                                  validateAndUpdateFormdata(event, formData)
                                }
                                className={
                                  formData.name.error
                                    ? "invalid"
                                    : formData.name.value
                                    ? "valid"
                                    : ""
                                }/>
                              {formData.name.error && (
                                <p className={classes.formError}>
                                  {formData.name.errorMessage}
                                </p>
                              )}
                            </Grid> */}

                            <Input  
                            InputProps={{
                             startAdornment: <InputAdornment position="start">Name:*</InputAdornment>,
                                     }} disableUnderline={true} type="text"
                                      />


                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <label htmlFor="mobile">
                                <span  className={classes.label}>Mobile No:*</span>&nbsp;&nbsp;(eg. +91 9999999999)
                              </label>
                              <input type="text" name="mobile" required
                                onBlur={event =>
                                  validateAndUpdateFormdata(event, formData)
                                }
                                className={
                                  formData.mobile.error
                                    ? "invalid"
                                    : formData.mobile.value
                                    ? "valid"
                                    : ""
                                }/>
                              {formData.mobile.error && (
                                <p className={classes.formError}>
                                  {formData.mobile.errorMessage}
                                </p>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      
                      {/* 2nd row for Appointment Form */}
                      <Grid container component="div" direction="row" justify="space-evenly">
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                          <Grid container component="div" direction="row"  justify="space-evenly" >
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                                <label htmlFor="city">
                                  <span  className={classes.label}>City:*</span>&nbsp;&nbsp;(eg. Pune, Kolkata)
                                </label>
                                <input type="text" name="city" id="city"
                                  onBlur={event =>
                                    validateAndUpdateFormdata(event, formData)
                                  }
                                  className={
                                    formData.city.error
                                      ? "invalid"
                                      : formData.city.value
                                      ? "valid"
                                      : ""
                                  }/>
                                {formData.city.error && (
                                  <p className={classes.formError}>
                                    {formData.city.errorMessage}
                                  </p>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <label htmlFor="address">
                                <span  className={classes.label}>Address:</span>&nbsp;&nbsp;(eg. 123, abc colony, Mumbai)
                              </label>
                              <textarea name="address"
                                onBlur={event =>
                                  updateFormdata(event, formData)
                                }
                                className={
                                  formData.address.error
                                    ? "invalid materialize-textarea"
                                    : formData.address.value
                                    ? "valid materialize-textarea"
                                    : "materialize-textarea"
                                }></textarea>
                                {formData.address.error && (
                                <p className={classes.formError}>
                                  {formData.address.errorMessage}
                                </p>
                                )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      
                      {/* 3rd row for Appointment Form */}
                      <Grid container component="div" direction="row" justify="space-evenly">
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                          <Grid container component="div" direction="row"  justify="space-evenly" >
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                                <label htmlFor="make">
                                  <span  className={classes.label}>Make:*</span>&nbsp;&nbsp;(eg. Honda, Bajaj)
                                </label>
                                <input type="text" name="make" required
                                  onBlur={event =>
                                    validateAndUpdateFormdata(event, formData)
                                  }
                                  className={
                                    formData.make.error
                                      ? "invalid"
                                      : formData.make.value
                                      ? "valid"
                                      : ""
                                  }/>
                                {formData.make.error && (
                                  <p className={classes.formError}>
                                    {formData.make.errorMessage}
                                  </p>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <label htmlFor="model">
                                <span  className={classes.label}>Model:*</span>&nbsp;&nbsp;(eg. Activa, Pulsar)
                              </label>
                              <input type="text" name="model" required
                                onBlur={event =>
                                  validateAndUpdateFormdata(event, formData)
                                }
                                className={
                                  formData.model.error
                                    ? "invalid"
                                    : formData.model.value
                                    ? "valid"
                                    : ""
                                }/>
                              {formData.model.error && (
                                <p className={classes.formError}>
                                  {formData.model.errorMessage}
                                </p>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      
                      {/* 4nd row for Appointment Form */}
                      <Grid container component="div" direction="row" justify="space-evenly">
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                          <Grid container component="div" direction="row"  justify="space-evenly" >
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                                <label htmlFor="variant">
                                  <span  className={classes.label}>Variant:</span>&nbsp;&nbsp;(eg. 150cc std)
                                </label>
                                <input type="text" name="variant" id="variant"
                                  onBlur={event =>
                                    updateFormdata(event, formData)}
                                    className={
                                      formData.variant.error
                                        ? "invalid"
                                        : formData.variant.value
                                        ? "valid"
                                        : ""
                                    }/>
                                  {formData.variant.error && (
                                    <p className={classes.formError}>
                                      {formData.variant.errorMessage}
                                    </p>
                                  )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <label htmlFor="kmsdriven">
                                <span  className={classes.label}>KMs Driven:</span>&nbsp;&nbsp;(eg. 40,0000 km)
                              </label>
                              <input type="text" name="kmsdriven" id="kmsdriven"
                                onBlur={event =>
                                  updateFormdata(event, formData)
                                }
                                className={
                                  formData.kmsdriven.error
                                    ? "invalid"
                                    : formData.kmsdriven.value
                                    ? "valid"
                                    : ""
                                }/>
                              {formData.kmsdriven.error && (
                                <p className={classes.formError}>
                                  {formData.kmsdriven.errorMessage}
                                </p>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      
                      {/* 5nd row for Appointment Form */}
                      <Grid container component="div" direction="row" justify="space-evenly">
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                          <Grid container component="div" direction="row"  justify="space-evenly" >
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                                <label htmlFor="yom">
                                  <span  className={classes.label}>Year of Manufacture:*</span>&nbsp;&nbsp;(eg. 2013)
                                </label>
                                <input
                                  type="text"
                                  name="yom"
                                  onBlur={event =>
                                    validateAndUpdateFormdata(event, formData)
                                  }
                                  className={
                                    formData.yom.error
                                      ? "invalid"
                                      : formData.yom.value
                                      ? "valid"
                                      : ""
                                  }/>
                                {formData.yom.error && (
                                  <p className={classes.formError}>
                                    {formData.yom.errorMessage}
                                  </p>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <label htmlFor="promocode">
                                <span  className={classes.label}>Promocode:</span>&nbsp;&nbsp;(If applicable)
                              </label>
                              <input type="text" name="promocode" id="promocode"
                                onBlur={event =>
                                  updateFormdata(event, formData)
                                }
                                className={
                                  formData.promocode.error
                                    ? "invalid"
                                    : formData.promocode.value
                                    ? "valid"
                                    : ""
                                }/>
                              {formData.promocode.error && (
                                <p className={classes.formError}>
                                  {formData.promocode.errorMessage}
                                </p>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container component="div" direction="row" justify="space-evenly">
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                      </Grid>
                      <Grid container component="div" direction="row" justify="space-evenly" className={classes.banner+' form-group'}>
                              <Grid item xs={11} sm={11} md={11} lg={11}>
                                <label className="fieldname">
                                    <input type="checkbox" className="filled-in" defaultChecked />
                                    <span>Interested in Exchange</span>
                                </label>
                              </Grid>
                          </Grid>
                          <Grid container component="div" direction="row" justify="space-evenly">
                            <Grid item xs={11} sm={11} md={11} lg={11}>
                              <label htmlFor="image">
                                <span className={classes.label}> Upload images </span>&nbsp;&nbsp;(Images should be in jpeg, png or tiff formats only)
                              </label>
                              <br />
                              <input 
                               title=""
                               className="form-control transparent" 
                               type="file"
                               onChange={(event)=>selectFiles(event, formData)} 
                               multiple
                               />
                              <br />
                              { formData.image.message? <p className="text-info">{formData.image.message}</p>: ''}
                              {/* {formData.image.error && (
                                <p className={classes.formError}>
                                  {formData.image.errorMessage}
                                </p>
                              )} */}
                              <div className={matches ? "preview-image-container" : "preview-image-container-mobile"}>
                                {previewImage.map((file, _i)=>(
                                  <div key={_i} className="image-preview">
                                    <img src={URL.createObjectURL(file)} width={200} height={150} />
                                    <span title="Remove image"><DeleteIcon className="delete-icon" onClick={() => removeImageHandler(_i)} /></span>
                                  </div>
                                  ))}
                              </div>  
                            </Grid> 
                          </Grid>
                        </Grid>
                      <Grid container component="div" direction="row">
                        <Grid item xs={12} sm={12} md={12} lg={12} className="center-align">
                          <div className="form-group">
                            <button type="button" className="btn" onClick={submitForm} >
                              Sell Your Vehicle
                            </button>
                            {/* <button type="button" onClick={handleOpen}>
                              Open Modal
                            </button> */}
                          </div>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={11} sm={11} md={11} lg={11}>
            <SellingProcess heading="BikeBazaar Advantage"/>
          </Grid>
        </Grid>
        }
     
      <Footer />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    filter: state.vehicleDetails.filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    kmFilter: (category, filterdata) =>
      dispatch(actions.getVehicles(category, filterdata))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sell);
