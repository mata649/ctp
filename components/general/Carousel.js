import React, { useRef, useState } from "react";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export const Carousel = ({ images }) => {

  return (
    <div className="carousel-container">
      <div className="carousel-background"></div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image src={image} width={1024} height={576} alt="Carousel Image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
