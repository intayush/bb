import axios from 'axios';
import * as actionTypes from './actionTypes';

export const storeData = (store) => {
    return {
        type: actionTypes.GET_LOCATION_DATA,
        storeData: store
    };
};

export const apiFail = (error) => {
    return {
        type: actionTypes.API_FAIL,
        error: error
    };
};

export const getStoreData = (storeid = null) => {
    let url;
    if(storeid===null){
        url = '/apis/seedData/getAllStoreLocations';
    }else{
        url = "/apis/stores/searchStores?storeid="+storeid;
    }
    return (dispatch) => {
        axios.get(url)
            .then(response => {
                dispatch(storeData(response.data));
            })
            .catch(err => {
                dispatch(apiFail(err));
            });
    };
};