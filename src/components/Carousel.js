import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/swiper-bundle.css'
import PropTypes from 'prop-types'

const Carousel = ({ images }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index.toString()}>
          <img src={image} alt={`${index}`} style={{ width: '100%' }} />
        </SwiperSlide>)
      )}
    </Swiper>
  )
}

Carousel.propTypes = {
  images: PropTypes.array.isRequired
}

export default Carousel
