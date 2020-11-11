import React from 'react';
import { makeStyles } from "@material-ui/core";
import "./BulkUpload.css"

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: '16px',
        color: 'red',
        fontWeight: '600'
    },
    excel : {
        color: 'red'
    }
  }));

const ModalText = () => {
    const classes = useStyles();
    return(
    <>
        <h6 className={classes.heading}>How to Use the Bulk Upload Functioanlity:</h6>
        <ul>
            <li> - Name of the excel file will always remain Records.xlsx (with the same format extension - .xlsx).</li>
            <li> - Images for each bike are to be kept in folders named as the Registration NUmber of the bike. All these folders are to be placed inside an images folder in the zip.</li>
            <li> - Only .zip (NOT .rar or .7z) files are supported for upload. Zip contains the above mentioned images folder and Records.xlsx file.</li>
            <li> - Follow the following excel structure for the upload</li>
        </ul>
        <br />
        <h6 className={classes.heading}>Excel structure explained:</h6>
        <ul>
            <li> - <span className={classes.excel}>name: </span> Provide the name of the two-wheeler</li>
            <li> - <span className={classes.excel}>model: </span> Pick the model number according to masterlist</li>
            <li> - <span className={classes.excel}>brand: </span> Pick the brand number according to masterlist</li>
            <li> - <span className={classes.excel}>registrationNumber: </span> Registration number of the two-wheeler</li>
            <li> - <span className={classes.excel}>price: </span> Selling price of the two-wheeler before any discount is applied</li>
            <li> - <span className={classes.excel}>state: </span> state where the two-wheeler is up for sale</li>
            <li> - <span className={classes.excel}>city: </span> city where the two-wheeler is up for sale</li>
            <li> - <span className={classes.excel}>location: </span> location where the two-wheeler is up for sale</li>
            <li> - <span className={classes.excel}>manufacturingYear: </span> Year when the two-wheeler was manufactured</li>
            <li> - <span className={classes.excel}>manufacturingMonth: </span> Month when the two-wheeler was manufactured</li>
            <li> - <span className={classes.excel}>kmdriven: </span> Kilometers the vehicle has been driven for</li>
            <li> - <span className={classes.excel}>NumberOfOwner: </span> Number of people who have owned the two-wheeler</li>
            <li> - <span className={classes.excel}>cc: </span> Engine capacity in cc</li>
            <li> - <span className={classes.excel}>bhp: </span> Brake horse power</li>
            <li> - <span className={classes.excel}>category: </span> Category of the two-wheeler as follows: 1 for Bike, 2 for Scooter, 3 for High-end Bike</li>
            <li> - <span className={classes.excel}>mileage: </span> Mileage the two-wheeler gives</li>
            <li> - <span className={classes.excel}>images: </span> comma separated list of names of the image files for each vehicle with the extension, for eg: Activa1.jpeg,Activa2.png</li>
            <li> - <span className={classes.excel}>storeId: </span> Store Id where the vehicle is up for sale as follows: 1 for Aluva, 2 for Kolakata, 3 for Rajahmundary</li>
            <li> - <span className={classes.excel}>discountPercent: </span> Discount in percent to be provided on the two-wheeler</li>
        </ul>
        <br />
        <h6 className={classes.heading}>Limitations:</h6>
        <ul>
            <li> -"More details about the Two-wheeler" section will not be added through the bulk upload functionality.</li>
            <li> -Not for editing two-wheeler - please DO NOT use to edit any existing two-wheeler details. This functionality is only meant for the purpose of adding new two-wheelers.</li>
            <li> -If the particular bike details are already existing on the web app refrain from adding it again as it will create a duplicate entry.</li>
            <li> -While uploading more then one records -please make sure that there should not be any special characters used in the folder's name.</li>
        </ul>
    </>
)};
export default ModalText;