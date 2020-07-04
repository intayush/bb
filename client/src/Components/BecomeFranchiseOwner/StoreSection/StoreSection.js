import React from 'react';
import './StoreSection.css';
import Grid from "@material-ui/core/Grid";
import headingLines from '../../../assets/heading-lines.svg';
import jkbIcon from '../../../assets/stores/bb_ jkb_motors.jpg';
import mvcIcon from '../../../assets/stores/bb_mvc_wheels.jpg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const StoreSection = () => {
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
            <h2>BikeBazaar Stores</h2>
            <div className="flex-center"><img src={headingLines} alt=""/></div><br />
            <Grid container component="div" direction="row">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                {/* <Carousel responsive={responsive} className="flex-center"> */}
                <Grid container component="div" direction="row" style={{display: 'flex', justifyContent:'space-around'}}>
                    <Grid item xs={12} sm={12} md={6} lg={5}>
                    <div className="StoreCard">
                        <img src={jkbIcon} alt="" />
                        <div className="detail">
                            <h3>BikeBazaar – JKB Motors, Aluva</h3>
                            <p className="address">
                                Jkb - BikeBazaar, Near JKB Bajaj,Pulinchode Jn. Bypass,
                                Aluva - 683101, Kerala, India
                            </p>
                            <br className="clr"/>
                            <p className="location">Aluva, Kerala</p>
                        </div>
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={5}>
                    <div className="StoreCard">
                        <img src={mvcIcon} alt="" />
                        <div className="detail">
                            <h3>BikeBazaar – MCV Wheels, Rajahmundry</h3>
                            <p className="address">
                                D. No. 77/8/7-1, Beside Bajaj Two Wheeler Showroom, R.T.C Complex Road, Rajahmundry - 533103, Andhra Pradesh, India.
                            </p>
                            <br className="clr"/>
                            <p className="location">Rajahmundry, AP</p>
                        </div>
                    </div>
                    </Grid>
                </Grid>
                {/* </Carousel> */}
                </Grid>
            </Grid>
        </div>
    )
}

export default StoreSection;
