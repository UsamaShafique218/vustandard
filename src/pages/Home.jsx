
import React from 'react';
import Banner from '../components/Banner';
import Service from '../components/Service';
import WhyChoose from '../components/WhyChoose';
import Testimonial from '../components/Testimonial';
import OurTeam from '../components/OurTeam';   
import StudentReviews from '../components/StudentReviews';
import LmsHandled from './LmsHandled';

function Home() {
  return (
    <>
    <Banner />
    <Service />
    <LmsHandled />
    <WhyChoose />
    <Testimonial />
    <OurTeam />    
    <StudentReviews />
    
    </>
  );
}

export default Home;
