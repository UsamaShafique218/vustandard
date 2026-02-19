import React from "react";
import lmsHandlingImg from "../assets/images/educational_img.webp";
import assignmntImg from "../assets/images/assignmnt_img.jpg";
import quizImg from "../assets/images/quiz-background.jpg";
import gdbImg from "../assets/images/gdb_img.jpg";
import fypProjectImg from "../assets/images/fyp_project.jpg";
import lmsQuiries from "../assets/images/lms_quiries.png";
import ImageSlider from "./ImageSlider";



function Service() {
  const services = [
    {
      title: "LMS Handling",
      descShort: "LMS management includes organizing course content...",
      descFull:
        "LMS management includes organizing course content, monitoring student progress, facilitating communication, and administering assessments to ensure a smooth online learning experience",
      img: lmsHandlingImg,
      // link: "/contact-us",
    },
    {
      title: "Assignments",
      descShort: "An assignment is a task that lets students apply concepts...",
      descFull:
        "An assignment is a task that lets students apply concepts, demonstrate understanding, and develop skills within a set timeframe.",
      img: assignmntImg,
      // link: "/contact-us",
    },
    {
      title: "QUIZ",
      descShort: "A quiz is a brief assessment to gauge students' understanding...",
      descFull:
        "A quiz is a brief assessment to gauge students' understanding of a topic, often featuring multiple-choice, true/false, or short-answer questions with instant feedback.",
      img: quizImg,
      // link: "/contact-us",
    },
    {
      title: "GDB",
      descShort: "The General Discussion Board is an interactive space for users to...",
      descFull:
        "The General Discussion Board is an interactive space for users to share ideas, engage in conversations, and explore diverse perspectives, promoting community interaction and open dialogue.",
      img: gdbImg,
      // link: "/contact-us",
    },
    {
      title: "Paid Projects",
      descShort: "Projects are organized initiatives designed to accomplish...",
      descFull:
        "Projects are organized initiatives designed to accomplish defined objectives through planning, teamwork, and effective use of resources, delivering practical solutions and meaningful results.",
      img: fypProjectImg,
      // link: "/contact-us",
    },
    {
      title: "Free Services",
      descShort: "Services involve actions or support provided to fulfill...",
      descFull:
        "Services involve actions or support provided to fulfill customer needs, delivering non-physical value. They span multiple sectors, from healthcare to technology, and focus on offering solutions and assistance to individuals and organizations..",
      img: lmsQuiries,
      // link: "/contact-us",
    },
    // Add more services as needed
  ];


  return (
    <div className="gradiantParent">
      <div className="gradiantChild">
        <section className="our_services">
          <div className="autoContent">
            <div className="our_services_inner">
              <div className="headlines">
                <span className="headlines_sub">Go Anywhere with Vu Standard Team</span>
                <h2>Explore Our Services</h2>
              </div>
              <div className="os_content">

                <div className="os_content_left">
                  <ul>
                    {services.map((service, index) => (
                      <li key={index}>
                        <a href="https://wa.me/+923150250218?text=Hello! Sending Message from website" target="_blank" className="os_info">
                          <div className="os_info_img">
                            <img src={service.img} alt={service.title} />
                          </div>
                          <div className="os_info_data">
                            <h4>{service.title}</h4>
                            <p className="custom-tooltip">
                              {service.descShort}
                              <span className="tooltip-text">{service.descFull}</span>
                            </p>
                            <span className="view_link">Book Now</span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div> 
                <div className="os_content_right">
                  <ImageSlider />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Service;
