import React, { useState } from "react";
import QuizCS202 from "../data/QuizCS202";
import AttempQuiz from "../components/AttempQuiz";

function SolvedMcqsPage() {
    const [showModal, setShowModal] = useState(false);

    const handleReset = () => {
        setShowModal(false);
    };

    return (
        <div className="solved_mcqs_wrapper">
            <div className="autoContent">
                <div className="headlines">
                    <h2>Old Most Repeated MCQs</h2>
                </div>

                {/* START CARD */}
                <div className="custom_card text-center">
                    <h4>CS202</h4>
                    <p>Old most repeated MCQs</p>
                    <button className="all_btn" onClick={() => setShowModal(true)}>
                        Start Quiz
                    </button>
                </div>

                {/* MODAL */}
                {showModal && (
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">CS202 Quiz</h5>
                                    <button className="btn-close" onClick={handleReset}></button>
                                </div>

                                <div className="modal-body">
                                    <AttempQuiz data={QuizCS202} onReset={handleReset} />
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
