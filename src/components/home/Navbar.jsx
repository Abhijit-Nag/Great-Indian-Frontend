import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { navData } from '../../constants/data'

const Component = styled(Box)(({theme})=>({

    display: 'flex',
    margin: '55px 130px 0 130px',
    justifyContent: 'space-between',
    background:'white',
    [theme.breakpoints.down('lg')]:{
        margin:0,
        // flexWrap:'wrap'
        overflow:'overlay'
    }
})) 

const Container= styled(Box)`
    padding: 12px 8px;
    text-align: center;
`
const Text= styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
`
const Navbar = () => {
    return (
        <Component>
            {
                navData.map(data => (
                    <Container>
                        <img src={data.url} style={{width:64}} alt="" />
                        <Text>{data.text}</Text>
                    </Container>
                ))
            }
        </Component>
    )
}

export default Navbar