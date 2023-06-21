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
const GroupedButton = ({item}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const userId=localStorage.getItem("userId");
  // const url= "http://localhost:8000";
  const url = process.env.REACT_APP_SERVER_API_KEY;
  const navigate= useNavigate();
  const handleClick=async(task)=>{
    const {response}=await axios.put(`${url}/user/cart/quantityupdate`,{
      productId:item.id,
      userId:userId,
      task:task
    });
    console.log(response);
    window.location.reload();
    // navigate('/cart');
  }
  return (
    <Component>
      <StyledButton onClick={() =>{ 
        const task="dec";
        handleClick(task);
        }} >-</StyledButton>
      <Button disabled>{quantity>=0? quantity : setQuantity(0)}</Button>
      <StyledButton onClick={() =>{
        const task="inc";
        handleClick(task);
        }} >+</StyledButton>
    </Component>
  )
}

export default GroupedButton