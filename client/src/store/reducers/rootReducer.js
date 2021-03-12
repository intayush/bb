import authReducer from "./auth";
import errorReducer from "./errorReducer";
import vehicleDetailsReducer from "./vehicleDetails";
import storeDetailsReducer from "./storeReducer";
import blogReducer from "./blogReducer";
import {combineReducers} from "redux";




const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    vehicleDetails: vehicleDetailsReducer,
    storeDetails: storeDetailsReducer,
    blogDetails: blogReducer
  });

  
  export default rootReducer;