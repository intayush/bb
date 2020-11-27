import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css'
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
const Banner = (props) =>  {
	const theme=useTheme();
	const matches = useMediaQuery(theme.breakpoints.up("sm"));
    return (
        <div className={matches?"pageDtl":"mobilePageDtl"}>
					<ul>
						<li><Link to="/">Home</Link></li>
						<li className="current"><Link to={props.path}>{props.navigation}</Link></li>
					</ul>
					<h1>{props.heading}</h1>
					<p>{props.text}</p>
				</div>
    );
}

export default Banner;