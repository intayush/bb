import React, { useState, useEffect } from "react";
import "./Contact.css";
// import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from '@material-ui/core/FormControl';
import GoogleMap from "../GoogleMap/GoogleMap";
import headingLines from "../../assets/heading-lines.svg";
import facebookIcon from "../../assets/icons/social_media/Facebook.svg";
import twitterIcon from "../../assets/icons/social_media/Twitter.svg";
import instaIcon from "../../assets/icons/social_media/Instagram.svg";
import linkedinIcon from "../../assets/icons/social_media/Linkedin.svg";
import EmailIcon from "@material-ui/icons/Email";
import CallIcon from "@material-ui/icons/Call";
import { grey  } from "@material-ui/core/colors";
import isEmpty from "validator/lib/isEmpty";
// import isAlpha from "validator/lib/isAlpha";
import isEmail from "validator/lib/isEmail";
// import isMobilePhone from "validator/lib/isMobilePhone";
// import isAlphaNumeric from "validator/lib/isAlphanumeric";
import isNumeric from "validator/lib/isNumeric";
import isAscii from "validator/lib/isAscii";
// import Tooltip from "../UI/Tooltip/Tooltip";
import axios from "axios";
import Modal from '@material-ui/core/Modal';
import closeIcon from "../../assets/Close.png";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import mobiledivider from "../../assets/mobiledivider.png";

const BBRadio = withStyles({
  root: {
    "&$checked": {
      color: "#ff0000"
    }
  },
  checked: {}
})(props => <Radio {...props} />);

const useStyles = makeStyles(theme => ({
  body: {
    backgroundColor: '#f7f7f7'
  },
  banner: {
    marginTop: theme.spacing(2)
  },
  formContainer: {
    marginTop: theme.spacing(1)
  },
  paper1: {
    padding: theme.spacing(3),
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: "100%",
    width:'100%'
    
  },
  paper2: {
    padding: theme.spacing(3),
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: "100%"
  },

  mobilepaper2:{
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    height: "100%",
    marginTop:'4%'
  },
  mapContainer: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  formError: {
    color: "red",
    fontSize: 13
  },
  label:{
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: '0.83px'
  },
  mobileLabel:{},
  submit:{
    background: '#ff0000',
    padding: '6px 30px',
    borderRadius: 24,
    height: 48,
    fontSize: 18,
    fontWeight: 600,  
    textTransform: 'capitalize',
    boxShadow: 'none',
    marginLeft: 10,
    marginTop: 10
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
      const nameValue = value.replace(/ /g, '');
      return !isAscii(nameValue) || value.length > 100 ? "Name must contain only Alphabets" : "";
    }
    case "mobile": {
      return value.length > 15 || !isNumeric(value) ? "Invalid Mobile Number" : "";
    }
    case "email": {
      return !isEmail(value) ? "Invalid Email Id" : "";
    }
    case "query": {
      return !isAscii(value) || value.length > 300
        ? "Query must only have Alphanumeric Characters"
        : "";
    }
    default: {
      return false;
    }
  }
};

const Contact = props => {
  const classes = useStyles();
  const theme=useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
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
    mobile: {
      value: "",
      error: false,
      errorMessage: ""
    },
    email: {
      value: "",
      error: false,
      errorMessage: ""
    },
    interestedIn: {
      value: "Buy",
      error: false,
      errorMessage: ""
    },
    query: {
      value: "",
      error: false,
      errorMessage: ""
    }
  });

  const validateAndUpdateFormdata = (event, formData) => {
    let targetValue = event.target.value;
    let targetName = event.target.name;
    let errorMessage = "";
    let error = false;
    if (isEmpty(targetValue)) {
      if(targetName != 'query'){
        errorMessage = "This field is required";
        error = true;
      }
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

  const [success, setSuccess] = React.useState(false);
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
      <div className={success ? classes.modalBoxSuccess : classes.modalBoxErr}>
        <h4>{modalMesg}</h4>
        <img style={{marginLeft: '10px', cursor: 'pointer'}} onClick={handleModalClose} src={closeIcon} height="20"  alt="" />
      </div>
    </Modal>
  );

  const submitForm = async(event) => {
    event.preventDefault();
    const formDataCopy = formData;
    let errorFlag = false;
    Object.entries(formData).forEach(data => {
      let targetValue = data[1].value;
      let targetName = data[0];
      let errorMessage = "";
      let error = false;
      if(targetName !== "query" ) {
        if(targetValue === ""){
          errorMessage = "This field is required";
          error = true;
        }
      }
      if (error) {
        errorFlag = true;
      }
      if(targetName !== "interestedIn" ) {
        formDataCopy[targetName].errorMessage = errorMessage;
        formDataCopy[targetName].error = error;
      }
    });
    if(!errorFlag) {
      axios
        .post("/apis/userDetail/contactUs", formData)
        .then(response => {
          // console.log("resp: ", response)
          // setTooltipState({
          //   open: true,
          //   message: "Your details have been saved",
          //   variant: "success"
          // });
          setSuccess(true);
          setOpen(true);
          setModalMesg("Thank you for sharing your details. We'll get back to you soon to answer your queries.")
        })
        .catch(err => {
          console.log(err);
          // setTooltipState({
          //   open: true,
          //   message: "Something went wrong, please try later.",
          //   variant: "error"
          // });
          setSuccess(false);
          setOpen(true);
          setModalMesg("Something went wrong, please try later.")
        });
    } else {
      setFormData({
        ...formData,
        formDataCopy
      });
    }
  };

  const [interest, setInterest] = React.useState('Buy');

  const handleChange = (event) => {
    setInterest(event.target.value);
    setFormData({
      ...formData,
      interestedIn: event.target.value
    })
  };

  return (
    <div id="Contact" className={classes.body}>
      {tooltip}
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
          <Banner
            navigation="Contact Us"
            heading="Get In Touch"
            text=""
            path={props.location.pathname}
          />
          <Grid container component="div" direction="row">
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <Paper elevation={3} className={classes.paper1}>
                <div className="center-align">
                  {matches?<h5 className="contact-heading">Contact Us</h5>:<p style={{fontSize:'15px',fontWeight:'bold',color:'#ff0000'}}>Contact Us</p>}
                  {matches?<img src={headingLines} alt="" className="heading-line" />:<img src={mobiledivider} alt="mobile-divider-line"/>}
                </div>
                {matches?<p className="sub-heading-black">Office:</p>:<p style={{fontSize:'13px',fontWeight:'bold',color:'black'}}>Office: </p>}
                <p className={matches?"sub-heading-red":"mobileSub-heading-red"}>
                  BikeBazaar<sup>TM</sup>
                </p>
                
               {matches?<p className="address">
                The Daftar, Bungalow No. 261/2/7
                <br />
                Silver Oak Society, Baner Road, Baner
                <br />
                Pune, Maharashtra 411045.
                <br />
                </p>:<p className="mobile-address">The Daftar, Bungalow No. 261/2/7
                Silver Oak Society, Baner Road, Baner
                Pune, Maharashtra 411045.</p>} 


                <p className={matches?"sub-heading-black":"mobileSub-heading-black "}>Contact:</p>
                <a target="_blank" href="tel: 8956853498" >

                 {matches?<div className="mobile">
                    <CallIcon style={{ fontSize: 23, color: grey[900] }} />
                    &nbsp;&nbsp;&nbsp;
                      <span style={{color:'black', opacity: '0.5'}}> 8956853498</span>
                  </div>:<><CallIcon style={{fontSize:'15px',color:grey[900]}} />
                  &nbsp;&nbsp;&nbsp;<span style={{fontSize:'10px',color:'#232b2b'}}>8956853498</span>
                  <br/>
                  </>} 

                </a>

                <a target="_blank" href="mailto:connect@bikebazaar.com" >

                  {/* <div className="mail">
                    <EmailIcon style={{ fontSize: 23, color: grey[900] }} />
                    &nbsp;&nbsp;&nbsp;
                    <span style={{color:'black', opacity: '0.5'}}>connect@bikebazaar.com</span>
                  </div>
                   */}
                     {matches?<div className="mobile">
                    <EmailIcon style={{ fontSize: 23, color: grey[900] }} />
                    &nbsp;&nbsp;&nbsp;
                      <span style={{color:'black', opacity: '0.5'}}> connect@bikebazaar.com</span>
                  </div>:<><EmailIcon style={{fontSize:'15px',color:grey[900]}} />
                  &nbsp;&nbsp;&nbsp;<span style={{fontSize:'10px',color:'#232b2b'}}>connect@bikebazaar.com</span>
                  </>} 
                </a>
                {matches?<p className="sub-heading-black">Follow Us On:</p>:<p style={{fontSize:'13px',fontWeight:'bold',color:'black'}}>Follow Us On:</p>}
                {matches?<div className="social-media-links">
                  <a href="https://www.facebook.com/BikeBazaaar">
                    <img src={facebookIcon} alt="" height="22" />
                  </a>
                  <a href="https://twitter.com/BikeBazaaar" >
                    <img src={twitterIcon} alt="" height="22" />
                  </a>
                  <a href="https://www.instagram.com/bikebazaaar/" >
                    <img src={instaIcon} alt="" height="22" />
                  </a>
                  <a href="https://www.linkedin.com/company/bikebazaar">
                    <img src={linkedinIcon} alt="" height="22" />
                  </a>
                </div>:<div style={{idth:'100%'}} >
                  <a href="https://www.facebook.com/BikeBazaaar">
                    <img  src={facebookIcon} alt="" height="13" />
                  </a>
                  <a href="https://twitter.com/BikeBazaaar" >
                    <img style={{marginLeft:'5%'}} src={twitterIcon} alt="" height="13" />
                  </a>
                  <a href="https://www.instagram.com/bikebazaaar/" >
                    <img style={{marginLeft:'5%'}}  src={instaIcon} alt="" height="13" />
                  </a>
                  <a href="https://www.linkedin.com/company/bikebazaar">
                    <img  style={{marginLeft:'5%'}}  src={linkedinIcon} alt="" height="13" />
                  </a>
                </div>}
                
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7}>
              <Paper elevation={3} className={matches?classes.paper2:classes.mobilepaper2}>
                <div className="center-align">
                  {matches? <h5 className="contact-heading">Contact Form</h5>:<p style={{fontSize:'15px',fontWeight:'bold',color:'#ff0000'}}>Contact Us</p>}
                  <img src={matches?headingLines:mobiledivider} alt="" className="heading-line" />
                </div>
                <div id="contactForm">
                  <form>
                    <Grid container component="div" direction="row">
                      <Grid item xs={11} sm={11} md={12} lg={12}>
                        <label htmlFor="name" className="black-text">
                          <span className={classes.label}>Name:*</span>&nbsp;&nbsp;(eg. Varunam Reddy)
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder=""
                          onBlur={event =>
                            validateAndUpdateFormdata(event, formData)
                          }
                          className={
                            formData.name.error
                              ? "invalid"
                              : formData.name.value
                              ? "valid"
                              : ""
                          }
                        />
                        {formData.name.error && (
                          <p className={classes.formError}>
                            {formData.name.errorMessage}
                          </p>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container component="div" direction="row" justify="space-between" className={classes.banner}>
                      <Grid item xs={11} sm={12} md={5} lg={5}>
                        <label htmlFor="mobilno" className="black-text">
                          <span  className={classes.label}>Mobile No:*</span>&nbsp;&nbsp;(eg. +91 9999999999)
                        </label>
                        <input type="text" name="mobile" id="mobile" placeholder=""
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
                      <Grid item xs={11} sm={11} md={6} lg={6}>
                        <label htmlFor="email" className="black-text">
                          <span className={classes.label}>Email*:</span>&nbsp;&nbsp;(eg. abc@gmail.com)
                        </label>
                        <input type="email" name="email" id="email" placeholder=""
                          onBlur={event =>
                            validateAndUpdateFormdata(event, formData)
                          }
                          className={
                            formData.email.error
                              ? "invalid"
                              : formData.email.value
                              ? "valid"
                              : ""
                          }
                        />
                        {formData.email.error && (
                          <p className={classes.formError}>
                            {formData.email.errorMessage}
                          </p>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container component="div" direction="row" className="interest-container">
                      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.banner}>
                      <p><span className={classes.label}>Interested In:*</span></p>
                      <FormControl component="fieldset" style={{width: "100%"}}>
                        <RadioGroup row aria-label="interest" name="interestedIn" value={interest} onChange={handleChange} style={{width:"100%", display: "flex", justifyContent:"space-between"}}>
                          <FormControlLabel value="Buy" control={<BBRadio />} label="Buy" />
                          <FormControlLabel value="Sell" control={<BBRadio />} label="Sell" />
                          <FormControlLabel value="Franchise" control={<BBRadio />} label="Franchise" />
                          <FormControlLabel value="other" control={<BBRadio />} label="Other" />
                        </RadioGroup>
                      </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container component="div" direction="row" className={classes.banner}>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <label htmlFor="query" className="black-text">
                          <span className={classes.label}>Query:</span> (Ask any query here, we will get back to you
                          soon)
                        </label>
                        <textarea id="query" name="query"
                          onBlur={event =>
                            validateAndUpdateFormdata(event, formData)
                          }
                          className={
                            formData.query.error
                              ? "invalid materialize-textarea"
                              : formData.query.value
                              ? "valid materialize-textarea"
                              : "materialize-textarea"
                          }
                        ></textarea>
                        {formData.query.error && (
                          <p className={classes.formError}>
                            {formData.query.errorMessage}
                          </p>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container component="div" direction="row" className={classes.banner}>
                      <Grid item xs={12} sm={12} md={12} lg={12} className="center-align">
                        <button type="button" className={classes.submit+' btn'} onClick={submitForm}>Share</button>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Paper>
            </Grid>
          </Grid>
          <Grid container component="div" direction="row" className={classes.mapContainer}>
            <Grid item xs={12} sm={12} md={12} lg={12} className="mapContainer">
              <GoogleMap
                center={{ lat: 18.552560, lng: 73.804782 }}
                zoom={12}
                location=""
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default Contact;
