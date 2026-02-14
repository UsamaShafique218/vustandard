
import React from 'react';
import Banner from '../components/Banner';
import Service from '../components/Service';
import WhyChoose from '../components/WhyChoose';
import Testimonial from '../components/Testimonial';
import OurTeam from '../components/OurTeam';   
import StudentReviews from '../components/StudentReviews';

function Home() {
  return (
    <>
    <Banner />
    <Service />
    <WhyChoose />
    <Testimonial />
    <OurTeam />    
    <StudentReviews />
    </>
  );
}

export default Home;
