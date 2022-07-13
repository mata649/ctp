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
        {images?.map((image) => (
          <SwiperSlide key={image}>
            <img
              src={image}
              alt="Carousel Image"
              className="carousel-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
