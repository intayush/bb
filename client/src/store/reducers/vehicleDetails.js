import { updateObject } from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  vehicles: [],
  loading: true,
  currentData: [],
  currentPage: null,
  totalPages: null,
  vehicle: null,
  category: null,
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
    searchTerm: "aluva*" //this will serve as city filter gets update on city widget
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

const getPaginatedData = (state, action) => {
  const currentData = state.vehicles.slice(
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
    default:
      return state;
  }
};

export default reducer;
