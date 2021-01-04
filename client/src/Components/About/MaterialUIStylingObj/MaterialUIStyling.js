import { makeStyles } from "@material-ui/core/styles";


const StylingObj= makeStyles((theme) => ({
    body: {
      backgroundColor: "#f7f7f7",
    },
    banner: {
      marginTop: theme.spacing(4),
    },
    banner1: {
      marginTop: theme.spacing(1),
    },
    paper: {
      marginBottom: theme.spacing(6),
      boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2) !important",
      padding: theme.spacing(3),
      fontSize: 18,
      letterSpacing: 0.63,
      color: "#000000",
      lineHeight: "28px",
      fontWeight: 500,
    },
    paper2: {
      marginBottom: theme.spacing(1),
      boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2) !important",
      padding: "24px 90px 24px 90px",
      fontSize: 18,
      letterSpacing: 0.63,
      color: "#000000",
      lineHeight: "28px",
      fontWeight: 500,
    },
    paper2Mobile: {
      marginBottom: theme.spacing(3),
      boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2) !important",
      fontSize: 10,
      letterSpacing: 0.63,
      color: "#000000",
      fontWeight: 500,
    },
    redHeading: {
      paddingBottom: 10,
      fontSize: 24,
      fontWeight: 800,
      color: "#ff0000",
    },
    flexEnd: {
      display: "flex",
      justifyContent: "flex-end",
    },
    mTop50: {
      marginTop: 50,
    },
    advantageContainer: {
      width: 1200,
      margin: "40px auto 27px",
      padding: "20px",
    },
    ml50: {
      marginLeft: "50px",
    },
    ml70: {
      marginLeft: "70px",
    },
    fs17: {
      fontSize: "17px",
      textAign: "center",
    },
    center: {
      textAlign: "center",
    },
    mobileRedHeading: {
      paddingBottom: 10,
      fontSize: 15,
      fontWeight: "bold",
      color: "#ff0000",
    },
    mobilePaper: {
      marginBottom: theme.spacing(3),
      boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2) !important",
      padding: theme.spacing(3),
      fontSize: 10,
      color: "#000000",
      fontWeight: 500,
    },
  }))

  export default StylingObj;