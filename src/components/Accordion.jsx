import React, { useState, useRef, useEffect } from "react"; 
import AccordionData from "../data/AccordionData";

function Accordion() {
    const [activeIndex, setActiveIndex] = useState(0);
    const contentRefs = useRef([]);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        if (activeIndex !== null && contentRefs.current[activeIndex]) {
            contentRefs.current[activeIndex].style.height =
                contentRefs.current[activeIndex].scrollHeight + "px";
        }
    }, [activeIndex]);

    return (

        <div className="accordion">
            {AccordionData.map((item, index) => (
                <div
                    key={index}
                    className={`accordion_item ${activeIndex === index ? "active" : ""}`}
                >
                    <div
                        className="accordion_header"
                        onClick={() => toggleAccordion(index)}
                    >
                        <strong>{item.q}</strong>
                        <span className="plus_icon"></span>
                    </div>

                    <div
                        className="accordion_body"
                        ref={(el) => (contentRefs.current[index] = el)}
                        style={{
                            height:
                                activeIndex === index
                                    ? contentRefs.current[index]?.scrollHeight + "px"
                                    : "0px",
                        }}
                    >
                        <div className="accordion_content">
                            <p>{item.a}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>


    );
}

export default Accordion;
