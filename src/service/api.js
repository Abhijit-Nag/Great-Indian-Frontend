import axios from "axios";

// const URL= 'http://localhost:8000';
const URL = process.env.REACT_APP_SERVER_API_KEY;
export const authenticateSignup= async(data)=>{
    try{
        return await axios.post(`${URL}/signup`, data);
    }catch(error){
        console.log('Eror while calling signup api ' +error);
        return error.response;
    }
}

export const authenticateLogin= async(data)=>{
    try{
       return  await axios.post(`${URL}/login`, data);
    }

    // when server send 400 or upward some status then react directly send the access to 
    // catch block from try block .It is by default process.
    catch(err){
        console.log('Error while calling login api from client side '+ err);
        return err.response;
    }
}