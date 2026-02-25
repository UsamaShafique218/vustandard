import React, { useState } from "react";
import FinaltermNotes from "../data/finalterm_files/finalterm_notes";

function FinaltermFiles() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSubject, setSelectedSubject] = useState(null);

    // Filter
    const filteredNotes = FinaltermNotes.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="download_notes">
            <div className="autoContent">
                <div className="download_notes_inner">

                    <div className="headlines">
                        <h2>Vu All Important Past & Current Papers</h2>
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
                                        placeholder="(e.g. CS101, MTH201)"
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

                    <div className="download_notes_content">
                        <div className="row">
                            {filteredNotes.length > 0 ? (
                                filteredNotes.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="col-12 col-md-6 col-lg-4 pb-4"
                                    >
                                        <div className="custom_card">
                                            <h4>{item.title}</h4>
                                            <p>{item.description}</p>

                                            <button
                                                className="all_btn"
                                                data-bs-toggle="modal"
                                                data-bs-target="#downloadModal"
                                                onClick={() => setSelectedSubject(item)}
                                            >
                                                Download Files
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center mt-4">
                                    No subject found.
                                </p>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* 🔥 Proper Bootstrap Modal */}
            <div
                className="modal fade"
                id="downloadModal"
                tabIndex="-1"
                aria-hidden="true"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">
                                {selectedSubject?.title}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">
                            {selectedSubject?.links?.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="d-block mb-3"
                                >
                                    <button className="all_btn justify-content-center w-100">
                                        {link.label}
                                    </button>
                                </a>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default FinaltermFiles;