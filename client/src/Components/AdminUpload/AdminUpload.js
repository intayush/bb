import React, { useState, useEffect } from "react";
import isEmpty from "validator/lib/isEmpty";
import Grid from "@material-ui/core/Grid";
import isAlphaNumeric from "validator/lib/isAlphanumeric";
import isNumeric from "validator/lib/isNumeric";
import axios from "axios";
import Tooltip from "../UI/Tooltip/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import M from "materialize-css";
import { BRANDS } from "../../shared/mappings/brands";
import { MODELS } from "../../shared/mappings/bike_models";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DropdownComponentUpload from "./DropdownComponentUpload";
import DropdownComponentUpdate from "./DropdownComponentUpdate";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import DeleteIcon from "@material-ui/icons/Delete";
import AdminInnerHeader from "../AdminSection/AdminInnerHeader";
import Spinner from "../../Components/UI/Spinner/Spinner";

import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import Gif from "./utility/Gif";

const SortableGifsContainer = sortableContainer(({ children }) => (
  <div style={{ display: "flex", flexDirection: "row", overflowX: "scroll" }}>
    {children}
  </div>
));

const SortableGif = sortableElement(({ gif }) => <Gif key={gif} gif={gif} />);

const useStyles = makeStyles((theme) => ({
  formError: {
    color: "red",
    fontSize: 13,
  },
  label: {
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: "0.83px",
    color: "#232c2b",
  },
  body: {
    margin: "50px 100px",
  },
  heading: {
    margin: "50px 0",
    textAlign: "center",
  },
  mt40: {
    marginTop: 40,
  },
  mb20: {
    marginBottom: 20,
  },
}));

const formValidator = (name, value) => {
  switch (name) {
    case "type": {
      return !isNumeric(value) ? "Enter Valid type" : "";
    }
    case "brand": {
      return !isNumeric(value) ? "Enter Valid Brand" : "";
    }
    case "storeId": {
      return !isNumeric(value) ? "Enter Valid StoreID" : "";
    }
    case "model": {
      return !isNumeric(value) ? "Enter Valid model" : "";
    }
    case "regnumber": {
      return !isAlphaNumeric(value)
        ? "Registration no. should contain no. and alphabets only"
        : "";
    }
    // case "descr": {
    //   const descrValue = value.replace(/ /g, "");
    //   return !isAlphaNumeric(descrValue) ? "Enter valid description" : "";
    // }
    case "price": {
      return !isNumeric(value) ? "Price must be numeric" : "";
    }
    case "location": {
      return !isAlphaNumeric(value) ? "Enter valid address" : "";
    }
    case "myear": {
      return !isNumeric(value) ? "Enter valid year" : "";
    }
    case "mmonth": {
      return !isNumeric(value) ? "Enter valid month" : "";
    }
    case "kmdriven": {
      return !isNumeric(value) ? "Kms. driven must be number" : "";
    }
    case "owner": {
      const ownerValue = value.replace(/ /g, "");
      return !isNumeric(ownerValue) ? "Owner field must be numeric" : "";
    }
    case "cc": {
      return !isNumeric(value) ? "Enter valid cc" : "";
    }
    // case "bhp": {
    //   return !isNumeric(value) ? "Enter valid bhp" : "";
    // }
    case "category": {
      return !isNumeric(value) ? "Enter valid category" : "";
    }
    // case "mileage": {
    //   return !isNumeric(value) ? "Mileage must be numeric" : "";
    // }
    case "discountPercent": {
      return !isNumeric(value) ||
        parseFloat(value) > 100 ||
        parseFloat(value) < 0
        ? "Invalid Value for Discount"
        : "";
    }
    default: {
      return false;
    }
  }
};

const AdminUpload = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: {
      value: "",
      error: false,
      errorMessage: "",
      optional: false,
    },
    type: {
      value: "",
      error: false,
      errorMessage: "",
      optional: false,
    },
    brand: {
      value: "",
      error: false,
      errorMessage: "",
      optional: false,
    },
    storeId: {
      value: "",
      error: false,
      errorMessage: "",
      optional: false,
    },
    model: {
      value: "",
      error: false,
      errorMessage: "",
      optional: false,
    },
    regnumber: {
      value: "",
      error: false,
      errorMessage: "",
      optional: false,
    },
    descr: {
      value: "",
      error: false,
      errorMessage: "",
      optional: true,
    },
    price: {
      value: "",
      error: false,
      errorMessage: "",
      optional: false,
    },
    myear: {
      value: "",
      error: false,
      errorMessage: "",
      optional: false,
    },
    mmonth: {
      value: "",
      error: false,
      errorMessage: "",
      optional: false,
    },
    kmdriven: {
      value: "",
      error: false,
      errorMessage: "",
      optional: false,
    },
    owner: {
      value: "",
      error: false,
      errorMessage: "",
      optional: false,
    },
    cc: {
      value: "",
      error: false,
      errorMessage: "",
      optional: false,
    },
    bhp: {
      value: "0",
      error: false,
      errorMessage: "",
      optional: true,
    },
    mileage: {
      value: "",
      error: false,
      errorMessage: "",
      optional: true,
    },
    image: {
      images: [],
      imageNames: [],
      message: "",
    },
    additionalInfo: {
      value: "",
      error: false,
      errorMessage: "",
      optional: true,
    },
    bulletInfo1: {
      value: "",
      error: false,
      errorMessage: "",
      optional: true,
    },
    bulletInfo2: {
      value: "",
      error: false,
      errorMessage: "",
      optional: true,
    },
    bulletInfo3: {
      value: "",
      error: false,
      errorMessage: "",
      optional: true,
    },
    bulletInfo4: {
      value: "",
      error: false,
      errorMessage: "",
      optional: true,
    },
    bulletInfo5: {
      value: "",
      error: false,
      errorMessage: "",
      optional: true,
    },
    bulletInfo6: {
      value: "",
      error: false,
      errorMessage: "",
      optional: true,
    },
    sold: {
      value: "false",
      error: false,
      errorMessage: "",
      optional: true,
    },
    discountPercent: {
      value: "",
      error: false,
      errorMessage: "",
      optional: true,
    },
  });

  const [successSubmit, setSuccessSubmit] = useState(false);
  const [tooltipState, setTooltipState] = useState({
    open: false,
    message: "",
    variant: "error",
  });

  const [loader, setLoader] = useState(false);

  const [populatedTypeObject, setPopulatedTypeObject] = useState(null);
  const [populatedBrandObject, setPopulatedBrandObject] = useState(null);
  const [populatedStoreObject, setPopulatedStoreObject] = useState(null);
  const [populatedModelObject, setPopulatedModelObject] = useState(null);
  const [sliderImages, setSliderImages] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  // used for sorting of previewImages
  const onSortEnd = ({ oldIndex, newIndex, collection }) => {
    switch (collection) {
      case "gifs":
        setPreviewImages(arrayMove(previewImages, oldIndex, newIndex));
        let img = arrayMove(previewImages, oldIndex, newIndex); 
          img=img.map((eachImg)=>eachImg.name);

        setFormData({
          ...formData,
          image: {
            ...formData.image,
            images: arrayMove(previewImages, oldIndex, newIndex),
            imageNames: img,
          },
        });
        break;
    }
  };

  const removeImageHandler = (i) => {
    let imgs = formData.image.images;

    imgs.splice(i, 1);
    previewImages.splice(i, 1);
    let imgNames = imgs.map((img) => img.name);
    let msg = `${imgs.length} valid image(s) selected`;
    setFormData({
      ...formData,
      image: {
        images: imgs,
        imageNames: imgNames,
        message: msg,
      },
    });
  };

  const handleClose = () => {
    setTooltipState({
      open: false,
      message: "",
      variant: "success",
    });
  };

  const tooltip = (
    <Tooltip
      open={tooltipState.open}
      message={tooltipState.message}
      variant={tooltipState.variant}
      handleClose={handleClose}
    />
  );

  const selectFiles = (event, formData) => {
    for (var i = 0; i < event.target.files.length && i < 6; i++) {
      let previewImagesCopy = previewImages;
      previewImagesCopy.push(event.target.files.item(i));
      setPreviewImages(previewImagesCopy);
    }
    let filteredPreviewImages = previewImages.filter((image) =>
      image.name.match(/\.(jpg|jpeg|png)$/)
    );

    let imgNames = filteredPreviewImages.map((image) =>
      image.name.replace(/ /g, "")
    );
    let message = `${filteredPreviewImages.length} valid image(s) selected`;
    setFormData({
      ...formData,
      image: {
        images: filteredPreviewImages,
        imageNames: imgNames,
        message: message,
      },
    });
  };

  const skipValidation = [
    "addiitionalInfo",
    "bulletInfo1",
    "bulletInfo2",
    "bulletInfo3",
    "bulletInfo4",
    "bulletInfo5",
    "bulletInfo6",
    "sold",
    "descr",
    "mileage",
    "bhp",
  ];

  const validateAndUpdateFormdata = (event, formData) => {
    let targetValue = event.target.value;
    let targetName = event.target.name;
    let errorMessage = "";
    let error = false;
    if (!skipValidation.includes(targetName)) {
      if (isEmpty(targetValue)) {
        errorMessage = "This field is required";
        error = true;
      } else {
        errorMessage = formValidator(targetName, targetValue);
        if (errorMessage.length) {
          error = true;
        } else {
          errorMessage = formValidator(targetName, targetValue);
          if (errorMessage.length) {
            error = true;
          }
        }
      }
    }
    setFormData({
      ...formData,
      [event.target.name]: {
        value: targetValue,
        error: error,
        errorMessage: errorMessage,
      },
    });
  };

  const validateAndUpdateTypeDropDown = (event) => {
    let targetValue = event.value;
    let targetName = "type";
    let errorMessage = "";
    let error = false;
    if (!skipValidation.includes(targetName)) {
      if (isEmpty(targetValue)) {
        errorMessage = "This field is required";
        error = true;
      } else {
        errorMessage = formValidator(targetName, targetValue);
        if (errorMessage.length) {
          error = true;
        } else {
          errorMessage = formValidator(targetName, targetValue);
          if (errorMessage.length) {
            error = true;
          }
        }
      }
    }
    setFormData({
      ...formData,
      ["type"]: {
        value: targetValue,
        error: error,
        errorMessage: errorMessage,
      },
    });
  };

  const validateAndUpdateBrandDropDown = (event) => {
    let targetValue = event.value.toString();
    let targetName = "brand";
    let errorMessage = "";
    let error = false;
    if (!skipValidation.includes(targetName)) {
      if (isEmpty(targetValue)) {
        errorMessage = "This field is required";
        error = true;
      } else {
        errorMessage = formValidator(targetName, targetValue);
        if (errorMessage.length) {
          error = true;
        } else {
          errorMessage = formValidator(targetName, targetValue);
          if (errorMessage.length) {
            error = true;
          }
        }
      }
    }
    setFormData({
      ...formData,
      ["brand"]: {
        value: targetValue,
        error: error,
        errorMessage: errorMessage,
      },
    });
  };

  const validateAndUpdateStoreIdDropDown = (event) => {
    let targetValue = event.value;
    let targetName = "storeId";
    let errorMessage = "";
    let error = false;
    if (!skipValidation.includes(targetName)) {
      if (isEmpty(targetValue)) {
        errorMessage = "This field is required";
        error = true;
      } else {
        errorMessage = formValidator(targetName, targetValue);
        if (errorMessage.length) {
          error = true;
        } else {
          errorMessage = formValidator(targetName, targetValue);
          if (errorMessage.length) {
            error = true;
          }
        }
      }
    }
    setFormData({
      ...formData,
      ["storeId"]: {
        value: targetValue,
        error: error,
        errorMessage: errorMessage,
      },
    });
  };

  const validateAndUpdateModelDropDown = (event) => {
    let targetValue = event.value.toString();
    let targetName = "model";
    let errorMessage = "";
    let error = false;
    if (!skipValidation.includes(targetName)) {
      if (isEmpty(targetValue)) {
        errorMessage = "This field is required";
        error = true;
      } else {
        errorMessage = formValidator(targetName, targetValue);
        if (errorMessage.length) {
          error = true;
        } else {
          errorMessage = formValidator(targetName, targetValue);
          if (errorMessage.length) {
            error = true;
          }
        }
      }
    }
    setFormData({
      ...formData,
      ["model"]: {
        value: targetValue,
        error: error,
        errorMessage: errorMessage,
      },
    });
  };

  const validateAndUpdateSoldFlag = (event) => {
    let targetValue = event.target.value;
    let targetName = "sold";
    let errorMessage = "";
    let error = false;
    if (!skipValidation.includes(targetName)) {
      if (isEmpty(targetValue)) {
        errorMessage = "This field is required";
        error = true;
      } else {
        errorMessage = formValidator(targetName, targetValue);
        if (errorMessage.length) {
          error = true;
        } else {
          errorMessage = formValidator(targetName, targetValue);
          if (errorMessage.length) {
            error = true;
          }
        }
      }
    }
    setFormData({
      ...formData,
      ["sold"]: {
        value: targetValue,
        error: error,
        errorMessage: errorMessage,
      },
    });
  };

  const submitForm = async (event) => {
    let formValid = true;
    let elems = document.querySelectorAll("select");
    let submitObj = { ...formData };


    console.log("======submitobj",submitObj);
    for (let i = 0; i < elems.length; i++) {
      let instance = M.FormSelect.getInstance(elems[i]);
      let targetName = instance.el.name;
      let targetValue = instance.el.value;

   
      submitObj = {
        ...submitObj,
        [targetName]: {
          value: targetValue,
          error: false,
          errorMessage: "",
        },
      };
    }
    for (let prop in submitObj) {
      if (
        submitObj[prop].optional == false &&
        (submitObj[prop].error || submitObj[prop].value === "")
      ) {
        let message = submitObj[prop].error
          ? "Invalid form value for " + prop
          : "All Fields are Mandatory";
        formValid = false;
        setTooltipState({
          open: true,
          message: message,
          variant: "error",
        });
      }
    }
    if (formValid) {
      // uploadImages(formData);
      setFormData();
      const uploaders = formData.image.images.map((image) => {
        const data = new FormData();
        if (image.saved == undefined) {
          data.append("image", image, image.name.replace(/ /g, ""));
          return axios.post("/upload", data).then((response) => {});
        }
      });


      setLoader(true);

      if(uploaders!=undefined || undefined != null){

        axios
        .all(uploaders)
        .then(() => {
          axios
            .post("/apis/seedData/adminVehiclesUpload", submitObj)
            .then((response) => {
              setLoader(false);
              history.push("/admin/list");
              if (response.status === 200) {
                history.push("/admin/list");
                setTooltipState({
                  open: true,
                  message: "Your details have been saved",
                  variant: "success",
                });
              }
            })
            .catch((err) => {
              setLoader(false);
              console.log(err);
            });
          setSuccessSubmit(true);
        })
        .catch((err) => {
          setLoader(false);
          alert(err.message);
        });
      }
    
    }
  };

  const updateSubmitForm = async (id) => {
    let formValid = true;
    let elems = document.querySelectorAll("select");

    let submitObj = { ...formData };

    for (let i = 0; i < elems.length; i++) {
      let instance = M.FormSelect.getInstance(elems[i]);
      let targetName = instance.el.name;
      let targetValue = instance.el.value;
      submitObj = {
        ...submitObj,
        [targetName]: {
          value: targetValue,
          error: false,
          errorMessage: "",
        },
      };
    }
    for (let prop in submitObj) {
      if (
        submitObj[prop].optional == false &&
        (submitObj[prop].error || submitObj[prop].value === "")
      ) {
        let message = submitObj[prop].error
          ? "Invalid form value for " + prop
          : "All Fields are Mandatory";
        formValid = false;
        setTooltipState({
          open: true,
          message: message,
          variant: "error",
        });
      }
    }

    let submitUpdateObj = {
      submitObj: submitObj,
      vehicleId: id,
    };

    if (formValid) {
      // uploadImages(formData);

      const uploaders = formData.image.images.map((image) => {
        const data = new FormData();
        if (image.saved == undefined) {
          data.append("image", image, image.name.replace(/ /g, ""));
          return axios.post("/upload", data).then((response) => {});
        }
      });
      setLoader(true);
      if(uploaders!=undefined || uploaders !=null || uploaders.length !=0){

        axios
        .all(uploaders)
        .then(() => {
          axios
            .post("/apis/seedData/adminVehiclesUpdate", submitUpdateObj)
            .then((response) => {
              setLoader(false);
              if (response.status === 200) {
                history.push("/admin/list");
                setTooltipState({
                  open: true,
                  message: "Your details have been saved",
                  variant: "success",
                });
              }
            })
            .catch((err) => {
              setLoader(false);
              console.log(err);
            });
          setSuccessSubmit(true);
        })
        .catch((err) => {
          setLoader(false);
          alert(err.message);
        });
      }
     
    }
  };

  const typeOptions = [
    { value: "1", label: "Bike" },
    { value: "2", label: "Scooter" },
    { value: "3", label: "High-end Bike" },
  ];

  const storeOptions = [
    { value: "1", label: "BikeBazaar, Aluva, Kerela" },
    { value: "2", label: "BikeBazaar, Kolkata" },
    { value: "3", label: "BikeBazaar, Rajahmundry" },
    { value: "4", label: "BikeBazaar, Thrissur" },
    { value: "5", label: "BikeBazaar, Bangalore" },
    { value: "6", label: "BikeBazaar, Nungambakkam" },
    { value: "7", label: "BikeBazaar, New Delhi" },
    { value: "8", label: "BikeBazaar, Gurgaon" },
    { value: "9", label: "BikeBazaar, Hyderabad" },
    { value: "10", label: "BikeBazaar, Jaipur" },
    { value: "11", label: "BikeBazaar, Mumbai" },
    { value: "12", label: "BikeBazaar, Nagpur" },
    { value: "13", label: "BikeBazaar, Pune" },
  ];

  const brandOptions = BRANDS.map((key, value) => {
    return { value: value, label: key };
  });

  const modelOptions = MODELS.map((key, value) => {
    return { value: value, label: key };
  });

  let instance = [];
  useEffect(() => {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, {});
    instance = M.FormSelect.getInstance(elems);
  }, []);

  // get vehicle id from url
  const vehicleId = props.match.params.id;

  let initialImages = [];
  const vehicleImagePath = "../../vehicles/";

  // fetch vehicle details using vehicle id and set formData
  useEffect(() => {
    if (vehicleId !== undefined) {
      const getVehicleData = (vehicleId) => {
        let url = "/apis/seedData/searchBike?vehicleid=" + vehicleId;
        axios
          .get(url)
          .then((response) => {
            const vehicleData = response.data[0]._source;
            const objectArray = Object.entries(vehicleData);
            let vehicleDataObj = formData;
            objectArray.forEach(([key, value]) => {
              vehicleDataObj = {
                ...vehicleDataObj,
                [key]: {
                  value: value,
                  error: null,
                  errorMessage: null,
                },
              };
            });
            if (vehicleData !== null) {
              setFormData(vehicleDataObj);
              populateDropdown(typeOptions, vehicleDataObj.type.value, "type");
              populateDropdown(BRANDS, vehicleDataObj.brand.value, "brand");
              populateDropdown(
                storeOptions,
                vehicleDataObj.storeId.value,
                "store"
              );
              populateDropdown(MODELS, vehicleDataObj.model.value, "model");
              vehicleData.images.map((image) => {
                initialImages.push({
                  name: image,
                  saved: true,
                });
              });
              setSliderImages(vehicleDataObj.images.value);

              let filteredPreviewImages = initialImages.filter((image) =>
                image.name.match(/\.(jpg|jpeg|png)$/)
              );

              let imgNames = filteredPreviewImages.map((image) =>
                image.name.replace(/ /g, "")
              );
              let message = `${filteredPreviewImages.length} valid image(s) selected`;
              setFormData({
                ...vehicleDataObj,
                image: {
                  images: filteredPreviewImages,
                  imageNames: imgNames,
                  message: message,
                },
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getVehicleData(vehicleId);
      setPreviewImages(initialImages);
    }
  }, []);

  // update state through form input field
  const updateFormFieldHandler = (event, formData) => {
    let targetValue = event.target.value;
    let targetName = event.target.name;
    let vehicleDataObj = {
      ...formData,
      [targetName]: {
        value: targetValue,
      },
    };
    setFormData(vehicleDataObj);
  };

  // set dropdown select state value
  const populateDropdown = (dropdownObject, searchFor, populatedObjectName) => {
    dropdownObject.find((key, value) => {
      if (value == searchFor) {
        if (populatedObjectName == "brand") {
          setPopulatedBrandObject({ value: value, label: key });
        }
        if (populatedObjectName == "model") {
          setPopulatedModelObject({ value: value, label: key });
        }
      }
      if (populatedObjectName == "type") {
        if (value + 1 == searchFor) {
          setPopulatedTypeObject(key);
        }
      }
      if (populatedObjectName == "store") {
        if (value + 1 == searchFor) {
          setPopulatedStoreObject(key);
        }
      }
    });
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <AdminInnerHeader />
      {loader ? (
        <Spinner />
      ) : (
        <div className={classes.body}>
          {tooltip}
          {vehicleId !== undefined ? (
            <h4 className={classes.heading}>Update Vehicle Details</h4>
          ) : (
            <h4 className={classes.heading}>Upload Vehicle Details</h4>
          )}
          <form action="" encType="multipart/form-data">
            <Grid
              container
              component="div"
              direction="row"
              justify="space-evenly"
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={11}
                lg={11}
                className={classes.mb20}
              >
                <label htmlFor="regnumber">
                  <span>Name:*</span>&nbsp;&nbsp;
                </label>

              
                 <input
                  value={formData.name.value}
                 onChange={(event) => updateFormFieldHandler(event, formData)}
                 type="text"
                 name="name"
                 id="name"
                 onBlur={(event) => validateAndUpdateFormdata(event, formData)}
               /> 
               
               
                {formData.name.error && (
                  <p className={classes.formError}>
                    {formData.name.errorMessage}
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <div>
                  {vehicleId == undefined ? (
                    <DropdownComponentUpload
                      labelName="Type"
                      optionsObject={typeOptions}
                      onClickFunction={validateAndUpdateTypeDropDown}
                    />
                  ) : (
                    <DropdownComponentUpdate
                      labelName="Type"
                      optionsObject={typeOptions}
                      populatedObject={populatedTypeObject}
                      onClickFunction={validateAndUpdateTypeDropDown}
                    />
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <div>
                  {vehicleId == undefined ? (
                    <DropdownComponentUpload
                      labelName="Brand"
                      optionsObject={brandOptions}
                      onClickFunction={validateAndUpdateBrandDropDown}
                    />
                  ) : (
                    <DropdownComponentUpdate
                      labelName="Brand"
                      optionsObject={brandOptions}
                      populatedObject={populatedBrandObject}
                      onClickFunction={validateAndUpdateBrandDropDown}
                    />
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <div>
                  {vehicleId == undefined ? (
                    <DropdownComponentUpload
                      labelName="Store"
                      optionsObject={storeOptions}
                      onClickFunction={validateAndUpdateStoreIdDropDown}
                    />
                  ) : (
                    <DropdownComponentUpdate
                      labelName="Store"
                      optionsObject={storeOptions}
                      populatedObject={populatedStoreObject}
                      onClickFunction={validateAndUpdateStoreIdDropDown}
                    />
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <div>
                  {vehicleId == undefined ? (
                    <DropdownComponentUpload
                      labelName="Model"
                      optionsObject={modelOptions}
                      onClickFunction={validateAndUpdateModelDropDown}
                    />
                  ) : (
                    <DropdownComponentUpdate
                      labelName="Model"
                      optionsObject={modelOptions}
                      populatedObject={populatedModelObject}
                      onClickFunction={validateAndUpdateModelDropDown}
                    />
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <label htmlFor="regnumber">
                  <span>Registration Number:*</span>&nbsp;&nbsp;
                </label>
                <input
                  value={formData.regnumber.value}
                  onChange={(event) => updateFormFieldHandler(event, formData)}
                  type="text"
                  name="regnumber"
                  id="regnumber"
                  onBlur={(event) => validateAndUpdateFormdata(event, formData)}
                />
                {formData.regnumber.error && (
                  <p className={classes.formError}>
                    {formData.regnumber.errorMessage}
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                {/* <label htmlFor="descr">
                <span>Description:*</span>&nbsp;&nbsp;
              </label>
              <input
                value={formData.descr.value}
                onChange={(event) => updateFormFieldHandler(event, formData)}
                type="text"
                name="descr"
                id="descr"
                onBlur={(event) => validateAndUpdateFormdata(event, formData)}
              />
              {formData.descr.error && (
                <p className={classes.formError}>{formData.descr.errorMessage}</p>
              )} */}
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <label htmlFor="price">
                  <span>Price:*</span>&nbsp;&nbsp;
                </label>
                <input
                  value={formData.price.value}
                  onChange={(event) => updateFormFieldHandler(event, formData)}
                  type="number"
                  name="price"
                  id="price"
                  onBlur={(event) => validateAndUpdateFormdata(event, formData)}
                />
                {formData.price.error && (
                  <p className={classes.formError}>
                    {formData.price.errorMessage}
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <label htmlFor="myear">
                  <span>Manufacturing Year:*</span>&nbsp;&nbsp;
                </label>
                <input
                  value={formData.myear.value}
                  onChange={(event) => updateFormFieldHandler(event, formData)}
                  type="number"
                  name="myear"
                  id="myear"
                  onBlur={(event) => validateAndUpdateFormdata(event, formData)}
                />
                {formData.myear.error && (
                  <p className={classes.formError}>
                    {formData.myear.errorMessage}
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <label htmlFor="mmonth">
                  <span>Manufacturing Month:*</span>&nbsp;&nbsp;
                </label>
                <input
                  value={formData.mmonth.value}
                  onChange={(event) => updateFormFieldHandler(event, formData)}
                  type="number"
                  name="mmonth"
                  id="mmonth"
                  onBlur={(event) => validateAndUpdateFormdata(event, formData)}
                />
                {formData.mmonth.error && (
                  <p className={classes.formError}>
                    {formData.mmonth.errorMessage}
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <label htmlFor="kmdriven">
                  <span>Kms. Driven:*</span>&nbsp;&nbsp;
                </label>
                <input
                  value={formData.kmdriven.value}
                  onChange={(event) => updateFormFieldHandler(event, formData)}
                  type="number"
                  name="kmdriven"
                  id="kmdriven"
                  onBlur={(event) => validateAndUpdateFormdata(event, formData)}
                />
                {formData.kmdriven.error && (
                  <p className={classes.formError}>
                    {formData.kmdriven.errorMessage}
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <label htmlFor="owner">
                  <span>Owner:*</span>&nbsp;&nbsp;
                </label>
                <input
                  value={formData.owner.value}
                  onChange={(event) => updateFormFieldHandler(event, formData)}
                  type="text"
                  name="owner"
                  id="owner"
                  onBlur={(event) => validateAndUpdateFormdata(event, formData)}
                />
                {formData.owner.error && (
                  <p className={classes.formError}>
                    {formData.owner.errorMessage}
                  </p>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <label htmlFor="cc">
                  <span>CC:*</span>&nbsp;&nbsp;
                </label>
                <input
                  value={formData.cc.value}
                  onChange={(event) => updateFormFieldHandler(event, formData)}
                  type="number"
                  name="cc"
                  id="cc"
                  onBlur={(event) => validateAndUpdateFormdata(event, formData)}
                />
                {formData.cc.error && (
                  <p className={classes.formError}>
                    {formData.cc.errorMessage}
                  </p>
                )}
              </Grid>
              {/* <Grid item xs={12} sm={12} md={5} lg={5}>
              <label htmlFor="bhp">
                <span>BHP:*</span>&nbsp;&nbsp;
              </label>
              <input
                value={formData.bhp.value}
                onChange={(event) => updateFormFieldHandler(event, formData)}
                type="number"
                name="bhp"
                id="bhp"
                onBlur={(event) => validateAndUpdateFormdata(event, formData)}
              />
              {formData.bhp.error && (
                <p className={classes.formError}>{formData.bhp.errorMessage}</p>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <label htmlFor="mileage">
                <span>Mileage:*</span>&nbsp;&nbsp;
              </label>
              <input
                value={formData.mileage.value}
                onChange={(event) => updateFormFieldHandler(event, formData)}
                type="number"
                name="mileage"
                id="mileage"
                onBlur={(event) => validateAndUpdateFormdata(event, formData)}
              />
              {formData.mileage.error && (
                <p className={classes.formError}>
                  {formData.mileage.errorMessage}
                </p>
              )}
            </Grid> */}
              <Grid
                item
                xs={12}
                sm={12}
                md={11}
                lg={11}
                className={classes.mb20}
              >
                <label htmlFor="additionalInfo">
                  <span>Additional Information:</span>&nbsp;&nbsp;
                </label>
                <input
                  value={formData.additionalInfo.value}
                  onChange={(event) => updateFormFieldHandler(event, formData)}
                  type="text"
                  name="additionalInfo"
                  id="additionalInfo"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={11}
                lg={11}
                className={classes.mb20}
              >
                <label htmlFor="bulletInfo1">
                  <span>Bullet Information 1:</span>&nbsp;&nbsp;
                </label>
                <input
                  value={formData.bulletInfo1.value}
                  onChange={(event) => updateFormFieldHandler(event, formData)}
                  type="text"
                  name="bulletInfo1"
                  id="bulletInfo1"
                  onBlur={(event) => validateAndUpdateFormdata(event, formData)}
                />
                {formData.bulletInfo1.error && (
                  <p className={classes.formError}>
                    {formData.bulletInfo1.errorMessage}
                  </p>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={11}
                lg={11}
                className={classes.mb20}
              >
                <label htmlFor="bulletInfo2">
                  <span>Bullet Information 2:</span>&nbsp;&nbsp;
                </label>
                <input
                  value={formData.bulletInfo2.value}
                  onChange={(event) => updateFormFieldHandler(event, formData)}
                  type="text"
                  name="bulletInfo2"
                  id="bulletInfo2"
                  onBlur={(event) => validateAndUpdateFormdata(event, formData)}
                />
                {formData.bulletInfo2.error && (
                  <p className={classes.formError}>
                    {formData.bulletInfo2.errorMessage}
                  </p>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={11}
                lg={11}
                className={classes.mb20}
              >
                <label htmlFor="bulletInfo3">
                  <span>Bullet Information 3:</span>&nbsp;&nbsp;
                </label>
                <input
                  value={formData.bulletInfo3.value}
                  onChange={(event) => updateFormFieldHandler(event, formData)}
                  type="text"
                  name="bulletInfo3"
                  id="bulletInfo3"
                  onBlur={(event) => validateAndUpdateFormdata(event, formData)}
                />
                {formData.bulletInfo3.error && (
                  <p className={classes.formError}>
                    {formData.bulletInfo3.errorMessage}
                  </p>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={11}
                lg={11}
                className={classes.mb20}
              >
                <label htmlFor="bulletInfo4">
                  <span>Bullet Information 4:</span>&nbsp;&nbsp;
                </label>
                <input
                  value={formData.bulletInfo4.value}
                  onChange={(event) => updateFormFieldHandler(event, formData)}
                  type="text"
                  name="bulletInfo4"
                  id="bulletInfo4"
                  onBlur={(event) => validateAndUpdateFormdata(event, formData)}
                />
                {formData.bulletInfo4.error && (
                  <p className={classes.formError}>
                    {formData.bulletInfo4.errorMessage}
                  </p>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={11}
                lg={11}
                className={classes.mb20}
              >
                <label htmlFor="bulletInfo5">
                  <span>Bullet Information 5:</span>&nbsp;&nbsp;
                </label>
                <input
                  value={formData.bulletInfo5.value}
                  onChange={(event) => updateFormFieldHandler(event, formData)}
                  type="text"
                  name="bulletInfo5"
                  id="bulletInfo5"
                  onBlur={(event) => validateAndUpdateFormdata(event, formData)}
                />
                {formData.bulletInfo5.error && (
                  <p className={classes.formError}>
                    {formData.bulletInfo5.errorMessage}
                  </p>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={11}
                lg={11}
                className={classes.mb20}
              >
                <label htmlFor="bulletInfo6">
                  <span>Bullet Information 6:</span>&nbsp;&nbsp;
                </label>
                <input
                  value={formData.bulletInfo6.value}
                  onChange={(event) => updateFormFieldHandler(event, formData)}
                  type="text"
                  name="bulletInfo6"
                  id="bulletInfo6"
                  onBlur={(event) => validateAndUpdateFormdata(event, formData)}
                />
                {formData.bulletInfo6.error && (
                  <p className={classes.formError}>
                    {formData.bulletInfo6.errorMessage}
                  </p>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={11}
                lg={11}
                className={classes.mb20}
              >
                <Grid
                  container
                  component="div"
                  direction="row"
                  justify="space-evenly"
                >
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <label htmlFor="bulletInfo6">
                      <span>Sold:</span>&nbsp;&nbsp;
                    </label>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue={formData.sold.value}
                        onChange={(event) =>
                          validateAndUpdateSoldFlag(event, formData)
                        }
                      >
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="Up for sale"
                          labelPlacement="bottom"
                        />
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Sold"
                          labelPlacement="bottom"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <label htmlFor="discountPercent">
                      <span>Discount Percent (%):</span>&nbsp;&nbsp;
                    </label>
                    <input
                      value={formData.discountPercent.value}
                      onChange={(event) =>
                        updateFormFieldHandler(event, formData)
                      }
                      type="text"
                      name="discountPercent"
                      id="discountPercent"
                      onBlur={(event) =>
                        validateAndUpdateFormdata(event, formData)
                      }
                    />
                    {formData.discountPercent.error && (
                      <p className={classes.formError}>
                        {formData.discountPercent.errorMessage}
                      </p>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <label htmlFor="discountedPrice">
                      <span>Discounted Price:</span>&nbsp;&nbsp;
                    </label>
                    <p>
                      {Math.ceil(
                        formData.price.value -
                          (formData.price.value *
                            formData.discountPercent.value) /
                            100
                      )}
                    </p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={10}
                lg={10}
                className={classes.mt40}
              >
                <label htmlFor="image">
                  <span className={classes.label}> Upload images </span>
                </label>

                <input
                  className="form-control"
                  type="file"
                  onChange={(event) => selectFiles(event, formData)}
                  multiple
                />

                {formData.image.message ? (
                  <p className="text-info">{formData.image.message}</p>
                ) : (
                  ""
                )}

                <br />

                <div
                  className={
                    matches
                      ? "preview-image-container"
                      : "preview-image-container-mobile"
                  }
                >
                  <SortableGifsContainer
                    axis="x"
                    onSortEnd={onSortEnd}
                    onSortStart={(_, event) => event.preventDefault()}
                  >
                    {previewImages.map((gif, i) => (
                      <div key={i} className="image-preview">
                        {gif.saved !== undefined ? (
                          <SortableGif
                            index={i}
                            key={gif}
                            gif={gif}
                            collection="gifs"
                          
                          />
                        ) : (
                          <img
                            src={URL.createObjectURL(gif)}
                            height="150"
                            width="200"
                            alt=""
                          />
                        )}

                        <span title="Remove image">
                          <DeleteIcon
                            className="delete-icon"
                            onClick={() => removeImageHandler(i)}
                          />
                        </span>
                      </div>
                    ))}
                  </SortableGifsContainer>
                </div>
              </Grid>
            </Grid>
            <div className="center-align">
              {vehicleId !== undefined ? (
                <button
                  type="button"
                  className="btn"
                  onClick={() => updateSubmitForm(vehicleId)}
                  id={"id-" + vehicleId}
                >
                  Update Vehicle
                </button>
              ) : (
                <button type="button" className="btn" onClick={submitForm}>
                  Upload Vehicle
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AdminUpload;
