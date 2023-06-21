import { Box, Button, Grid, Typography, styled } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from './CartItem';
import TotalBalance from './TotalBalance';
import EmptyCart from './EmptyCart';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddressCartOrder from '../userAddress/AddressCartOrder';
const Container = styled(Grid)(({theme})=>({

    padding: '30px 135px',
    [theme.breakpoints.down('lg')]:{
        // background:"green",
        padding:'30px'
    }
}))
    
const Header = styled(Box)`
    padding: 15px 24px;
    `
const CartWrapper = styled(Box)`
background-color: #f2f2f2;
height: 100%;
    
`

const ButtonWrapper = styled(Box)(({ theme }) => ({
    padding: '16px 22px',
    background: '#fff',
    boxShadow: '0 -2px 10px 0 rgb(0 0 0/ 10%)',
    borderTop: '1px solid #f0f0f0'
}))

const StyledButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    marginLeft: 'auto',
    backgroundColor: '#fb641b',
    color: 'white',
    width: 250,
    height: 51,
    borderRadius: 2
}))
const Cart = () => {

    // const { cartItems } = useSelector(state => state.cart);
    const navigate = useNavigate();
    const userId = window.localStorage.getItem("userId");
    console.log(`userId while calling google auth cart client side :  ${userId}`);
    const [cartItems, setCartItems] = useState([]);

    const [isAddressSet, setIsAddressSet] = useState(false);
    const [openAddressModal, setOpenAddressModal] = useState(false);
    useEffect(() => {
        const fetchData = async () => {

            // const { data } = await axios.post("http://localhost:8000/user/getcart", { userId: userId });
            const { data }= await axios.post(`${process.env.REACT_APP_SERVER_API_KEY}/user/getcart`, {userId : userId});
            console.log(data);
            setCartItems(data);
            console.log(cartItems);
        };
        fetchData();
    }, []);

    const scrollRef=useRef(null);

    const handleClick = (id) => {
        navigate(`/product/${id}`);
    }
    return (
        <CartWrapper >
            {
                (cartItems.length ) ?
                    <Container container>
                        {!openAddressModal &&(

                            <Grid item lg={9} md={9} sm={12} xs={12} >
                            <Box>
                                <Typography>My Cart( {cartItems.length} ) </Typography>
                            </Box>
                            {
                                cartItems.map((item) => (
                                    <Box style={{ cursor: 'pointer' }}>

                                        <CartItem item={item} />
                                    </Box>
                                ))
                            }
                            <ButtonWrapper onClick={()=>{setOpenAddressModal(true); }} >
                                <StyledButton>Place Order</StyledButton>
                            </ButtonWrapper>
                        </Grid>
                                )}

                        <Grid item lg={3} md={3} sm={12} xs={12} >
                            <TotalBalance cartItems={cartItems} />
                        </Grid>
                        {openAddressModal && !isAddressSet && <AddressCartOrder setIsAddressSet={setIsAddressSet} products={cartItems} setOpenAddressModal={setOpenAddressModal} />}
                    </Container>
                    :
                    <EmptyCart />
            }
        </CartWrapper>
    )
}

export default Cart