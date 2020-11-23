import authReducer from "./auth";
import errorReducer from "./errorReducer";
import vehicleDetailsReducer from "./vehicleDetails";
import storeDetailsReducer from "./storeReducer";
import blogReducer from "./blogReducer";
import {persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import {combineReducers} from "redux";


const persistConfig={
    key:'root',
    storage,
    whitelist:['vehicleDetails']
}

const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
    vehicleDetails: vehicleDetailsReducer,
    storeDetails: storeDetailsReducer,
    blogDetails: blogReducer
  });

  
  export default persistReducer(persistConfig,rootReducer);