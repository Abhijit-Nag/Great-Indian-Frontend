import axios from "axios";

// In action we are caling api s then use it for dispatch then data will be stored in store
//  that in react devtools redux store after that other works will be done.

// through middleware we are calling the api using middleware thunk

import * as actionTypes from '../constants/productConstants';
// const URL = "http://localhost:8000";
const URL = process.env.REACT_APP_SERVER_API_KEY;

export const getProducts = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${URL}/products`);
        console.log(data);
        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCTS_FAILURE, payload: error.message })
        console.log('Error while calling getProducts api from client side ', error.message);
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`${URL}/product/${id}`);
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        console.log('Error while calling product details for redux client side ', error.message);
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_FAILURE, payload: error.message });
    }
}