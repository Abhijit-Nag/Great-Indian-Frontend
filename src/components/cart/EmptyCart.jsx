import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { imgurl } from '../../constants/data'
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)(({ theme }) => ({
  width: '80%',
  background: '#fff',
  height: '65vh',
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  margin: 'auto'
}))
const Container = styled(Box)`
   text-align: center;
   padding-top: 70px; 
`

const Image = styled('img')(({ theme }) => ({
  width: '30%',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const Text = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat',
  fontWeight: 600,
  fontSize: 24
}))
const EmptyCart = () => {

  const navigate = useNavigate();
  return (
    <Box style={{ margin: 0, background: '#f2f2f2', height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0 }}>

      <Component>
        <Container>
          <Image src={imgurl} alt="empty" />
          <Text>Your cart is empty!</Text>
          <Text onClick={() => navigate("/")} style={{ cursor: 'pointer' }} >Add items to it now</Text>
        </Container>
      </Component>
    </Box>
  )
}

export default EmptyCart