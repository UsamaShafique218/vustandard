import React, { useState } from "react";
import TotalLmsHandled from "../components/TotalLmsHandled";


function LmsHandled() {

    return (
        <div className="gradiantParent">
            <div className="gradiantChild">
                <div className="lms_handled_wrapper">
                    <div className="autoContent">
                        <div className="lms_handled_inner">
                            <TotalLmsHandled />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default LmsHandled;