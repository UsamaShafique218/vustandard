import React, { useState } from "react";
import course1 from "../assets/images/cisco/course1.png";
import course2 from "../assets/images/cisco/course2.png";
import course3 from "../assets/images/cisco/course3.png";
import course4 from "../assets/images/cisco/course4.png";
import course5 from "../assets/images/cisco/course5.png";
import course6 from "../assets/images/cisco/course6.png";
import course7 from "../assets/images/cisco/course7.png";
import course8 from "../assets/images/cisco/course8.png";
import course9 from "../assets/images/cisco/course9.png";
import course10 from "../assets/images/cisco/course10.png";
import course11 from "../assets/images/cisco/course11.png";
import course12 from "../assets/images/cisco/course12.png";
import course13 from "../assets/images/cisco/course13.png";
import course14 from "../assets/images/cisco/course14.png";
import course15 from "../assets/images/cisco/course15.png";

function CiscoCourses() {
    const [showAll, setShowAll] = useState(false);

    const lmsData = [
        { id: 1, image: course1 },
        { id: 2, image: course2 },
        { id: 3, image: course3 },
        { id: 4, image: course4 },
        { id: 5, image: course5 },
        { id: 6, image: course6 },
        { id: 7, image: course7 },
        { id: 8, image: course8 },
        { id: 9, image: course9 },
        { id: 10, image: course10 },
        { id: 11, image: course11 },
        { id: 12, image: course12 },
        { id: 13, image: course13 },
        { id: 14, image: course14 },
        { id: 15, image: course15 },
    ];

    const visibleData = showAll ? lmsData : lmsData.slice(0, 12);

    return (
        <div className="gradiantParent">
            <div className="gradiantChild">
                <div className="cisco_courses_wrapper">
                    <div className="autoContent">
                        <div className="cisco_courses_inner">

                            <div className="headlines text-center">
                                <h2 className="fw-bold">
                                    Cisco Courses Successfully Completed
                                </h2>
                                <p className="text-muted">
                                    We have professionally completed multiple Cisco certification courses
                                    for our students with 100% accuracy and timely submission.
                                </p>
                            </div>

                            <div className={`lms-wrapper ${!showAll ? "collapsed" : ""}`}>
                                <div className="row pt-3">
                                    {visibleData.map((item) => (
                                        <div className="col-12 col-md-3 pb-4" key={item.id}>
                                            <div className="os_info">
                                                <div className="os_info_img">
                                                    <img
                                                        src={item.image}
                                                        alt="Cisco Course"
                                                        loading="lazy"
                                                        className="img-fluid"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {!showAll && (
                                    <div className="overlay">
                                        <button
                                            className="all_btn"
                                            onClick={() => setShowAll(true)}
                                        >
                                            See All LMS Handled
                                        </button>
                                    </div>
                                )}
                            </div>

                            {showAll && (
                                <div className="text-center mt-4">
                                    <button
                                        className="btn btn-outline-dark px-4 py-2"
                                        onClick={() => setShowAll(false)}
                                    >
                                        Show Less
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CiscoCourses;