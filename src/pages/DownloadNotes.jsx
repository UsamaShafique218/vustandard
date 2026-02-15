import React from 'react'
import DownloadNotesDataCS from '../data/DownloadNotesDataCS'



function DownloadNotes() {
    return (
        <div className='download_notes'>
            <div className='autoContent'>
                <div className='download_notes_inner'>
                    <div className="headlines">
                        <h2>Vu CS Past Papers</h2>
                    </div>
                    <div className='download_notes_content'>
                        <div className="row">
                            {DownloadNotesDataCS.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`col-12 col-md-4 ${index >= 3 ? "pt-4" : ""}`}
                                >
                                    <div className="custom_card"> 
                                            <h4>{item.title}</h4>
                                            <p className="custom-tooltip">{item.description}</p>

                                            <a
                                                href={item.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <button className="all_btn">Download PDF</button>
                                            </a> 
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DownloadNotes
