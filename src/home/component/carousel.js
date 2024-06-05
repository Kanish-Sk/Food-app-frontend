import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./carousel.css";
import arrowLeft from "./assets/arrow-left.svg";
import arrowRight from "./assets/arrow-right.svg";

function Carousel({ slides, onSlideChange }) {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.on("slideChange", () => {
        onSlideChange(swiperRef.current.swiper.realIndex);
      });
    }
  }, [onSlideChange]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
      swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, []);

  return (
    <div className="rounded-3xl relative">
      <Swiper
        ref={swiperRef}
        modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000, // Slide change delay in milliseconds
          disableOnInteraction: false, // Keep autoplay running on user interactions
        }}
        loop={true} // Enable continuous loop mode
        speed={1000}
        slidesPerView={"auto"}
        centeredSlides
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="slide-inner">
            <img src={slide.image} alt={slide.header} className="rounded-xl" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        ref={prevRef}
        className="button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
      >
        <img src={arrowLeft} alt="Left" />
      </div>
      <div
        ref={nextRef}
        className="button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
      >
        <img src={arrowRight} alt="Right" />
      </div>
    </div>
  );
}

export default Carousel;
