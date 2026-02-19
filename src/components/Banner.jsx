import React, { useEffect, useRef, useState } from "react";

import trustedImg from "../assets/images/trusted_img.png";
import banner_icons from "../assets/images/banner_icons_img.png";

function Banner() {
    const spans = [
        "For Quizzes",
        "For Assignments",
        "For GDBs"
    ];

    const [index, setIndex] = useState(0);
    const indicatorRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % spans.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
    if (textRef.current && indicatorRef.current) {
        const width = textRef.current.offsetWidth;
        indicatorRef.current.style.width = `${width + 6}px`;

        const timeout = setTimeout(() => {
            if (indicatorRef.current) {
                indicatorRef.current.style.width = "6px";
            }
        }, 2200);

        return () => clearTimeout(timeout);
    }
}, [index]);

    return (
        <div className="banner">
            <div className="autoContent">
                <div className="banner_inner">

                    <div className="banner_box">
                        <div className="discountBox">
                            <h4>
                                15
                                <sup>Off</sup>
                                <sub>%</sub>
                            </h4>
                            <span>on</span>
                            <strong>LMS Handling</strong>
                        </div>

                        <div className="banner_text">
                            <h1>
                                <b className="d-block">
                                    Professional VU LMS Support Services
                                </b> <br />

                                <span className="banner_text_slider">
                                    <span
                                        ref={textRef}
                                        key={index}
                                        className="fade-text"
                                    >
                                        {spans[index]}
                                    </span>
                                    <i ref={indicatorRef}></i>
                                </span>
                            </h1>

                            <p>
                                Reliable academic LMS assistance for VU students, ensuring accuracy, confidentiality, and timely completion.
                            </p>
 
                        </div>
                    </div>

                    <div className="banner_right">
                        <div className="banner_right_content">
                            <div className="trusted_img">
                                <img src={trustedImg} alt="" />
                            </div>
                            <div className="banner_icons_img">
                                <img src={banner_icons} alt="" />
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    );
}

export default Banner;
