import { updateObject } from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  vehicles: [],
  vehicleNames: [],
  loading: true,
  currentData: [],
  currentPage: null,
  totalPages: null,
  vehicle: null,
  category: 0,
  selectedCity: "", //this will serve as city filter gets update on city widget
  filter: {
    sort: {
      column: null,
      order: null
    },
    city: null,
    myear: [],
    budget: [],
    brand: [],
    kmdriven: 100000,
    searchTerm: "*"
  }
};



const vehicles = (state, action) => {


  return updateObject(state, {
    filter: action.filterData,
    category: action.category,
    loading: false,
    vehicles: action.vehicleList
  });
};

const vehiclesNames = (state, action) => {
  return updateObject(state, {
    loading: false,
    vehicleNames: action.vehicleNames
  });
};

const getPaginatedData = (state, action) => {

  let reversedVehicleList=[];

  for(let i=state.vehicles.length-1;i>=0;i--){

    reversedVehicleList.push(state.vehicles[i])
  }

  let currentData =reversedVehicleList.slice(
    action.offset,
    action.offset + action.pageLimit
  );

  return updateObject(state, {
    loading: false,
    currentData: currentData
  });
};

const getVehicleData = (state, action) => {
  return updateObject(state, {
    loading: false,
    vehicle: action.vehicleData
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VEHICLE_LIST:
      return vehicles(state, action);
    case actionTypes.GET_PAGINATED_VEHICLES:
      return getPaginatedData(state, action);
    case actionTypes.GET_VEHICLE_DATA:
      return getVehicleData(state, action);
    case actionTypes.GET_VEHICLE_NAMES: 
      return vehiclesNames(state, action);
    case actionTypes.HOMEPAGE_LOAD:
      return {
        vehicles: [],
        vehicleNames: [],
        loading: true,
        currentData: [],
        currentPage: null,
        totalPages: null,
        vehicle: null,
        category: null,
        selectedCity: "Aluva",
        filter: {
          sort: {
            column: null,
            order: null
          },
          city: "Aluva",
          myear: [],
          budget: [],
          brand: [],
          kmdriven: 100000,
          searchTerm: "*"
        }
      };
    case actionTypes.CHANGE_CITY:

      const updatedFilter = state.filter;
      updatedFilter.city = action.payload;
      return {
        ...state,
        selectedCity: action.payload,
        filter: updatedFilter
      }

      case actionTypes.CHANGE_CATEGORY:
      // console.log({
      //   ...state,
      //   category: action.payload
      // })
      return {
        ...state,
        category: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
