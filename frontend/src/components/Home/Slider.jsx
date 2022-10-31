import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "./Home.css";
import Card from "./Card";
const Slider = ({ data }) => {
  return (
    <div className="slider">
      <Swiper
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
        className="mySwiper"
        slidesPerView={3}
        spaceBetween={30}
        autoplay={true}
      >
        {data.map((item, key) => (
          <SwiperSlide key={key}>
            <Card data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
