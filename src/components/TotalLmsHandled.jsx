import React, { useState } from "react";
import bscs from "../assets/images/bscs.PNG";
import bsit from "../assets/images/bsit.PNG";
import bs_sociology from "../assets/images/bs_sociology.PNG";
import bs_ba from "../assets/images/bs_ba.PNG";
import bbit from "../assets/images/bbit.PNG";
import bs_english from "../assets/images/bs_english.PNG";


function TotalLmsHandled() {
  const [showAll, setShowAll] = useState(false);
  const lmsData = [
    {
      id: 1,
      name: "Javid Ali",
      program: "BS Computer Science",
      semester: "Semester 8",
      type: "Full LMS Handle",
      image: bscs,
    },
    {
      id: 2,
      name: "NAIMAL ASIF FAROOQUI",
      program: "BS Sociology",
      semester: "Semester 2",
      type: "Full LMS Handle",
      image: bs_sociology,
    },
    {
      id: 3,
      name: "M REHAN IRFAN",
      program: "BS Computer Science",
      semester: "Semester 3",
      type: "Full LMS Handle",
      image: bscs,
    },
    {
      id: 4,
      name: "ASHIR SHABIR",
      program: "BS Business Administration",
      semester: "Semester 7",
      type: "Full LMS Handle",
      image: bs_ba,
    },
    {
      id: 5,
      name: "Amir Mustafa",
      program: "BS Computer Science",
      semester: "Semester 5",
      type: "Full LMS Handle",
      image: bscs,
    },
    {
      id: 6,
      name: "Sadaf Sania",
      program: "BS Computer Science",
      semester: "Semester 6",
      type: "Full LMS Handle",
      image: bscs,
    },
    {
      id: 7,
      name: "Irsa Ashfaq",
      program: "BS Information Technology",
      semester: "Semester 7",
      type: "Assignments + GDB's",
      image: bsit,
    },
    {
      id: 8,
      name: "Alina Razzaq",
      program: "BS Information Technology",
      semester: "Semester 5",
      type: "Assignments",
      image: bsit,
    },
    {
      id: 9,
      name: "Tayyaba Rafique",
      program: "BS Information Technology",
      semester: "Semester 8",
      type: "Full LMS Handle",
      image: bsit,
    },
    {
      id: 10,
      name: "HAFIZ SYED SAAD ALI ZAIDI",
      program: "BB Information Technology (BBIT)",
      semester: "Semester 3",
      type: "Full LMS Handle",
      image: bbit,
    },
    {
      id: 11,
      name: "SAFI UR REHMAN",
      program: "BS Computer Science (BSCS)",
      semester: "Semester 2",
      type: "Full LMS Handle",
      image: bscs,
    },
    {
      id: 12,
      name: "Shawana",
      program: "BS Information Technology",
      semester: "Semester 8",
      type: "Assignments",
      image: bsit,
    },
    {
      id: 13,
      name: "Amjad Ali",
      program: "BS Information Technology",
      semester: "Semester 2",
      type: "Assignments, Quiz's , GDB's",
      image: bsit,
    },
    {
      id: 14,
      name: "Iqra Farooq",
      program: "BS Computer Science (BSCS)",
      semester: "Semester 8",
      type: "Full LMS Handle",
      image: bscs,
    },
    {
      id: 15,
      name: "Rabia Mubeen",
      program: "BS Information Technology",
      semester: "Semester 3",
      type: "Full LMS Handle",
      image: bsit,
    },
    {
      id: 16,
      name: "Dua Fatima",
      program: "BS Information Technology",
      semester: "Semester 3",
      type: "Full LMS Handle",
      image: bsit,
    },
    {
      id: 17,
      name: "Imran Khan",
      program: "BS Computer Science (BSCS)",
      semester: "Semester 7",
      type: "Full LMS Handle",
      image: bscs,
    },
    {
      id: 18,
      name: "Mansoor Ahmad",
      program: "BS Computer Science (BSCS)",
      semester: "Semester 7",
      type: "Assignments, Quiz's , GDB's",
      image: bscs,
    },
    {
      id: 19,
      name: "Mansoor Ahmad",
      program: "BS English",
      semester: "Semester 3",
      type: "Full LMS Handle",
      image: bs_english,
    },
  ];


  const visibleData = showAll ? lmsData : lmsData.slice(0, 8);
  return (
    <div className="total_lms_handled">

      <div className="headlines text-center">
        <h2 className="fw-bold">Total LMS Handled</h2>
        <p className="text-muted">
          We have successfully handled multiple Virtual University LMS accounts
          with 100% timely submission and professional support.
        </p>
      </div>

      <div className={`lms-wrapper ${!showAll ? "collapsed" : ""}`}>
        <div className="row pt-3">
          {lmsData.map((item) => (
            <div className="col-12 col-md-3 pb-4" key={item.id}>
              <div className="lms-card">
                <div className="lms-card-image">
                  <img src={item.image} alt={item.program} loading="lazy" />
                </div>
                <div className="lms-card-content p-3">
                  <h4>{item.name}</h4>
                  <p>{item.program}</p>
                  <p>{item.semester}</p>
                  <p>{item.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="overlay">
            <button
              className="btn btn-dark px-4 py-2"
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
  );
}

export default TotalLmsHandled;