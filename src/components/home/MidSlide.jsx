import React from 'react'
import Slide from './Slide'
import { Box, styled } from '@mui/material'
import { adURL } from '../../constants/data'

const Component = styled(Box)`
    display: flex;
    justify-content: space-between;
`
const LeftComponent = styled(Box)(({theme})=>({

    width: '75%',
    [theme.breakpoints.down('md')]:{
        width:'100%'
    }
}))

const RightComponent = styled(Box)(({theme})=>({

    width: 'auto',
    padding: 5,
    backgroundColor: 'white',
    [theme.breakpoints.down('md')]:{
        display:"none"
    }
}))

const MidSlide = ({ products, title, timer }) => {
    return (
        <Component>
            <LeftComponent>
                <Slide
                    products={products}
                    title={title}
                    timer={timer}
                />
            </LeftComponent>
            <RightComponent>
                <img src={adURL} alt="ad" width="230px" height="auto" />
            </RightComponent>
        </Component>
    )
}

export default MidSlide