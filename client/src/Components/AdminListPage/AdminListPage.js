import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AdminInnerHeader from "../AdminSection/AdminInnerHeader";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyles = makeStyles((theme) => ({
  delete: {
    cursor: "pointer",
  },
}));

const AdminListPage = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [vehicleId, setvehicleId] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    props.getVehicles(null, null);
  }, []);

  const deleteVehicle = (id) => {
    const formData = {
      id: id,
    };
    axios.post("/apis/seedData/deleteVehicle", formData).then((response) => {
      if (response.status === 200) {
        let td = document.querySelector("#id-" + id);
        td.parentElement.remove();
        handleClose();
      }
    });
  };

  let vehicles = <Spinner />;
  if (props.vehicles[0] !== "NA") {
    vehicles = props.vehicles.map((vehicle, index) => (
      <tr key={index}>
        <td>{vehicle._source.name}</td>
        <td>{vehicle._source.myear}</td>
        <td>{vehicle._source.price}</td>
        <td>{vehicle._source.loc}</td>
        <td>{vehicle._source.regnumber}</td>

        <tb>
          <Link
            to={"/admin/edit/" + vehicle._id}
            className="btn btn-secondary ButtonVoolor float-right"
          >
            Edit Info
          </Link>
        </tb>
        {/* <td onClick={() => deleteVehicle(vehicle._id)} id={'id-' + vehicle._id} className={classes.delete}>Delete</td> */}
        <td
          id={"id-" + vehicle._id}
          className={classes.delete}
          onClick={() => {
            handleClickOpen();
            setvehicleId(vehicle._id);
          }}
        >
          Delete
        </td>
      </tr>
    ));
  }
  return (
    <>
      <AdminInnerHeader />
      {props.vehicles[0] !== "NA" ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Year</th>
              <th>Price</th>
              <th>Location</th>
              <th>Registration Number</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{vehicles}</tbody>
        </table>
      ) : (
        <h6 style={{ margin: "20px" }}>No vehicles in DB yet!</h6>
      )}
      <Button className="btn " component={Link} to="./upload">
        Upload Vehicle
      </Button>
      <Button className="btn" component={Link} to="./BulkUpload">
        Bulk Upload vehicles
      </Button>

      {/* delete modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Do you really want to delete the existing record ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="btn btn-secondary ButtonVoolor float-right"
            onClick={handleClose}
          >
            No
          </button>
          <button
            className="btn btn-secondary ButtonVoolor float-right"
            onClick={() => deleteVehicle(vehicleId)}
          >
            Yes
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    vehicles: state.vehicleDetails.vehicles,
    currentData: state.vehicleDetails.currentData,
    currentPage: state.vehicleDetails.currentPage,
    totalPages: state.vehicleDetails.totalPages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVehicles: (vehicleCategory) =>
      dispatch(actions.getVehicles(vehicleCategory)),
    getPaginatedData: (offset, pagelimit) =>
      dispatch(actions.getPaginatedData(offset, pagelimit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminListPage);
