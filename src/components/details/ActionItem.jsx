import { FlashOn, ProductionQuantityLimits, ShoppingCart } from '@mui/icons-material';
import { Box, Button, Grid, styled } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/actions/cartActions';
import axios from 'axios';
import Quantity from './Quantity';
import Login from '../login/Login';
import Address from '../userAddress/Address';

const LeftContainer = styled(Box)(({ theme }) => ({

    minWidth: '40%',
    padding: '40px 0 0 80px',
    marginRight: '30px',
    [theme.breakpoints.down('md')]: {
        margin: 0,
        padding: 0
    },
    [theme.breakpoints.down('lg')]: {
        paddding: 0,

        '& > div': {
            display: 'flex',
            // justifyContent:'center',
        }
    }
}))

const Image = styled('img')(({ theme }) => ({
    padding: '15px',
    width: '260px',
    [theme.breakpoints.down('md')]: {
        padding: 30,
        width: '50%',

    },

    // [theme.breakpoints.down('sm')]: {
    //     padding: 30,
    //     width: '80%'
    // }


}))

const StyledButton = styled(Button)(({ theme }) => ({

    width: '46%',
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
        width: '30%',
        marginRight: 100,
        fontSize: 17
    },

    [theme.breakpoints.down('sm')]: {
        fontSize: 13,
        fontWeight: "bolder",
        margin:0,
        width:150
    }

}))

const ButtonWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        // background:'green',
        justifyContent: 'space-around',
        marginTop: '10px'
    }
}))

const ActionItem = ({ product }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [isAddressSet, setIsAddressSet] = useState(false);
    const [openAddressModal, setOpenAddressModal] = useState(false);
    // const url = "http://localhost:8000";
    const url = process.env.REACT_APP_SERVER_API_KEY;
    // await useSelector()
    const userId = localStorage.getItem('userId');
    const productId = product.id;

    const add_to_cart = async () => {
        await dispatch(addToCart(id, quantity));

        const res = await axios.get(`${url}/product/${id}`);
        // const response = await axios.put(`${URL}/user/addtocart`, {
        //     product: res,
        //     user: userId
        // });
        // console.log(`response after adding product to the cart of the user ${userId} :  `+ response);/
        navigate('/cart');
    }

    const item_to_cart = async () => {
        const response = await axios.put(`${url}/user/pushdata`, {
            productId: id,
            userId: userId
        });
        navigate('/cart');
        console.log(response);
        // console.log(`response after adding item to cart successfully  : ${response}`);
    }
    const { id } = product;
    console.log('cart product id:', id);


    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <LeftContainer>
            <Grid style={{
                padding: '15px 20px',
                border: "1px solid #f0f0f0", width: "90%",
                display: 'flex',
                justifyContent: 'center'
            }}>

                <Image src={product.detailUrl} alt="product" />
            </Grid>
            <Quantity item={product} setQuantity={setQuantity} quantity={quantity} />
            <ButtonWrapper >

                <StyledButton
                    onClick={userId ? () => item_to_cart() : () => handleClick()}
                    style={{ marginRight: 10, background: '#FF9F00' }} variant='contained'>
                    <ShoppingCart />
                    <span>  Add to Cart</span>
                </StyledButton>
                <StyledButton onClick={userId ? () => setOpenAddressModal(true) : () => handleClick()} style={{ background: '#fb541b' }} variant='contained'>
                    <FlashOn />
                    <span>  Buy Now</span>
                </StyledButton>

            </ButtonWrapper>
            {!isAddressSet && openAddressModal && <Address setIsAddressSet={setIsAddressSet} setOpenAddressModal={setOpenAddressModal} product={product} quantity={quantity} />}
            <Login open={open} setOpen={setOpen}  />
        </LeftContainer>
    )
}

export default ActionItem