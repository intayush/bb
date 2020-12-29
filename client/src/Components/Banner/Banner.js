import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css'
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useSelector} from "react-redux";

const Banner = (props) =>  {
	const theme=useTheme();
	const {category}=useSelector(state=>state.vehicleDetails);
	const CATEGORY = ["All", "Motorcycle", "Scooter", "High-End Motorcycle"];
	const matches = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <div className={matches?"pageDtl":"mobilePageDtl"}>

					<ul>
							{category?<><li><Link to="/">Home</Link></li>
						
						<li className="current"><Link to={CATEGORY[category]}>{CATEGORY[category]}</Link></li></>:
						<><li><Link to="/">Home</Link></li>
						
						<li className="current"><Link to={props.path}>{props.navigation}</Link></li></>}
					</ul>
					{category?<h1>{CATEGORY[category]}</h1>:<h1>{props.heading}</h1>}
					<p>{props.text}</p>
				</div>
    );
}

export default Banner;
