import React, { useState } from "react";
import "./BulkUpload.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core";
import questionIcon from "../../assets/questionIcon.png";
import closeIcon from "../../assets/Close.png";
import ModalText from "./BulkUploadModalText";
import AdminInnerHeader from "../AdminSection/AdminInnerHeader";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  modalBoxSuccess: {
    "overflow-y": "scroll",
    "overflow-x": "hidden",
    position: "absolute",
    width: "60%",
    height: "75%",
    backgroundColor: "white",
    color: "black",
    border: "0 solid #fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const BulkUpload = () => {
  const [showSpinner, setshowSpinner] = useState(false);

  const classes = useStyles();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleModalClose = () => {
    setOpen(false);
  };

  const onChangeHandler = (event) => {
    const files = event.target.files[0];
    setSelectedFile(files);
  };


  const templateDownloader = () => {
    fetch("/apis/bulkUpload/SampleTemplate").then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "Records.xlsx";
        a.click();
      });
    });
  };

  const onClickHandler = () => {
    const data = new FormData();

    //checking whether the state is empty if yes the error would be thrown
    if (selectedFile === null) {
      //toaster for the notification
      toast.error("Please Select the file");
    } else {
      setshowSpinner(true)
      data.append("file", selectedFile);
      data.append("name", selectedFile.name);

      //accessing the backendapi
      axios
        .post("/apis/bulkUpload/Upload", data)
        .then((res) => {
          // then print response status
       
          setshowSpinner(false);
          toast.success("Upload successfull !! ");
        })
        .catch((err) => {
          toast.error("upload fail");
        });
    }
  };

  return (
    <>
      <AdminInnerHeader />

      <Backdrop className={classes.backdrop} open={showSpinner}>

        <CircularProgress color="inherit" />
        <p style={{marginLeft:'20px'}}> Uploading Vehicles Please wait !!</p>
      </Backdrop>

      <div
        style={{ textAlign: "center", justifyContent: "center", padding: 50 }}
        className="container"
      >
        <div className="col-md-6">
          <p style={{ fontSize: 40, fontWeight: "bold", marginBottom: "10px" }}>
            Bulk Upload Menu
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              marginBottom: "10px",
            }}
            onClick={() => setOpen(true)}
            title="Instructions for Bulk Upload"
          >
            <span
              style={{
                marginRight: "10px",
                fontSize: "18px",
                color: "#26A69A",
                fontWeight: "bold",
              }}
            >
              Instructions for Bulk Upload
            </span>
            <img alt="" src={questionIcon} height={25} />
          </div>
          {/**react toaster file */}

          <div className="form-group">
            <ToastContainer />
          </div>

          <form encType="multipart/form-data" method="post">
            <div
              style={{ marginBottom: "20px", marginTop: "20px" }}
              className="form-group files"
            >
              <input
                name="file"
                accept=".zip,.rar,.7zip"
                className="form-control"
                onChange={onChangeHandler}
                type="file"
              />
            </div>
          </form>

          <button className="btn" onClick={onClickHandler}>
            Upload Files
          </button>
          <button
            onClick={templateDownloader}
            style={{ marginLeft: "5px" }}
            className="btn"
          >
            Download Sample Template
          </button>
        </div>
        <Modal
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
          }}
          open={open}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.modalBoxSuccess}>
            <h2>Instructions for Bulk Upload</h2>
            <div style={{ marginTop: "0px", marginLeft: "10px " }}>
              {ModalText()}
            </div>
            <span
              style={{
                marginLeft: "10px",
                marginTop: "-5px",
                cursor: "pointer",
                color: "red",
                fontSize: "24px",
                fontWeight: "700",
              }}
              onClick={handleModalClose}
              src={closeIcon}
            >
              <strong>X</strong>
            </span>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default BulkUpload;
