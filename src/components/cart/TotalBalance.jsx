import { DiscountTwoTone } from '@mui/icons-material'
import { Box, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'


const Heading= styled(Box)(({theme})=>({
padding:'15px 24px',
backgroundColor:'#fff',
borderBottom:'1px solid #f0f0f0',

}))

const Header = styled(Typography)(({theme})=>({
    color:'#878787'
}))

const Container= styled(Box)(({theme})=>({
    padding:'15px 24px',
    background:'#fff',
    '& >p':{
        marginBottom:'20px',
        fontSize:14
    },

    '& > h6':{
        marginBottom:20,

    }

}))

const Price=styled(Box)`
float: right;
`

const Discount= styled(Typography)(({theme})=>({
    color:'green',
}))
const TotalBalance = ({ cartItems }) => {

    const [price, setPrice]= useState(0);
    const [discount, setDiscount]= useState(0);

    const totalAmount= ()=>{
        let price= 0, discount=0;
        cartItems.map(item=>{
            price+= item.price.mrp *item.quantity;
            discount+= (item.price.mrp- item.price.cost)*item.quantity;
        });
        setPrice(price);
        setDiscount(discount);
    }

    useEffect(()=>{
        totalAmount();
    },[cartItems]);
    return (
        <Box style={{marginTop:25}} >
            <Heading>
                <Header>PRICE DETAILS</Header>
            </Heading>
            <Container>
                <Typography>Price({cartItems?.length} item)
                    <Price component="span">₹{price} </Price>
                </Typography>
                <Discount>Discount
                    <Price component="span">-₹{discount}</Price>
                </Discount>
                <Typography>Delivery Charges
                    <Price component="span">₹50</Price>
                </Typography>
                <Typography variant='h6'>Total Amount
                    <Price component="span">₹{price-discount +40} </Price>
                </Typography>
                <Typography style={{color:'red'}} >You will save ₹100 on this order
                    <Price component="span">₹{discount-40} </Price>
                </Typography>
            </Container>
        </Box>
    )
}

export default TotalBalance