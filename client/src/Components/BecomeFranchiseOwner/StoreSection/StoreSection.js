import React from 'react';
import './StoreSection.css';
import Grid from "@material-ui/core/Grid";
import headingLines from '../../../assets/heading-lines.svg';
import bikeIcon from '../../../assets/ina.png';
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
          items: 1,
        },
    };


    return (
        <div id="StoreSection">
            <h2>BikeBazaar Stores</h2>
            <div className="flex-center"><img src={headingLines} alt=""/></div><br />
            <Grid container component="div" direction="row">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                <Carousel responsive={responsive} className="flex-center">
                    <div className="StoreCard">
                        <img src={bikeIcon} alt="" />
                        <div className="detail">
                            <h3>BikeBazaar, JKB Motors</h3>
                            <p className="address">
                                Jkb - Bike Bazaar, Near JKB Bajaj,Pulinchode Jn. Bypass,
                                Aluva - 683101, Kerala, India
                            </p>
                            <br className="clr"/>
                            <p className="location">Aluva, Kerala</p>
                        </div>
                    </div>
                    <div className="StoreCard">
                        <img src={bikeIcon} alt="" />
                        <div className="detail">
                            <h3>BikeBazaar, MCV Wheels</h3>
                            <p className="address">
                                D. No. 77/8/7-1, Beside Bajaj Two Wheeler Showroom, R.T.C Complex Road, Rajahmundry - 533103, Andhra Pradesh, India. Also put map of this location.
                            </p>
                            <br className="clr"/>
                            <p className="location">Rajahmundry, AP</p>
                        </div>
                    </div>
                </Carousel>
                </Grid>
            </Grid>
        </div>
    )
}

export default StoreSection;
