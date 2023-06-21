import React, { useState } from 'react'
import { AppBar, Box, Drawer, IconButton, List, ListItem, Toolbar, Typography, styled } from '@mui/material';
import Search from './Search';
import FeatureButtons from './FeatureButtons';
import { Link } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import india_gate from './../../assets/india_gate.png';
import { color } from 'framer-motion';

const StyledHeader = styled(AppBar)`
    /* background-color: #2874f0; */
    background-color:#0C1D36;
    height: 55px;
`
const logo = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
const subLogo = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png";
const Component = styled(Box)`
    /* margin-left: 12%; */
    line-height: 0;
`
const Subheading = styled(Typography)`
    font-size: 10px;
    font-style: italic;
    /* color: yellow; */
`

const PlusImage = styled('img')({
    width: "10px",
    height: "10px",
    marginLeft: "4px"

})

// const CustomButtonWrapper= styled(Box)(({theme})=>({
//     margin:' 0 5% 0 auto',
//     [theme.breakpoints.down('mid')]:{

//     }

// })) 

const CustomButtonWrapper = styled(Box)(({ theme }) => ({
    margin: '0 5% 0 auto',
    [theme.breakpoints.down('lg')]: {
        display: 'none'
    }
}))

// The below syntax is not valid syntax
// const PlusImage= styled.img`
//     width: 10px;
// `

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('lg')]: {
        display: 'block'
    }
}))

const StyledListItem= styled(ListItem)`
    display: flex;
    /* background-color: green; */
    justify-content: start;
    text-align: left;
`

const Title= styled(Typography)(({theme})=>({
    color:'#F9CC0B',
    fontFamily:'Fira Sans Extra Light',
    fontWeight:'bold',
    fontSize:30,
    width:200,
    // background:'orange',
    // marginTop:,
    marginLeft:10,
    marginRight:5
}));
const SubTitle= styled(Typography)(({theme})=>({
    color:'#F9CC0B',
    fontFamily:'Alegreya SC Medium',
    fontWeight:500,
    fontSize:6,
    marginLeft:10
}));

const Image= styled('img')(({theme})=>({
    width:36,
    height:36,
    // [theme.breakpoints.down('lg')]:{
    //     display:'none'
    // }
}));

const LogoWrapper= styled(Box)(({theme})=>({
    display:'flex',
    alignItems:'end'
}))
const Header = () => {

    const handleOpen = () => {
        setOpenDrawer(true);
    }
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleClose = () => {
        setOpenDrawer(false);
    }

    const list = () => {
        return (

            <Box >
                
                        <FeatureButtons mobile={true} setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
                    
            </Box>
        )
    }
    return (
        <StyledHeader>
            <Toolbar style={{ minHeight: 55 }}>
                <MenuButton color='inherit' onClick={handleOpen}>
                    <Menu />
                </MenuButton>

                <Drawer open={openDrawer} onClose={handleClose} >
                    {list()}
                </Drawer>
                <Link to={`/`} className='link' >
                    <Component>
                        <LogoWrapper>

                        <Image src={india_gate} alt="" />
                        <Box>

                        <Title>Great Indian</Title>
                        <SubTitle>Where Quality is King, Speed is Key, and Customer Service is Supreme! </SubTitle>
                        </Box>
                        <Image style={{marginLeft:'-25px'}} src={india_gate} alt="" />
                        </LogoWrapper>
                        {/* <img src={india_gate} alt="logo" style={{ width: "75px" }} />
                        <Box style={{ display: "flex" }}>
                            <Subheading>Explore&nbsp;
                                <Box component="span" style={{ color: "yellow" }}> Plus</Box>
                            </Subheading>
                            <PlusImage src={subLogo} alt="subLogo" />
                        </Box> */}
                    </Component>
                </Link>
                <Search />
                <CustomButtonWrapper>
                    <FeatureButtons mobile={false} />
                </CustomButtonWrapper>
            </Toolbar>
        </StyledHeader>
    )
}

export default Header