import React, { useState } from "react";

const TopPromo = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="topPromo">
            <p>
                <b>15%</b> Off on LMS Handling 
            </p>

            <div
                className="topPromoClose"
                onClick={handleClose}
                role="button"
                aria-label="Close promo"
            />
        </div>
    );
};

export default TopPromo;
