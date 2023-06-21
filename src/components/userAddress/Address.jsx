import { FlashOn } from '@mui/icons-material';
import { Box, Button, TextField, Typography, styled } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
// import great-indian-website-favicon-color from "."
import logo_favicon from "./../../assets/logo_favicon.png";


const Component = styled(Box)(({ theme }) => ({

    height: '100vh',
    width: '100vw',
    display: 'flex',
    position: 'absolute',
    // justifyContent:'center',
    top: 65,
    left: 0,
    flexDirection: 'column',
    alignItems: 'center',
    // width: '100%',
    // height: '100%',
    background: 'white',

    [theme.breakpoints.down('md')]: {
        width: '100vw',
        height: '150vh',
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
        background: 'white'
    }
}))

const Heading = styled(Typography)(({ theme }) => ({
    fontSize: 24,
    fontFamily: 'Montserrat',
    fontWeight: 'bold'
}))

const InputBox = styled(Box)(({ theme }) => ({
    display: 'grid',
    // flexDirection:'column',
    placeItems: 'center',
    // background:'green',
    width: '90%',
    [theme.breakpoints.down('sm')]: {
        display: 'grid',
        placeItems: 'center',
        width: '90%',
        padding: 10
    }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    padding: 10,
    borderRadius: 6,
    width: '60%',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        // background:'orange',
        // border:'1px solid #f2f2f2',
        padding: 10,
        borderRadius: 6
    }
}))

const StyledButton = styled(Button)(({ theme }) => ({

    width: '100%',
    height: 50,
    borderRadius: 2,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontWeight: 'bolder',
    fontFamily: 'Arial',
    fontSize: 16,
    lineHeight: 1.3,

    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginRight: 100,
        fontSize: 17
    },

    [theme.breakpoints.down('sm')]: {
        fontSize: 13,
        fontWeight: "bolder",
        width: '100%',
        marginTop: 30
    }

}));





const Address = ({ setIsAddressSet, setOpenAddressModal, product, quantity }) => {


    const { id } = product;



    const callPayment = async () => {
        // setOpenAddressModal(true);


        // setOpenAddressModal(false);
        const amount = product.price.cost * quantity;
        const name= localStorage.getItem("firstname")+"  "+ localStorage.getItem("lastname");
        // const data= await axios.post(`${url}/api/checkout`);
        // console.log(`response data after payment checkout api calling :  ${data}`);
        const { data: { payload } } = await axios.post(`${url}/api/checkout`,
            {
                amount
            });
        console.log(payload);

        const { data: { key } } = await axios.get(`${url}/api/getkey`);
        console.log(key);


        const options = {
            key: key, // Enter the Key ID generated from the Dashboard
            amount: payload.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Great Indian",
            description: "Test Transaction",
            // image: "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png",
            image:logo_favicon ,
            order_id: payload.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            // callback_url: `http://localhost:8000/api/paymentverification/${userId}/${id}/${quantity}`,
            callback_url: `${process.env.REACT_APP_SERVER_API_KEY}/api/paymentverification/${userId}/${id}/${quantity}`,
            // prefill: {
            //     name: "Gaurav Kumar",
            //     email: "gaurav.kumar@example.com",
            //     contact: "9000090000"
            // },
            prefill: {
                name: name,
                email: localStorage.getItem("email"),
                contact: localStorage.getItem("phone")
            },
            notes: {
                address: "Great Indian Limited."
            },
            theme: {
                color: "#3399cc"
            }
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
        setOpenAddressModal(false);
        setIsAddressSet(false);
    }




    const country= localStorage.getItem("country");
    const state= localStorage.getItem("state");
    const district= localStorage.getItem("district");
    const postalCode= localStorage.getItem("postalCode");
    const fullAddress= localStorage.getItem("fullAddress");
    const [address, setAddress] = useState({
        country: country,
        state: state,
        district: district,
        postalCode: postalCode,
        fullAddress: fullAddress,
    });
    // const url = "http://localhost:8000";
    const url =process.env.REACT_APP_SERVER_API_KEY;
    const userId = window.localStorage.getItem("userId");
    const handleClick = async () => {
        console.log(address);
        const response = await axios.post(`${url}/user/setaddress`, ({
            address: address,
            userId: userId
        }));
        if (response.data.success) {

            localStorage.setItem("country", address.country);
            localStorage.setItem("state", address.state);
            localStorage.setItem("district", address.district);
            localStorage.setItem("postalCode", address.postalCode);
            localStorage.setItem("fullAddress", address.fullAddress);
            setIsAddressSet(true);
            callPayment();
        }
        console.log(response);
    }
    return (


        <Component>
            <Box>
                <Heading>Your Delivery Address</Heading>
            </Box>
            <InputBox>
                <StyledTextField variant='outlined' name='country' value={address.country} onChange={(e) => { setAddress({ ...address, [e.target.name]: e.target.value }) }} label='Enter Your Country' />
                <StyledTextField variant='outlined' name='state' value={address.state} onChange={(e) => { setAddress({ ...address, [e.target.name]: e.target.value }) }} label='Enter Your State' />
                <StyledTextField variant='outlined' name='district' value={address.district} onChange={(e) => { setAddress({ ...address, [e.target.name]: e.target.value }) }} label='Enter Your District' />
                <StyledTextField variant='outlined' name='postalCode' value={address.postalCode} onChange={(e) => { setAddress({ ...address, [e.target.name]: e.target.value }) }} label='Enter Your Postal Code' />
                <StyledTextField variant='outlined' name='fullAddress' value={address.fullAddress} onChange={(e) => { setAddress({ ...address, [e.target.name]: e.target.value }) }} label='Enter Your Address' />
            </InputBox>
            <Box>
                <StyledButton onClick={handleClick} style={{ background: '#fb541b' }} variant='contained'>
                    <FlashOn />
                    <span>  Buy Now</span>
                </StyledButton>
            </Box>
        </Component>
    )
}

export default Address