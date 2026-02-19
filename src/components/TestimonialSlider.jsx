import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

 
import javid_ali from "../assets/images/javid_ali.JPEG";
import ashir_img from "../assets/images/ashir_img.JPEG";
import femaleIcon from "../assets/images/female_icon.PNG";
import maleIcon from "../assets/images/male_icon.PNG";


const reviews = [
  {
    name: "Javid Ali",
    degree: "BSCS",
    image: javid_ali,
    text: "Professional LMS handling. Course selection and assignments were managed smoothly.",
  },
  {
    name: "Alina Razzaq",
    image: femaleIcon,
    text: "You are a brilliant teacher. Your teaching method is very understandable and helps a lot in preparation.",
  },
  {
    name: "Ayesha Mughal",
    image: femaleIcon,
    text: "Sir Usama boht achy teacher hain. Students ki boht help krty hain aur preparation bhi strong ho jati hai.",
  },
  {
    name: "Irsa Ashfaq",
    image: femaleIcon,
    text: "Your services are excellent, Sir Usama. You've been a great guide and helped me immensely with my studies. Your friendly approach and willingness to clarify doubts have made me feel comfortable asking questions without hesitation. Thank you for your guidance and support!",
  },
  {
    name: "Shawana",
    degree: "BSIT",
    image: femaleIcon,
    text: "Thank you so much, Sir! Your guidance and support have been invaluable in helping me complete my assignments. Your teaching style and expertise have made complex concepts easier to understand. I'm grateful for your dedication and hard work. Keep up the fantastic job, Sir!🙏📚",
  },
  {
    name: "Fatima Noor",
    degree: "BBA",
    image: femaleIcon,
    text: "GDB aur LMS handling ka experience boht professional tha. Communication bhi clear aur fast thi.",
  },
  {
    name: "NAIMAL ASIF FAROOQUI",
    degree: "Sociology",
    image: femaleIcon,
    text: "Usama Thanks, Bht achy sy lms handle kia ap ny Acadmic Activies ki wja sy mera acha grade aya , again thanks..!",
  },
  {
    name: "M REHAN IRFAN",
    degree: "BSCS",
    image: maleIcon,
    text: "Preparation guidelines boht helpful thi. Or Lms Handle b Bht achy sy kia , Final exams me great marks aaye.",
  },
  {
    name: "ASHIR SHABIR",
    degree: "BS Business Administration",
    image: ashir_img,
    text: "Usama Bhai Bht Bht shukria apka ap ny bht achy sy handle kia lms or files etc b outclass share ki jis sy mera result kafi bhtr hova, Thanks a lot...",
  },
];

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
      {reviews.map((review, index) => (
        <SwiperSlide key={index}>
          <div className="review_card">
            <div className="review_card_image">
              <img
                src={review.image}
                alt={review.name}
                loading="lazy"
              />
            </div>

            <div className="review_card_content">
              <h3 className="review_card_name">{review.name}</h3>

              {review.degree && <span>{review.degree}</span>}

              {/* <div className="review_card_rating">
                <span className="star filled">&#9733;</span>
                <span className="star filled">&#9733;</span>
                <span className="star filled">&#9733;</span>
                <span className="star filled">&#9733;</span>
                <span className="star half">&#9733;</span>
              </div> */}

              <div className="review_card_text">
                <p>{review.text}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSlider;