import React from 'react'
import chooseSecImg from "../assets/images/choose_sec_img.png"; 

function WhyChoose() {
  return (
    <div className="why_choose_vus">
      <div className="autoContent">
        <div className="why_choose_vus_inner">
          <div className="why_choose_vus_left">
            <div className="r_vus_left_heading animatedParent animateOnce">
              <h2 className="animated fadeInUpShort slow">Why Choose <span>Vu Standard?</span></h2>
              <p className="animated fadeInUpShort slow delay-250">VU Standard offers expert educational support for Virtual University students, including assignments, quizzes, projects, and LMS guidance. Our services ensure accuracy, timely submission, and clear understanding of concepts, helping students save time, reduce stress, and achieve better academic results.</p>
            </div>

            <div className="r_vus_left_content animatedParent animateOnce">
              <ul>
                <li className="animated fadeInUpShort slow delay-500">
                  <div className="r_vus_left_info">
                    <h4>Transparent Pricing</h4>
                    <p>Get clear, upfront pricing for all services with no hidden fees, so you can focus on learning without worry.</p>
                  </div>
                </li>
                <li className="animated fadeInUpShort slow delay-500">
                  <div className="r_vus_left_info">
                    <h4>Reliable Support</h4>
                    <p>Our team is available 24/7 to guide you through assignments, quizzes, and LMS tasks efficiently and on time.</p>
                  </div>
                </li>
                <li className="animated fadeInUpShort slow delay-500">
                  <div className="r_vus_left_info">
                    <h4>Comfortable Learning</h4>
                    <p>Enjoy a smooth and stress-free learning experience with personalized guidance tailored to your pace.</p>
                  </div>
                </li>
                <li className="animated fadeInUpShort slow delay-500">
                  <div className="r_vus_left_info">
                    <h4>Extra Resources</h4>
                    <p>Benefit from additional study materials, tips, and support to enhance your academic performance.</p>
                  </div>
                </li>
              </ul>

            </div>
          </div>
          <div className="why_choose_vus_right">

            <div className="r_vus_img">
              <img src={chooseSecImg} alt="#" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyChoose;
