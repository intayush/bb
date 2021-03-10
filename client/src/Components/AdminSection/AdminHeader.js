import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import bikeBazaarLogo from "../../assets/BikeB-logo.png";
import Logout from "../../assets/LogOut.png";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    height: 80,
    padding: 11,
    backgroundColor: "red",
  },
}));

const AdminHeader = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(actions.logoutAdminUser())
    history.push("/admin/signin")
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <img alt="" height="25" src={bikeBazaarLogo} />
            <span style={{ fontWeight: "bold" }}>Admin</span>
          </Typography>
          {
            location.pathname !== "/admin/signin" &&
            <>
            <img alt="" src={Logout} />
            <span
              style={{
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </span>
          </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AdminHeader;
