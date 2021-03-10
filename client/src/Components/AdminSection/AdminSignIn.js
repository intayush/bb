import React, { useState } from "react";
import Header from "./AdminHeader";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { Container as MaterialUiContainer } from "@material-ui/core/";
import { Grid as MaterialUiGrid } from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { useSelector, useDispatch } from "react-redux";
import "./AdminSignIn.css";

const useStyles = makeStyles((theme) => ({
  AdminArea: {
    padding: 50,
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "45ch",
    },
  },
  margin: {
    margin: theme.spacing(1)
  },
  fieldname: {
    width: '141px',
    height: '37px',
    fontFamily: 'Roboto',
    fontSize: '28px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.28px',
    color: '#101010',
  }
}));

const StyledTextField = withStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      padding: theme.spacing(1),
    },
    '& label.Mui-focused': {
      color: 'red',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'transparent',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'grey',
      },
      '&:hover fieldset': {
        borderColor: 'grey',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'red',
      },
    },
  },
}))(TextField);

const AdminSignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const admin = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors)
  const [showError, setShowError] = useState(true);
  
  if(admin.isAuthenticated === true){
    history.push("/admin/homepage")
  }

  const [formData, setFormData] = useState({
    loginid: "",
    password: ""
  })

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(actions.loginAdminUser(formData))
    setTimeout(() => {
      setShowError(true);
    }, 1000);
    setTimeout(() => {
      setShowError(false);
    }, 3500);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Header />
      <Box
        className={classes.AdminArea}
        boxShadow={3}
        bgcolor="background.paper"
        m={5}
        px="auto"
        mx="auto"
        textAlign="center"
        style={{ width: 940, height: 504 }}
      >
        <MaterialUiContainer style={{ padding: "10%",marginLeft:'5%', justifyContent:'center',textAlign: "center" }}>
        {showError && <span style={{color:'red', fontWeight:'bold'}}>{errors.error}</span>}
          <form className={classes.root} noValidate onSubmit={handleLogin} autoComplete="off">
            <MaterialUiGrid style={{display:'flex',textAlign:'center',alignItems:'center'}}>
              <label className={classes.fieldname} htmlFor="loginid">
                UserName
              </label>
              <StyledTextField
                className={classes.margin}
                type="text"
                name="loginid" 
                required 
                onChange={handleChange}
                variant="outlined"
              />
            </MaterialUiGrid>

            <MaterialUiGrid style={{display:'flex',alignItems:'center',marginLeft:'0.5%'}}>
              <label className={classes.fieldname} htmlFor="password">
                Password
              </label>
              <StyledTextField
                type="password"
                variant="outlined"
                name="password" 
                required 
                onChange={handleChange}
              />
            </MaterialUiGrid>

            <button className="submit-btn btn">Login</button>
          </form>
        </MaterialUiContainer>
      </Box>
    </>
  );
};

export default AdminSignIn;
