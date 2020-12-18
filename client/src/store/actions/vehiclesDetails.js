import axios from 'axios';
import * as actionTypes from './actionTypes';

// this code is important for theh filter data
export const vehicleList = (vehicleList, filterData, category) => {
    if (vehicleList.length == 0) {
        vehicleList = ['NA'];
    }
    return {
        type: actionTypes.VEHICLE_LIST,
        vehicleList: vehicleList,
        filterData: filterData,
        category: category
    };
};

export const vehicleData = (vehicle) => {
    if (vehicle.length) {
        vehicle = vehicle[0]
    }
    return {
        type: actionTypes.GET_VEHICLE_DATA,
        vehicleData: vehicle
    };
};

export const vehicleNames = (names) => {
    return {
        type: actionTypes.GET_VEHICLE_NAMES,
        vehicleNames: names
    };
};

export const apiFail = (error) => {
    return {
        type: actionTypes.API_FAIL,
        error: error
    };
};

export const getVehicles = (category = null, filterData = null, searchTerm = null) => {
    let url = "";
    if(category==null || category==0){
        url = "/apis/seedData/getAllBikes";
    }
    else{
    url = "/apis/categoryDetails/getCategoryById?category=" + category + "&filterData=" + JSON.stringify(filterData) + "&searchTerm=" + searchTerm;
    }
    return dispatch => {
        axios.get(url)
            .then(response => {
                dispatch(vehicleList(response.data, filterData, category));
            })
            .catch(err => {
                dispatch(apiFail(err));
            });
    };
};

export const getVehicleData = (vehicleid) => {
    return dispatch => {
        let url = "/apis/seedData/searchBike?vehicleid=" + vehicleid;
        axios.get(url)
            .then(response => {
                dispatch(vehicleData(response.data));
            })
            .catch(err => {
                dispatch(apiFail(err));
            });
    };
};

export const getPaginatedData = (offset, pageLimit) => {
    return {
        type: actionTypes.GET_PAGINATED_VEHICLES,
        offset,
        pageLimit
    }
}

export const getVehiclesNames = (category, filterData, searchTerm) => {
    const url = "/apis/categoryDetails/getCategoryById?category=" + category + "&filterData=" + JSON.stringify(filterData) + "&searchTerm=" + searchTerm;
    return dispatch => {
        axios.get(url)
            .then(response => {
                const names = response.data.map(bike => bike._source.name);
                dispatch(vehicleNames(names))
            })
            .catch(err => {
                dispatch(apiFail(err));
            });
    };
};

export const getCityNames = (filterData, searchTerm) => {
    const url = "/apis/categoryDetails/getCities?filterData=" + JSON.stringify(filterData) + "&searchTerm=" + searchTerm;
    return dispatch => {
        axios.get(url)
            .then(response => {
                const names = response.data.map(city => city._source.name);
                dispatch(vehicleNames(names))
            })
            .catch(err => {
                dispatch(apiFail(err));
            });
    };
};
