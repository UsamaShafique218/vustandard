import React, { useEffect } from "react";
import Slider from "react-slick";
import { Fancybox } from "@fancyapps/ui";

import cs101 from "../assets/images/assignments/cs101.PNG";
import cs101_2 from "../assets/images/assignments/cs101_2.PNG";
import cs101_3 from "../assets/images/assignments/cs101_3.PNG";

import cs201 from "../assets/images/assignments/cs201.PNG";
import cs201p from "../assets/images/assignments/cs201p.PNG";
import cs202 from "../assets/images/assignments/cs202.PNG";
import cs302 from "../assets/images/assignments/cs302.PNG";
import cs302p from "../assets/images/assignments/cs302p.PNG";
import cs420 from "../assets/images/assignments/cs420.PNG";
import cs506 from "../assets/images/assignments/cs506.PNG";
import cs601 from "../assets/images/assignments/cs601.PNG";
import mth104 from "../assets/images/assignments/mth104.PNG";
import phy301 from "../assets/images/assignments/phy301.PNG";

const results = [
    {
        title: "CS101",
        desc:
            "CS101 Assignment Result 2026",
        gallery: [
            cs101,
            cs101_2,
            cs101_3,
        ],
        group: "gallery1",
    },
    {
        title: "CS201 & CS201p",
        desc:
            "CS201 & CS201p Assignment Result 2026",
        gallery: [
            cs201,
            cs201p
        ],
        group: "gallery2",
    },
    {
        title: "CS202",
        desc:
            "CS202 Assignment Result 2026",
        gallery: [
            cs202,
        ],
        group: "gallery3",
    },
    {
        title: "CS302 & CS302p",
        desc:
            "CS302 Assignment Result 2026",
        gallery: [
            cs302,
            cs302p
        ],
        group: "gallery4",
    },
    {
        title: "CS420",
        desc:
            "CS420 Assignment Result 2026",
        gallery: [
            cs420,
        ],
        group: "gallery5",
    },
    {
        title: "CS506",
        desc:
            "CS506 Assignment Result 2026",
        gallery: [
            cs506,
        ],
        group: "gallery6",
    },
    {
        title: "CS601",
        desc:
            "CS601 Assignment Result 2026",
        gallery: [
            cs601,
        ],
        group: "gallery7",
    },
    {
        title: "MTH104",
        desc:
            "MTH104 Assignment Result 2026",
        gallery: [
            mth104,
        ],
        group: "gallery8",
    },
    {
        title: "PHY301",
        desc:
            "PHY301 Assignment Result 2026",
        gallery: [
            phy301,
        ],
        group: "gallery8",
    },

];

const StudentResults = () => {
    useEffect(() => {
        Fancybox.bind("[data-fancybox]", {});
        return () => Fancybox.destroy();
    }, []);

    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 2 } },
            { breakpoint: 576, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="gradiantParent">
            <div className="gradiantChild">
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

                        <Slider {...settings} className="gallerimage_slider">
                            {results.map((results, index) => (
                                <div key={index} className="px-2">
                                    <div className="project_img">
                                        {/* MAIN IMAGE */}
                                        <a
                                            href={results.gallery[0]}
                                            data-fancybox={results.group}
                                            className="gallerimage_box"
                                        >
                                            <img
                                                src={results.gallery[0]}
                                                alt={results.title}
                                                className="img-fluid"
                                            />

                                            {/* OVERLAY */}
                                            <div className="image_inner_project">
                                                <div className="image_inner_top">
                                                    <div className="image_inner_text">
                                                        <h2>{results.title}</h2>
                                                        <p>{results.desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>

                                        {/* HIDDEN GALLERY IMAGES */}
                                        {results.gallery.slice(1).map((img, i) => (
                                            <a
                                                key={i}
                                                href={img}
                                                data-fancybox={results.group}
                                                style={{ display: "none" }}
                                            >
                                                <img src={img} alt="" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default StudentResults;
