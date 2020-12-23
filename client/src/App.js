import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Homepage from "./Components/Homepage/Homepage";
import CategoryPage from "./Components/CategoryPage/CategoryPage";
import LocateStore from "./Components/LocateStore/LocateStore";
import VehicleDetails from "./Components/VehicleDetails/VehicleDetails";
import Sell from "./Components/Sell/Sell";
import BecomeFranchiseOwner from "./Components/BecomeFranchiseOwner/BecomeFranchiseOwner";
import Contact from "./Components/Contact/Contact";
import Signup from "./Components/Auth/Signup/Signup";
import Signin from "./Components/Auth/Signin/Signin";
import Faq from "./Components/Faq/Faq";
import HowItWorks from "./Components/HowItWorks/HowItWorks";
import About from "./Components/About/About";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./Components/TermsAndConditions/TermsAndConditions";
import AdminListPage from "./Components/AdminListPage/AdminListPage";
import AdminUpload from "./Components/AdminUpload/AdminUpload";
import BlogPostHome from "./Components/Blog/BlogPostHome";
import BlogPost from "./Components/Blog/BlogPost";
import BulkUpload from "./Components/BulkUpload/BulkUpload";
import AdminSignIn from "./Components/AdminSection/AdminSignIn";
import AdminHomePage from "./Components/AdminSection/AdminHomePage";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import mobileFilterPage from "./Components/CategoryPage/mobileFilterPage/mobileFilterPage";

import * as actions from "./store/actions/index";
import jwt_decode from "jwt-decode";



const App = () => {
  //for admin login
  const dispatch = useDispatch();
  if (localStorage.getItem("adminJwtToken")) {
    const token = localStorage.getItem("adminJwtToken");
    // Set token to Auth header
    // actions.setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(actions.setCurrentUser(decoded));
  }

  return (
    <Switch>
      <Route exact path="/admin/SignIn" component={AdminSignIn} />
      <PrivateRoute exact path="/admin/HomePage" component={AdminHomePage} />
      <PrivateRoute exact path="/admin/edit/:id" component={AdminUpload} />
      <PrivateRoute exact path="/admin/list" component={AdminListPage} />
      <PrivateRoute exact path="/admin/upload" component={AdminUpload} />
      <PrivateRoute exact path="/admin/BulkUpload" component={BulkUpload} />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/category/:category" component={CategoryPage} />
      <Route path="/vehicledetails/locate-store" component={LocateStore} />
      <Route path="/vehicledetails/:vehicleid" component={VehicleDetails} />
      <Route path="/sell" component={Sell} />
      <Route path="/becomefranchiseowner" component={BecomeFranchiseOwner} />
      <Route path="/contact" component={Contact} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/faq" component={Faq} />
      <Route path="/about" component={About} />
      <Route path="/howitworks" component={HowItWorks} />
      <Route path="/privacypolicy" component={PrivacyPolicy} />
      <Route path="/termsandconditions" component={TermsAndConditions} />
      <Route exact path="/blog/:id" component={BlogPost} />
      <Route exact path="/blog" component={BlogPostHome} />
      <Route exact path="/mobileFilterPage" component={mobileFilterPage}/>
    </Switch>
  );
};

export default connect(null)(App);
