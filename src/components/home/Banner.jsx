import { bannerData } from '../../constants/data';
import { styled } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import SwipeNext from './SwipeNext';

const Image = styled('img')(({theme})=>( {
  width: '100%',
  height: "230px",

  [theme.breakpoints.down('md')]:{
    objectFit:'cover',
    height:180
  }

}));



const Banner = () => {
  return (

    <Swiper
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      autoplay={true}
    >
      {
        bannerData.map(data => (

          <SwiperSlide>
            <Image src={data.url} alt='slide' />
          </SwiperSlide>
        ))
      }
      <SwipeNext />

    </Swiper>
  )
}

export default Banner