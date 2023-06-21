import { Box, styled } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import OrderItem from './OrderItem';



const OrderWrapper = styled(Box)(({ theme }) => ({
    background: '#f2f2f2',
    width: '100%'
}))
const OrderList = () => {

    // const url = "http://localhost:8000";
    const url = process.env.REACT_APP_SERVER_API_KEY;
    const userId = localStorage.getItem('userId');
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post(`${url}/user/getbuyorders`, { userId: userId });
            // console.log(`data of orderlist : ${JSON.stringify(response)}`);
            console.log(response.data.products)
            setProducts(response.data.products);
        };
        fetchData();
    }, []);
    return (
        <OrderWrapper>
            {products.map((item) => (
                <>
                
                    {item.productDetails.map(product => (
                        <>

                            <OrderItem item={product} orderDetails={item} />
                            <br />
                        </>
                    ))}
                </>
            ))}
        </OrderWrapper>
    )
}

export default OrderList