import { Box, Button, Typography, styled } from '@mui/material'
import React from 'react'
import { fassured } from '../../constants/data'
import { addEllipsis } from '../../utils/common_utils'
import GroupedButton from './GroupedButton'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../../redux/actions/cartActions'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Component = styled(Box)`
    border-top: 1px solid #f0f0f0;
    display: flex;
    background-color: white;
`

const LeftComponent = styled(Box)`
    margin: 20px;
    display: flex;
    flex-direction: column;
    
`

const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px;
`

const Remove= styled(Button)`
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;
`
const CartItem = ({ item }) => {

    // const dispatch= useDispatch();

    // const removeItemFromCart=(id)=>{
    //     dispatch(removeFromCart(id));
    // }

    const navigate= useNavigate();
    const goToProduct=()=>{
        // if I do not add / in the beginning of the link below then it will redirect to ....../product/id
        // but if I add / in the the beginning of the link below as it is done then it will redirect to /product/id
        navigate(`/product/${item.id}`);
    }
    const userId= localStorage.getItem("userId");

    // const url="http://localhost:8000";
    const url = process.env.REACT_APP_SERVER_API_KEY;
    const removeFromCart=async()=>{
        const response= await axios.put(`${url}/user/pulldata`, {
            productId: item.id,
            userId: userId
        });
        console.log(response);
        window.location.reload();
    }
    return (
        <Component>
            <LeftComponent>
                <img src={item.url} style={{height:110}}  alt="product" onClick={goToProduct} />
            <GroupedButton item={item}/>
            </LeftComponent>
            <Box style={{margin:20}} >
                <Typography onClick={goToProduct}>{addEllipsis(item.title.longTitle)} </Typography>
                <SmallText onClick={goToProduct}>Seller: SuperRetail
                    <Box component="span" onClick={goToProduct}><img src={fassured} alt="fassuredIcon" style={{ width: 50, marginLeft: 10 }} /></Box>
                </SmallText>
                <Typography onClick={goToProduct}>
                    <Box component="span" style={{ fontWeight: 600, fontSize: 18 }} >₹{item.price.cost} </Box>&nbsp;&nbsp;&nbsp;
                    <Box component="span" style={{ color: '#878787' }} ><strike> ₹{item.price.mrp}</strike> </Box>&nbsp;&nbsp;&nbsp;
                    <Box component="span" style={{ color: '#388E3C' }} >{item.price.discount} off </Box>
                </Typography>
                <Remove onClick={()=>removeFromCart()}>Remove</Remove>
            </Box>
        </Component>
    )
}

export default CartItem