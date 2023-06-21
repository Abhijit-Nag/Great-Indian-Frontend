
import axios from 'axios';
import * as actionTypes from '../constants/cartConstant';

// const URL = 'http://localhost:8000';
const URL = process.env.REACT_APP_SERVER_API_KEY;
export const addToCart = (id, quantity) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${URL}/product/${id}`);
        console.log(`data from cart ${data}`);
        
        // const response= await axios.get(`${URL}/product/${id}`);
        // console.log(response);
        dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...data, quantity } });
    } catch (error) {
        dispatch({ type: actionTypes.ADD_TO_CART_ERROR, payload: error.message });
    }
}

export const removeFromCart = (id) => (dispatch) => {
    dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: id });
}