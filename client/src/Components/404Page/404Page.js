import React from "react";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "./Footer404";
import "./404Page.css";
import gif404 from "../../assets/404.gif";
import { makeStyles } from "@material-ui/core/styles";
import {useHistory} from "react-router-dom"


const useStyles = makeStyles((theme) => ({
    submitButton: {
        position: "relative",
        background: "#ff0000",
        padding: "6px 30px",
        borderRadius: 24,
        height: 48,
        fontSize: 20,
        fontWeight: 600,
        textTransform: "capitalize",
        boxShadow: "none",
        marginLeft: 10,
        top: 52,
      },
  }));

const NotFound = () => {

    const classes=useStyles();
    const history = useHistory();
  return (
        <div>
                <MainMenu/>
                    <div className="content_container">
                            <div className="content_container_div">
                                <span style={{fontSize:'50px',fontWeight:'bold'}}>Looks like you're lost</span><br/>    
                                <span style={{fontSize:'25px',fontWeight:'bold'}}>The web page you are looking for is not available</span><br/>
                                
                                <button
                                    type="submit"
                                    style={{ marginBottom: 5 }}
                                    className={classes.submitButton + " btn"}
                                    onClick={()=>history.push('/')}
                                >
                                    Back to Home
                                </button>
                            </div>
                            <img  src={gif404}/>
                    </div>
                <Footer/>
               
        </div>
  );
};

export default NotFound;
