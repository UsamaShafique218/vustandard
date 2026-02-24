import React, { useEffect } from "react";
import StudentReviewsSlider from "./StudentReviewsSlider";
 

const StudentReviews = () => {
   
  return (
    <section className="student_result_sec">
      <div className="container">
        <div className="headlines text-center mb-5">
          <h2>Academic Success Showcases</h2>
          <span>Proven Results Through Professional Academic Support</span>
          <p className="mt-3">
            Browse verified student results achieved through our dedicated academic
            assistance services, including quizzes, assignments, GDB participation,
            and full or partial LMS management. We focus on quality, accuracy, and
            timely submissions to ensure outstanding academic performance.
          </p>
        </div>

        <StudentReviewsSlider />
      </div>
    </section>
  );
};

export default StudentReviews;
