import React, { useState, useEffect } from "react";
import AttempQuiz from "../components/AttempQuiz";

// Import all quiz data
import QuizCS101 from "../data/quiz_data/QuizCS101";
import QuizCS201 from "../data/quiz_data/QuizCS201";
import QuizCS201p from "../data/quiz_data/QuizCS201p";
import QuizCS202 from "../data/quiz_data/QuizCS202";
import QuizENG101 from "../data/quiz_data/QuizENG101";

const subjects = [
    { code: "CS101", description: "Old most repeated MCQs", category: "CS", data: QuizCS101 },
    { code: "CS201", description: "Old most repeated MCQs", category: "CS", data: QuizCS201 },
    { code: "CS201p", description: "Old most repeated MCQs", category: "CS", data: QuizCS201p },
    { code: "CS202", description: "Old most repeated MCQs", category: "CS", data: QuizCS202 },
    { code: "ENG101", description: "Old most repeated MCQs", category: "ENG", data: QuizENG101 },
    { code: "MTH101", description: "Old most repeated MCQs", category: "MTH", data: QuizENG101 },
];

function SolvedMcqsPage() {

    const [selectedSubject, setSelectedSubject] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Subscribe Flow States
    const [pendingSubject, setPendingSubject] = useState(null);
    const [showSubscribeModal, setShowSubscribeModal] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Group subjects by category
    const groupedSubjects = subjects.reduce((acc, subj) => {
        if (!acc[subj.category]) acc[subj.category] = [];
        acc[subj.category].push(subj);
        return acc;
    }, {});

    // When user clicks Start Quiz
    const handleStartClick = (subject) => {
        setPendingSubject(subject);
        setShowSubscribeModal(true);
    };

    // Confirm Subscribe
    const handleConfirmSubscribe = () => {
        if (!isSubscribed) return;

        setShowSubscribeModal(false);
        setSelectedSubject(pendingSubject);
        setPendingSubject(null);
        setIsSubscribed(false);
    };

    const handleReset = () => {
        setSelectedSubject(null);
    };


    useEffect(() => {
    if (showSubscribeModal || selectedSubject) {
        document.body.classList.add("modal-open");
    } else {
        document.body.classList.remove("modal-open");
    }

    // Safety cleanup
    return () => {
        document.body.classList.remove("modal-open");
    };
}, [showSubscribeModal, selectedSubject]);


    // Filter subjects
    const filteredSubjects = Object.keys(groupedSubjects).reduce((acc, category) => {
        const filtered = groupedSubjects[category].filter((subj) =>
            subj.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filtered.length > 0) acc[category] = filtered;
        return acc;
    }, {});

    return (
        <div className="solved_mcqs_wrapper">
            <div className="autoContent">

                {/* Page Heading */}
                <div className="headlines text-center">
                    <h2>Challenge Yourself with the Most Repeated MCQs</h2>
                    <p>
                        Welcome to <strong>VU Standard</strong>'s MCQ hub! Practice the most frequently repeated
                        questions from a wide range of courses.
                    </p>
                </div>

                

                {/* Search Input */}
                <div className="search_wrapper">
                    <div className="form_row">
                        <div className="form_cell">
                            <div className="form_field no_icon">
                                <input
                                    type="text"
                                    name="search"
                                    className="floating-input"
                                    placeholder="Search Subject Code"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <label className="floating-label">Search</label>
                                <i className="field_icon"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20px" height="20px"><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" /></svg>
                                </i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subjects */}
                {Object.keys(filteredSubjects).length === 0 ? (
                    <p className="text-center">No subjects found for "{searchTerm}"</p>
                ) : (
                    Object.keys(filteredSubjects).map((category, idx) => (
                        <div key={idx} className="subject_category mb-5">
                            <h3 className="category_heading mb-4">
                                {`All ${category} Subjects Quizzes`}
                            </h3>
                            <div className="row">
                                {filteredSubjects[category].map((subject, index) => (
                                    <div key={index} className="col-12 col-md-4 mb-4">
                                        <div className="custom_card text-center">
                                            <h4>{subject.code}</h4>
                                            <p>{subject.description}</p>
                                            <button
                                                className="all_btn"
                                                onClick={() => handleStartClick(subject)}
                                            >
                                                Start Quiz
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}

                {/* SUBSCRIBE MODAL */}
                {showSubscribeModal && (
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Subscribe to Unlock Quiz
                                    </h5>
                                    <button
                                        className="btn-close"
                                        onClick={() => {
                                            setShowSubscribeModal(false);
                                            setIsSubscribed(false);
                                        }}
                                    ></button>
                                </div>
                                <div className="modal-body text-center">

                                    <p className="mb-3">
                                        Please subscribe to our official YouTube channel to continue.
                                    </p>

                                    <a
                                        href="https://www.youtube.com/@vu_standard?sub_confirmation=1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-danger mb-3"
                                    >
                                        Subscribe Now
                                    </a>

                                    <div className="form-check mt-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="subscribedCheck"
                                            checked={isSubscribed}
                                            onChange={(e) => setIsSubscribed(e.target.checked)}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="subscribedCheck"
                                        >
                                            I have subscribed to VU Standard
                                        </label>
                                    </div>

                                    <button
                                        className="btn btn-success mt-4 w-100"
                                        disabled={!isSubscribed}
                                        onClick={handleConfirmSubscribe}
                                    >
                                        Continue to Quiz
                                    </button>

                                </div>
                            </div>
                        </div>
                        <div className="modal-backdrop fade show"></div>
                    </div>
                )}

                {/* QUIZ MODAL */}
                {selectedSubject && (
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {selectedSubject.code} Quiz
                                    </h5>
                                    <button
                                        className="btn-close"
                                        onClick={handleReset}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <AttempQuiz
                                        data={selectedSubject.data}
                                        onReset={handleReset}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-backdrop fade show"></div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default SolvedMcqsPage;