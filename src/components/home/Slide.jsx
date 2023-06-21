import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Box, Button, Divider, Typography, styled } from '@mui/material';
import Countdown from 'react-countdown';
import { timerURL } from '../../constants/data';
import SlideNext from './SlideNext';
import { Link } from 'react-router-dom';
const Component = styled(Box)`
    margin-top: 10px;

`
const Deal = styled(Box)`
    padding: 15px 20px ;
    display: flex;
    align-items: center;
`
const Timer = styled(Box)`
    display: flex;
    margin-left: 10px;
    align-items: center;
`
const DealText = styled(Typography)`
font-size: 22px;
font-weight: 600;
margin-right: 25px;
line-height: 32px;
`

const ViewAllButton = styled(Button)`
    margin-left: auto;
    background-color: #2874f0;
    border-radius:2px;
    font-size: 13px;
`
const Image = styled('img')(({theme})=>( {
    width: "auto",
    height: 150,
    [theme.breakpoints.down('sm')]:{
        height:120
    }
}))

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px;
`

const LargeSwiper = styled(Swiper)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('lg')]: {
        display: 'block'
    }


}))

const MidSwiper = styled(Swiper)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('lg')]: {
        display: 'block'
    },
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }


}))

const SmallSwiper = styled(Swiper)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
}))

const StyledLink= styled(Link)(({theme})=>({
    [theme.breakpoints.down('sm')]:{
        width:100
    }
}))
const Slide = ({ products, title, timer }) => {

    var [slidesPerView, setSlidesPerView] = useState(5);
    // var currWidth= window.innerWidth;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        setScreenWidth(window.innerWidth);
        if (screenWidth > 700) {
            setSlidesPerView(5);
        }
        else if (screenWidth > 600) {
            setSlidesPerView(4)
        }
        else {
            setSlidesPerView(3);
        }
        console.log(`screen width is : ${screenWidth}`);

    }, [screenWidth]);
    const renderer = ({ hours, minutes, seconds, completed }) => {
        return <Box variant="span">
            {hours}: {minutes} : {seconds} Left
        </Box>
    };
    return (
        <Component>
            <Deal>
                <DealText>{title} </DealText>
                {timer && (

                    <Timer>
                        <img src={timerURL} alt="timer" style={{ width: 24 }} />
                        <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                    </Timer>
                )}
                <ViewAllButton variant='contained' color='primary' >View All</ViewAllButton>
            </Deal>
            <Divider />

            {/* display for larger screen */}
            <LargeSwiper
                spaceBetween={50}
                slidesPerView={5}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {
                    products.map(product => (

                        <SwiperSlide>
                            <Link to={`product/${product.id}`} className='link' >
                                <Box textAlign="center" style={{ padding: "25px 15px" }} >
                                    <Image src={product.url} alt='product' />
                                    <Text style={{ fontWeight: "bold" }} >{product.title.shortTitle} </Text>
                                    <Text style={{ color: "green" }} >{product.discount} </Text>
                                    <Text style={{ color: "#212121", opacity: "0.6" }} >{product.tagline} </Text>
                                </Box>
                            </Link>
                        </SwiperSlide>
                    ))
                }
                <SlideNext />

            </LargeSwiper>

            {/* display for medium screen */}
            <MidSwiper
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {
                    products.map(product => (

                        <SwiperSlide>
                            <Link to={`product/${product.id}`} className='link' >
                                <Box textAlign="center" style={{ padding: "25px 15px" }} >
                                    <Image src={product.url} alt='product' />
                                    <Text style={{ fontWeight: "bold" }} >{product.title.shortTitle} </Text>
                                    <Text style={{ color: "green" }} >{product.discount} </Text>
                                    <Text style={{ color: "#212121", opacity: "0.6" }} >{product.tagline} </Text>
                                </Box>
                            </Link>
                        </SwiperSlide>
                    ))
                }
                <SlideNext />

            </MidSwiper>

            {/* display for smaller screen */}
            <SmallSwiper
                spaceBetween={50}
                slidesPerView={2}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {
                    products.map(product => (

                        <SwiperSlide>
                            <Link to={`product/${product.id}`} className='link' >
                                <Box textAlign="center" style={{ padding: "25px 15px" }} >
                                    <Image src={product.url} alt='product' />
                                    <Text style={{ fontWeight: "bold" }} >{product.title.shortTitle} </Text>
                                    <Text style={{ color: "green" }} >{product.discount} </Text>
                                    <Text style={{ color: "#212121", opacity: "0.6" }} >{product.tagline} </Text>
                                </Box>
                            </Link>
                        </SwiperSlide>
                    ))
                }
                <SlideNext />

            </SmallSwiper>
        </Component>
    )
}

export default Slide