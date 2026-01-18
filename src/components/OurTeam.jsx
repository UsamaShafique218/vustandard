import React from "react";
import ceoVuTeam from "../assets/images/user_img1.jpeg"; 
import chairmanVuTeam from "../assets/images/javid_ali.jpeg"; 
import directorStrategy from "../assets/images/umair_mailo.jpeg"; 
 

function OurTeam() {
    return (
        <div className="ourTeam_sec">
            <div className="autoContent">
                <div className="ourTeam_sec_inner">
                    <div className="headlines">
                        <span>Our Leadership Team</span>
                        <h2>Our skilled team will support you.</h2>
                    </div>

                    <div className="ourTeam_detail">
                        <ul>
                            <li>
                                <div className="ourTeam_info">
                                    <div className="ourTeam_img">
                                        <img src={ceoVuTeam} alt="#" />
                                    </div>
                                    <div className="ourTeam_text">
                                        <h4>Usama Shafique</h4>
                                        <p>Chief Executive Officer</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="ourTeam_info">
                                    <div className="ourTeam_img">
                                        <img src={chairmanVuTeam} alt="#" />
                                    </div>
                                    <div className="ourTeam_text">
                                        <h4>Javid Ali</h4>
                                        <p>Chairman</p>
                                    </div>
                                </div>
                            </li>
                            <li >
                                <div className="ourTeam_info">
                                    <div className="ourTeam_img">
                                        <img src={directorStrategy} alt="#" />
                                    </div>
                                    <div className="ourTeam_text">
                                        <h4>Umair Shafique</h4>
                                        <p>Director Strategy</p> 
                                    </div>
                                </div>
                            </li> 
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OurTeam;
