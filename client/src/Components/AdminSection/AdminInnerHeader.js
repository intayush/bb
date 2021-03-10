import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import bikeBazaarLogo from "../../assets/BikeB-logo.png";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Logout from "../../assets/LogOut.png";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";


const useStyles = makeStyles((theme) => ({
  select: {
    backgroundColor: "black",
    padding: "20px",
  },
  root: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    height: 80,
    padding: 11,
    backgroundColor: "red",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 285,
    marginLeft: "22%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  MenuItem: {
    display: "flex",
    flexDirection: "column",
    color: "white",
  },
}));


const StyledMenuItem = withStyles({
  root: {
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
      fontWeight: 700
    },
    color: 'white',
    backgroundColor: 'black',
    fontWeight: 200,
    fontSize:15,
    fontFamily: "inherit",
  },
})(MenuItem);

const AdminInnerHeader = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(actions.logoutAdminUser());
    history.push("/admin/signin");
  };

  const [dropdownTitle, setDropdownTitle] = useState("");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/admin/upload") setDropdownTitle("Single Two Wheeler Upload");
    if (path === "/admin/list") setDropdownTitle("Edit Two wheeler");
    if (path === "/admin/BulkUpload") setDropdownTitle("Bulk Upload");
  }, [location.pathname]);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
            }}
            variant="h6"
            className={classes.title}
          >
            <Link to="/admin/homepage">
              <img alt="" height="25" src={bikeBazaarLogo} />
            </Link>
            <span style={{ fontWeight: "bold", marginTop: "4px" }}>Admin</span>
            <FormControl className={classes.formControl}>
              <InputLabel
                style={{
                  color: "white",
                  fontWeight: "bold"
                }}
                id="dropdown-admin-header"
              >
                <span style={{ fontSize: "20px" }}>{dropdownTitle}</span>
              </InputLabel>
              <Select
                MenuProps={{ classes: { paper: classes.select } }}
                labelId="dropdown-admin-header"
                id="admin-header-select"
              >
                <ul>
                  <Link to={`/admin/BulkUpload`} className={classes.MenuItem}>
                    {/* <span>Bulk Upload</span> */}
                    <StyledMenuItem>Bulk Upload</StyledMenuItem>
                  </Link>
                  <Link to={`/admin/list`} className={classes.MenuItem}>
                    {/* <span>Edit Two wheeler</span> */}
                    <StyledMenuItem>Edit Two wheeler</StyledMenuItem>
                  </Link>

                  <Link to={`/admin/upload`} className={classes.MenuItem}>
                    {/* <span>Single Two Wheeler Upload</span> */}
                    <StyledMenuItem>Single Two Wheeler Upload</StyledMenuItem>
                  </Link>
                </ul>
              </Select>
            </FormControl>
          </Typography>
          <>
            <img alt="" src={Logout} />
            <span
              style={{
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              onClick={handleLogout}
              color="inherit"
            >
              Logout
            </span>
          </>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AdminInnerHeader;
