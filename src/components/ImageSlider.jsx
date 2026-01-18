import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
 
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import img_slider_img1 from "../assets/images/img_slider_img1.jpeg";


const ImageSlider = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            loop={true}
            className="imageSlider"
        >
            <SwiperSlide>
                <div className="image_slide">
                    <div className="os_cRight_img_slide">
                        <img src={img_slider_img1} alt="" />
                    </div> 
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="image_slide">
                    <div className="os_cRight_img_slide">
                        <img src={img_slider_img1} alt="" />
                    </div> 
                </div>
            </SwiperSlide> 
        </Swiper>
    );
};

export default ImageSlider;
