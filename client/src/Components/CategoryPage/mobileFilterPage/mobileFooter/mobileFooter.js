import React from "react";

import {Link} from "react-router-dom";
import "./mobileFooter.css";
        

    const mobileFooter=()=>{
        return(
         <div className="container">
                <div > Sort By</div>
                <Link style={{letterSpacing:"0px"}} to="/mobileFilterPage"><div style={{color:'black'}}> Filter</div></Link>
         </div>
        )
      
      }

export default mobileFooter;