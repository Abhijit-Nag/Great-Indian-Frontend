import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { styled } from '@mui/material'
import React from 'react'
import { useSwiper } from 'swiper/react'

const PrevButton = styled('button')(({theme})=> ({
    padding: "10px 5px",
    position: "absolute",
    left: 0,
    top: "30%",
    height: "100px",
    backgroundColor: "white",
    // bottom:"50%",
    zIndex: 999,
    border: "none",
    borderRadius: "0 6px 6px 0",
    cursor: "pointer",
    boxShadow: "3px 5px 27px -8px rgba(0,0,0,0.69)",

    [theme.breakpoints.down('sm')]:{
        height:80,
        top:'36%'
    }

}))

const NextButton = styled('button')(({theme})=>({
    padding: "10px 5px",
    position: "absolute",
    right: 0,
    top: "30%",
    height: "100px",
    backgroundColor: "white",
    // bottom:"50%",
    zIndex: 999,
    border: "none",
    borderRadius: "6px 0 0 6px",
    cursor: "pointer",
    boxShadow: "3px 5px 27px -8px rgba(0,0,0,0.69)",
    [theme.breakpoints.down('sm')]:{
        height:80,
        top:'36%'
    }

}))
const SlideNext = () => {
    const swiper = useSwiper();
    return (
        <>
            <PrevButton onClick={() => swiper.slidePrev()}> <ChevronLeft fontSize='large' /> </PrevButton>
            <NextButton onClick={() => swiper.slideNext()}><ChevronRight fontSize='large' /> </NextButton>
        </>
    )
}

export default SlideNext