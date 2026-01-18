import React from "react";  
import lmsHandlingImg from "../assets/images/educational_img.webp";  
import assignmntImg from "../assets/images/assignmnt_img.jpg";  
import quizImg from "../assets/images/quiz-background.jpg";  
import gdbImg from "../assets/images/gdb_img.jpg";  
import fypProjectImg from "../assets/images/fyp_project.jpg";    
import lmsQuiries from "../assets/images/lms_quiries.png";    
import ImageSlider from "./ImageSlider";
 

function Service() {
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
                    <li>
                      <a href="transportation-services.html" className="os_info">
                        <div className="os_info_img"> 
                          <img src={lmsHandlingImg} alt="#" />
                        </div>
                        <div className="os_info_data">
                          <h4>Lms Handling</h4> 
                          <p className="custom-tooltip">
                            LMS management includes organizing course content...
                            <span className="tooltip-text">
                              LMS management includes organizing course content, monitoring student progress, facilitating communication, and administering assessments to ensure a smooth online learning experience
                            </span>
                          </p>

                          <span className="view_link">Book Now</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="airport-ride-in-uae.html" className="os_info">
                        <div className="os_info_img">
                          <img src={assignmntImg} alt="#" />
                        </div>
                        <div className="os_info_data">
                          <h4>Assignments</h4> 
                          <p className="custom-tooltip">
                            An assignment is a task that lets students apply concepts...
                            <span className="tooltip-text">
                              An assignment is a task that lets students apply concepts, demonstrate understanding, and develop skills within a set timeframe.
                            </span>
                          </p>
                          <span className="view_link">Book Now</span>
                        </div>
                      </a>
                    </li> 
                     <li>
                      <a href="airport-ride-in-uae.html" className="os_info">
                        <div className="os_info_img">
                          <img src={quizImg} alt="#" />
                        </div>
                        <div className="os_info_data">
                          <h4>QUIZ</h4>  
                          <p className="custom-tooltip">
                            A quiz is a brief assessment to gauge students' understanding...
                            <span className="tooltip-text">
                              A quiz is a brief assessment to gauge students' understanding of a topic, often featuring multiple-choice, true/false, or short-answer questions with instant feedback.
                            </span>
                          </p>
                          <span className="view_link">Book Now</span>
                        </div>
                      </a>
                    </li> 
                    <li>
                      <a href="airport-ride-in-uae.html" className="os_info">
                        <div className="os_info_img">
                          <img src={gdbImg} alt="#" />
                        </div>
                        <div className="os_info_data">
                          <h4>GDB</h4> 

                          <p className="custom-tooltip">
                            The General Discussion Board is an interactive space for users to...
                            <span className="tooltip-text">
                              The General Discussion Board is an interactive space for users to share ideas, engage in conversations, and explore diverse perspectives, promoting community interaction and open dialogue
                            </span>
                          </p>
                          <span className="view_link">Book Now</span>
                        </div>
                      </a>
                    </li> 
                    <li>
                      <a href="airport-ride-in-uae.html" className="os_info">
                        <div className="os_info_img">
                          <img src={fypProjectImg} alt="#" />
                        </div>
                        <div className="os_info_data">
                          <h4>Paid Projects</h4>  
                          <p className="custom-tooltip">
                            Projects are organized initiatives designed to accomplish...
                            <span className="tooltip-text">
                              Projects are organized initiatives designed to accomplish defined objectives through planning, teamwork, and effective use of resources, delivering practical solutions and meaningful results.
                            </span>
                          </p>
                          <span className="view_link">Book Now</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="airport-ride-in-uae.html" className="os_info">
                        <div className="os_info_img">
                          <img src={lmsQuiries} alt="#" />
                        </div>
                        <div className="os_info_data">
                          <h4>Free Services</h4>  
                          <p className="custom-tooltip">
                            Services involve actions or support provided to fulfill...
                            <span className="tooltip-text">
                              Services involve actions or support provided to fulfill customer needs, delivering non-physical value. They span multiple sectors, from healthcare to technology, and focus on offering solutions and assistance to individuals and organizations.
                            </span>
                          </p>
                          <span className="view_link">Book Now</span>
                        </div>
                      </a>
                    </li>
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
