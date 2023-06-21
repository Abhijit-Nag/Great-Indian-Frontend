import { Button, ButtonGroup, styled } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Component = styled(ButtonGroup)`
  margin-top: 30px;
`

const StyledButton = styled(Button)`
  border-radius: 50%;
`

const Input = styled('input')(({ theme }) => ({
    textAlign: "center",
    fontSize: 16,
    fontWeight: 'bold'
}))
const Quantity = ({ item, quantity, setQuantity }) => {
    //   const [quantity, setQuantity] = useState(item.quantity);
    const userId = localStorage.getItem("userId");
    // const url = "http://localhost:8000";
    const url =process.env.REACT_APP_SERVER_API_KEY;
    const navigate = useNavigate();
    const handleClick = async (task) => {
        const { response } = await axios.put(`${url}/user/cart/quantityupdate`, {
            productId: item.id,
            userId: userId,
            task: task
        });
        console.log(response);
        window.location.reload();
        // navigate('/cart');
    }
    return (
        <Component>
            <StyledButton onClick={() => {
                setQuantity((prev) => {
                    if (prev > 1) {
                        return prev - 1;
                    }
                    else return prev;
                })
            }} >-</StyledButton>
            <Input autoFocus type="number" placeholder="1" onChange={(e) => setQuantity(Number(e.target.value))} value={Number(quantity)} />
            {/* <Button disabled>{quantity>0? quantity : setQuantity(1)}</Button> */}
            <StyledButton onClick={() => {
                setQuantity((prev) => { return (prev + 1) })
            }} >+</StyledButton>
        </Component>
    )
}

export default Quantity;