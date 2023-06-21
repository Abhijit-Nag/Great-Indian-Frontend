import { Close, ShoppingCart } from '@mui/icons-material'
import { Badge, Box, Button, Divider, List, ListItem, Typography, styled } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Login from '../login/Login'
import { DataContext } from '../../context/DataProvider'
import Profile from './Profile'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Wrapper = styled(Box)(({ theme }) => ({

  display: 'flex',
  alignItems: 'center',
  margin: ' 0 3% 0 auto',
  '& > button': {
    marginRight: '40px !important',
    alignItems: 'center'
  },

  '& > p': {
    marginRight: '40px !important',
    alignItems: 'center'
  },
  '& > div': {
    marginRight: '40px !important',
    alignItems: 'center'
  },

  // or we can write like this
  // '& > *': {
  //   marginRight: '40px !important',
  //   alignItems: 'center',

  // },

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }

}));

const ButtonWrapper= styled(Box)(({theme})=>({
  // width:"60%",
  display:'flex',
  justifyContent:'space-around',
  // background:'green',
  float:'right'
}))



const FeatureButtons = ({ mobile, setOpenDrawer, openDrawer }) => {
  const [open, setOpen] = useState(false);
  const { account, setAccount } = useContext(DataContext);
  // const { cartItems } = useSelector(state => state.cart);
  const userId = localStorage.getItem("userId");
  const [cartItems, setCartItems] = useState();
  const navigate= useNavigate();
  useEffect(() => {
    const fetchData = async () => {

      // const { data } = await axios.post("http://localhost:8000/user/getcart", { userId: userId });
      const { data }= await axios.post(`${process.env.REACT_APP_SERVER_API_KEY}/user/getcart`, { userId : userId});
      setCartItems(data);
    };
    if (account) {

      fetchData();
    }
  }, [cartItems])

  const handleClick=(goto)=>{
    if(!account){
      setOpen(!open);
    }else{
      navigate(`/${goto}`);
    }
  }
  return (
    <Wrapper>

      {mobile ? (
        <>
          <List style={{ padding: 30, paddingTop: 0, borderBottom: '1px solid gray', borderTop: '3px solid gray' }}>
            <Close style={{ float: 'right', margin: '10px 0px' }} onClick={() => setOpenDrawer(!openDrawer)} />
            <ListItem divider>

              {
                account ? <Profile account={account} setAccount={setAccount} mobile={mobile} /> :
                  <Button onClick={() => setOpen(!open)} style={{ backgroundColor: "white", color: "#2874f0", textTransform: "none", fontSize: 18, lineHeight: 3, padding: "5px 40px", borderRadius: "2px", boxShadow: "none", fontWeight: "bold", height: "32px" }} variant='contained'>Login</Button>
              }
              {/* <Profile account={'rahul'} setAccount={setAccount} /> */}
            </ListItem>
            <ListItem divider>

              <Typography onClick={()=>{navigate('/aipage');setOpenDrawer(!openDrawer);}} style={{ marginTop: 3, width: 135, fontSize: 18,cursor:'pointer', lineHeight: 3 }}>Ask Our AI</Typography>
            </ListItem>
            <ListItem divider>

              <Typography style={{ marginTop: 3, width: 135, fontSize: 18, lineHeight: 3 }}>Become a Seller</Typography>
            </ListItem>
            <ListItem onClick={() => setOpenDrawer(!openDrawer)} divider component={Link} to={`/orders`}>

              <Typography style={{ fontSize: 18, lineHeight: 3, color: 'black' }} >My Orders</Typography>
            </ListItem >
            <ListItem onClick={() => setOpenDrawer(!openDrawer)} >

              <Link className='link' to={`/cart`} style={{ marginLeft: -16, textDecoration: 'none' }}>
                <Box style={{ display: "flex", alignItems: "center" ,  cursor:'pointer' }}>
                  <Badge badgeContent={cartItems?.length} color='info'>

                    <ShoppingCart />
                  </Badge>
                  <Typography style={{ marginLeft: 10, fontSize: 18, lineHeight: 3 }}>Cart</Typography>
                </Box>
              </Link>
            </ListItem>
            <Login open={open} setOpen={setOpen} />
          </List>
          <Divider />
        </>
      )
        :
        (
          <>
          <ButtonWrapper>
            {
              account ? (
                <Box style={{ flex: 2, cursor: 'pointer' }}>
                  <Profile account={account} setAccount={setAccount} mobile={mobile} />
                </Box>
              ) :
              <Button onClick={() => setOpen(!open)} style={{ backgroundColor: "white", color: "#2874f0", textTransform: "none", padding: "5px 40px",marginLeft:100,  borderRadius: "2px", boxShadow: "none", fontWeight: "bold", height: "32px" }} variant='contained'>Login</Button>
            }
            {/* <Profile account={'rahul'} setAccount={setAccount} /> */}
            <Typography style={{ marginTop: 3, width: '235px', flex: 2, padding: 0,cursor:'pointer', textAlign: 'right' }} onClick={()=>navigate('/aipage')}>Ask Our AI</Typography>
            <Typography style={{ marginTop: 3, width: '235px', flex: 2, padding: 0, textAlign: 'right' }}>Become a Seller</Typography>
            <Typography style={{ marginTop: 3, width: 135, flex: 2, display: 'flex', justifyContent: 'center', cursor:'pointer' }} onClick={()=>handleClick("orders")} >My Orders</Typography>
            {/* <Link className='link' to={`/cart`}> */}
              <Box style={{ display: "flex", marginRight: -150, flex:2 ,  cursor:'pointer' }} onClick={()=>handleClick("cart")}>
                <Badge badgeContent={cartItems?.length} color='info'>

                  <ShoppingCart />
                </Badge>
                <Typography style={{ marginLeft: 10 }}>Cart</Typography>
              </Box>
          </ButtonWrapper>
              {/* </Link> */}
            <Login open={open} setOpen={setOpen} />

            </>
        )}



    </Wrapper>
  )
}

export default FeatureButtons