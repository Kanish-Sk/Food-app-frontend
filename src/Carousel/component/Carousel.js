import React, { useEffect, useRef, useCallback } from "react";
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
import "./Carousel.css";
import arrowLeft from "../assets/arrow-left.svg";
import arrowRight from "../assets/arrow-right.svg";

const Carousel = ({ slides, onSlideChange }) => {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const handleSlideChange = useCallback(() => {
    if (swiperRef.current) {
      onSlideChange(swiperRef.current.swiper.realIndex);
    }
  }, [onSlideChange]);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.on("slideChange", handleSlideChange);
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }

    return () => {
      if (swiper) {
        swiper.off("slideChange", handleSlideChange);
      }
    };
  }, [handleSlideChange]);

  return (
    <div className="rounded-3xl relative carousel-container">
      <Swiper
        ref={swiperRef}
        modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={800}
        slidesPerView={1}
        centeredSlides={true}
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        grabCursor={true}
        watchSlidesProgress={true}
        initialSlide={0}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="slide-inner">
            <img
              src={slide.image}
              alt={slide.name}
              className="rounded-xl w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        ref={prevRef}
        className="button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
      >
        <img src={arrowLeft} alt="Left" />
      </div>
      <div
        ref={nextRef}
        className="button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
      >
        <img src={arrowRight} alt="Right" />
      </div>
    </div>
  );
};

export default Carousel;
