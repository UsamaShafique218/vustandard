import React from "react"; 
import TestimonialSlider from "./TestimonialSlider";
 

const Testimonial = () => {
  return (
    <section className="review_sec">
      <div className="autoContent">
        <div className="review_sec_inner">
          <div className="headlines animated fadeInUpShort slow">
            <h2>Testimonial</h2>
            <p className="text-muted">Read honest reviews from our users.</p>
          </div>
          <div className="review_sec_content">
            <TestimonialSlider />
          </div>
        </div>  
      </div>
    </section>
  );
};

export default Testimonial;
