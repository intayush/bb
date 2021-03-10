import React from "react";
import AdminHeader from "./AdminHeader";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Container as MaterialUiContainer } from "@material-ui/core/";
import { Grid as MaterialUiGrid } from "@material-ui/core/";
import { useHistory } from "react-router-dom";

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
}));

const AdminHomePage = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (props) => {
    history.push(props);
  };

  return (
    <>
      <AdminHeader />

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
        <MaterialUiContainer style={{ padding: 40, textAlign: "center" }}>
          <MaterialUiGrid onClick={() => handleClick("/admin/list")}>
            <h5
              style={{
                color: "red",
                border: "1px solid red",
                borderRadius: "5px",
                margin: "5%",
                cursor: "pointer",
                padding: "10px",
              }}
              className={classes.border}
            >
              Edit Two-wheelers
            </h5>
          </MaterialUiGrid>

          <MaterialUiGrid onClick={() => handleClick("/admin/BulkUpload")}>
            <h5
              style={{
                height: "5%",
                color: "red",
                border: "1px solid red",
                borderRadius: "5px",
                margin: "5%",
                cursor: "pointer",
                padding: "10px",
              }}
              className={classes.border}
            >
              Bulk Upload
            </h5>
          </MaterialUiGrid>
          <MaterialUiGrid onClick={() => handleClick("/admin/upload")}>
            <h5
              style={{
                color: "red",
                border: "1px solid red",
                borderRadius: "5px",
                margin: "5%",
                cursor: "pointer",
                padding: "10px",
              }}
              className={classes.border}
            >
              Single Two-wheelers upload
            </h5>
          </MaterialUiGrid>
        </MaterialUiContainer>
      </Box>
    </>
  );
};
export default AdminHomePage;
