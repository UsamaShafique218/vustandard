import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import userImg1 from "../assets/images/user_img1.jpeg";
import femaleIcon from "../assets/images/female_icon.png";


const TestimonialSlider = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            loop={true}
            className="imageSlider"
            breakpoints={{
                0: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                    navigation: false,
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    navigation: true,
                },
            }}
        >

            <SwiperSlide>
                <div className="review_card">
                    <div className="review_card_image">
                        <img
                            src={userImg1}
                            alt="Usama Shafique"
                            loading="lazy"
                        />
                    </div>

                    <div className="review_card_content">
                        <h3 className="review_card_name">Usama Shafique</h3>
                        <div className="review_card_rating">
                            <span className="star filled">&#9733;</span>
                            <span className="star filled">&#9733;</span>
                            <span className="star filled">&#9733;</span>
                            <span className="star filled">&#9733;</span>
                            <span className="star half">&#9733;</span>
                        </div>

                        <div className="review_card_text">
                            <p>I always visit Pak Jobs Ghazi for new vacancies. Their updates are fast, reliable, and extremely helpful for applying without any confusion.</p>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="review_card">
                    <div className="review_card_image">
                        <img
                            src={femaleIcon}
                            alt="Alina Razzaq"
                            loading="lazy"
                        />
                    </div>

                    <div className="review_card_content">
                        <h3 className="review_card_name">Alina Razzaq</h3>

                        <div className="review_card_rating">
                            <span className="star filled">&#9733;</span>
                            <span className="star filled">&#9733;</span>
                            <span className="star filled">&#9733;</span>
                            <span className="star filled">&#9733;</span>
                            <span className="star half">&#9733;</span>
                        </div>

                        <div className="review_card_text">
                            <p>You are a brilliant teacher your teaching method is too good and understandable it's helps alot for preparation.</p>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="review_card">
                    <div className="review_card_image">
                        <img
                            src={femaleIcon}
                            alt="Ayesha Mughal"
                            loading="lazy"
                        />
                    </div>

                    <div className="review_card_content">
                        <h3 className="review_card_name">Ayesha Mughal</h3>

                        <div className="review_card_rating">
                            <span className="star filled">&#9733;</span>
                            <span className="star filled">&#9733;</span>
                            <span className="star filled">&#9733;</span>
                            <span className="star filled">&#9733;</span>
                            <span className="star half">&#9733;</span>
                        </div>

                        <div className="review_card_text">
                            <p>Sir Usama boht achy teacher Hain students ki bohtt help krty Hain hmysha study may koi b pershni yah mushkil ho osko foran Hal krwa dyty hai or preparation b achi ho jati hai enki de hui guide lines sy..personally b bohtt achy Insan Hain.</p>
                        </div>
                    </div>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className="review_card">
                    <div className="review_card_image">
                        <img
                            src={userImg1}
                            alt="Usama Shafique"
                            loading="lazy"
                        />
                    </div>

                    <div className="review_card_content">
                        <h3 className="review_card_name">Usama Shafique</h3>

                        <div className="review_card_rating">
                            <span className="star filled">&#9733;</span>
                            <span className="star filled">&#9733;</span>
                            <span className="star filled">&#9733;</span>
                            <span className="star filled">&#9733;</span>
                            <span className="star half">&#9733;</span>
                        </div>

                        <div className="review_card_text">
                            <p>I always visit Pak Jobs Ghazi for new vacancies. Their updates are fast, reliable, and extremely helpful for applying without any confusion.</p>
                        </div>
                    </div>
                </div>
            </SwiperSlide> 

        </Swiper>
    );
};

export default TestimonialSlider;
