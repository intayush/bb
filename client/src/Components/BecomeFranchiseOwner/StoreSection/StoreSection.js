import React from 'react';
import './StoreSection.css';
import Grid from "@material-ui/core/Grid";
import headingLines from '../../../assets/heading-lines.svg';
import jkbIcon from '../../../assets/stores/bb_ jkb_motors.jpg';
import mvcIcon from '../../../assets/stores/bb_mvc_wheels.jpg';
import stsIcon from '../../../assets/stores/bb_sts_thrissur.jpg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import mobiledivider from "../../../assets/mobiledivider.png";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
const StoreSection = () => {
    const theme=useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
        },
    };


    return (
        <div id="StoreSection">
            {matches?<h2>BikeBazaar Stores</h2>:<div style={{justifyContent:'center',textAlign:'center',marginTop:'5%'}}><span style={{fontSize:'13px',fontWeight:'bold'}}>BikeBazaar Stores</span></div>}
            {matches?<><div className="flex-center"><img src={headingLines} alt=""/></div><br /></>:<div style={{alignItems:'center',textAlign:'center'}}><img src={mobiledivider} alt="mobileDivider"/></div>}
            <Grid container component="div" direction="row">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                {/* <Carousel responsive={responsive} className="flex-center"> */}
                <Grid container component="div" direction="row" style={{display: 'flex', justifyContent:'space-around'}}>
                    <Grid item xs={12} sm={12} md={4} lg={4} style={{paddingBottom: '13px'}} >
                    <div className="StoreCard">
                        <img src={jkbIcon} alt="" />
                        <div className="detail">
                            {matches?<h3>BikeBazaar – JKB Motors, Aluva</h3>:<span className="mobileTextHeader">BikeBazaar – JKB Motors, Aluva</span>}
                            
                            <p className={matches?"address":"mobileaddress"}>
                                Jkb - BikeBazaar, Near JKB Bajaj,Pulinchode Jn. Bypass,
                                Aluva - 683101, Kerala, India
                            </p>
                            <br className="clr"/>
                            <p className={matches?"location":"mobilelocation"}>Aluva, Kerala</p>
                        </div>
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                    <div className="StoreCard">
                        <img src={mvcIcon} alt="" />
                        <div className="detail">
                            {matches?<h3>BikeBazaar – MCV Wheels, Rajahmundry</h3>:<span className="mobileTextHeader">BikeBazaar – MCV Wheels, Rajahmundry</span>}
                            <p className={matches?"address":"mobileaddress"}>
                                D. No. 77/8/7-1, Beside Bajaj Two Wheeler Showroom, R.T.C Complex Road, Rajahmundry - 533103, Andhra Pradesh, India.
                            </p>
                            <br className="clr"/>
                            <p className={matches?"location":"mobilelocation"}>Rajahmundry, AP</p>
                        </div>
                    </div>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={6} lg={5} style={{paddingBottom: '13px'}} >
                    <div className="StoreCard">
                        <img src={mvcIcon} alt="" />
                        <div className="detail">
                            <h3>BikeBazaar – Undelcared, Kolkata</h3>
                            <p className="address">
                                unknown
                            </p>
                            <br className="clr"/>
                            <p className="location">Kolkata, West Bengal</p>
                        </div>
                    </div>
                    </Grid> */}
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                    <div className="StoreCard">
                        <img src={stsIcon} alt="" />
                        <div className="detail">
                           {matches? <h3>BikeBazaar – Sitaram Trade & Services, Thrissur</h3>:<span className="mobileTextHeader">BikeBazaar – Sitaram Trade & Services, Thrissur</span>}
                            <p className={matches?"address":"mobileaddress"}>
                                Sitaram Trade & Services, PT Manual Road, Kollothumpadam, Patturaikal, Thrissur, Kerala
                            </p>
                            <br className="clr"/>
                            <p className={matches?"location":"mobilelocation"}>Thrissur, Kerala</p>
                        </div>
                    </div>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={6} lg={5} style={{paddingBottom: '13px'}} >
                    <div className="StoreCard">
                        <img src={mvcIcon} alt="" />
                        <div className="detail">
                            <h3>BikeBazaar – Rajaji Nagar, Bangalore</h3>
                            <p className="address">
                                New no.72, Old No.60/61, Dr. Rajkumar Road, Rajaji Nagar, Opp Srinath sanitary wares,Bangalore - 560010
                            </p>
                            <br className="clr"/>
                            <p className="location">Bangalore, Karnataka</p>
                        </div>
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={5}>
                    <div className="StoreCard">
                        <img src={mvcIcon} alt="" />
                        <div className="detail">
                            <h3>BikeBazaar – Mootha Centre, Nungambakkam</h3>
                            <p className="address">
                                Mootha Centre, Door No 23, Kodambakkam High road, Nungambakkam, Chennai - 600034
                            </p>
                            <br className="clr"/>
                            <p className="location">Nungambakkam, Chennai</p>
                        </div>
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={5} style={{paddingBottom: '13px'}} >
                    <div className="StoreCard">
                        <img src={mvcIcon} alt="" />
                        <div className="detail">
                            <h3>BikeBazaar – S/F Arya Samaj, Karol Bagh</h3>
                            <p className="address">
                                1694 S/F Arya Samaj Road Karol Bagh, Near Grace Hotel & Sat Bharaba Govt School, l Karol Bagh, New Delhi - 110005
                            </p>
                            <br className="clr"/>
                            <p className="location">Karol Bagh, New Delhi</p>
                        </div>
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={5}>
                    <div className="StoreCard">
                        <img src={mvcIcon} alt="" />
                        <div className="detail">
                            <h3>BikeBazaar – Sector-12 A, Gurgaon</h3>
                            <p className="address">
                                SCO 37, 3rd Floor, Hall No.1 Sector-12 A, Huda Market, Opp. Telephone Exchange, Near Bikanerwala, Gurgaon - 122001
                            </p>
                            <br className="clr"/>
                            <p className="location">Gurgaon, Haryana</p>
                        </div>
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={5} style={{paddingBottom: '13px'}} >
                    <div className="StoreCard">
                        <img src={mvcIcon} alt="" />
                        <div className="detail">
                            <h3>BikeBazaar – Babukhan Estate, Hyderabad</h3>
                            <p className="address">
                                5th Floor, Flat No 509/A, Babukhan Estate, Basheerbagh, Hyderabad, Telanagna - 500001
                            </p>
                            <br className="clr"/>
                            <p className="location">Hyderabad, Telanagna</p>
                        </div>
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={5}>
                    <div className="StoreCard">
                        <img src={mvcIcon} alt="" />
                        <div className="detail">
                            <h3>BikeBazaar – ARG CORPORATE PARK, Jaipur</h3>
                            <p className="address">
                                ARG CORPORATE PARK GOPAL BARI BUILDING, Ajmer Road, Panch Batti, Mission Compound, Hathroi, Jaipur, Rajasthan
                            </p>
                            <br className="clr"/>
                            <p className="location">Jaipur, Rajasthan</p>
                        </div>
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={5} style={{paddingBottom: '13px'}}>
                    <div className="StoreCard">
                        <img src={mvcIcon} alt="" />
                        <div className="detail">
                            <h3>BikeBazaar – Sagar Tech Plaza A, Mumbai</h3>
                            <p className="address">
                                Office N0. 208, 2nd Floor, Sagar Tech Plaza A, Sakinaka Junction, Mumbai - 400072
                            </p>
                            <br className="clr"/>
                            <p className="location">Mumbai, Maharashtra</p>
                        </div>
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={5}>
                    <div className="StoreCard">
                        <img src={mvcIcon} alt="" />
                        <div className="detail">
                            <h3>BikeBazaar – Jejani Bhavan, Nagpur</h3>
                            <p className="address">
                                Jejani Bhavan, Above Khamgaon urban Bank, Gandhi Grain Market, Telephone Exchange Square, Central Avenue Road, Nagpur - 440009
                            </p>
                            <br className="clr"/>
                            <p className="location">Nagpur, Maharashtra</p>
                        </div>
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={5}>
                    <div className="StoreCard">
                        <img src={mvcIcon} alt="" />
                        <div className="detail">
                            <h3>BikeBazaar – Govind Niwas, Pune</h3>
                            <p className="address">
                                Office no. 2 and 3, 1st Floor, Govind Niwas, Rasta Peth, Near Naidu Ganapati Rasta Peth, Pune - 411011
                            </p>
                            <br className="clr"/>
                            <p className="location">Pune, Maharashtra</p>
                        </div>
                    </div>
                    </Grid> */}
                </Grid>
                {/* </Carousel> */}
                </Grid>
            </Grid>
        </div>
    )
}

export default StoreSection;
