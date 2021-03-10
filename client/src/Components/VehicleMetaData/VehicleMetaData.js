import React from 'react';
import Grid from "@material-ui/core/Grid";
import blackHeadingLines from '../../assets/black-heading-lines.svg';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import mobiledivider from "../../assets/mobiledivider.png";

const VehicleMetaData = (props) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Grid container component="div" direction="row">
            <Grid item xs={12} md={12} sm={12} lg={12} className="vehicleSummarySec">
                <div className="vehicleSummary">
                    {matches?<h3>More details about the Two-wheeler</h3>:<p style={{fontSize:'11px',fontWeight:'bold',color:'red'}}>More details about the Two-wheeler</p>}
                    {matches?<h4>Additional Information</h4>:<p style={{fontSize:'11px',fontWeight:'bold'}}>Additional Information</p>}
                    {props.vehicleDetails.additionalInfo ? <p>{props.vehicleDetails.additionalInfo}</p> : null}
                    {matches&&<br/>}
                    { matches?<h4>Key Information</h4> :<p style={{fontSize:'11px',fontWeight:'bold'}}>Key Information</p>}
                    <ul className="list">
                    {props.vehicleDetails.bulletInfo1 ? <li>{props.vehicleDetails.bulletInfo1}</li> : null}
                    {props.vehicleDetails.bulletInfo2 ? <li>{props.vehicleDetails.bulletInfo2}</li> : null}
                    {props.vehicleDetails.bulletInfo3 ? <li>{props.vehicleDetails.bulletInfo3}</li> : null}
                    {props.vehicleDetails.bulletInfo4 ? <li>{props.vehicleDetails.bulletInfo4}</li> : null}
                    {props.vehicleDetails.bulletInfo5 ? <li>{props.vehicleDetails.bulletInfo5}</li> : null}
                    {props.vehicleDetails.bulletInfo6 ? <li>{props.vehicleDetails.bulletInfo6}</li> : null}
                    </ul>
                </div>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12} className="vehicleReportSec">
                <div className="vehicleReport center-align">
                    {matches?<h2>Inspection Report</h2>:<p style={{fontSize:'12px',fontWeight:'bold',color:'red'}}>Inspection Report</p>}
                    {matches?<><div><img alt="" src={blackHeadingLines} alt=""/></div><br/></>:<img src={mobiledivider}/>}
                    {matches?<p>This bike has gone through a thorough inspection and is certified by our auto experts having extensive experience.</p>:<p style={{fontSize:'12px'}}>This bike has gone through a thorough inspection and is certified by our auto experts having extensive experience.</p>}
                    {matches?<p>It has also gone through a refurbishment process and is absolutely ready to take you on your adventurous journey.</p>:<p style={{fontSize:'12px'}}>It has also gone through a refurbishment process and is absolutely ready to take you on your adventurous journey.</p>}
                </div>
            </Grid>
        </Grid>
    )
}

export default VehicleMetaData;