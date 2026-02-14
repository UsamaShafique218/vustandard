import React from 'react' 



function ContactUs() {
    return (
        <div className="contactUs_main">
            <div className="autoContent">
                <div className="contactUs_inner">
                    <div className="headlines">
                        <h2 >Contact us,</h2>
                        <p >We love to respond to your queries....
                        </p>
                    </div>

                    <div className="contactUs_details">
                        <div className="contactUs_details_left">
                            <div className="contactUs_details_heading">
                                <h2 >Ask us anything here,</h2>
                            </div> 
                            <div className="contactUs_form"> 
                                <div className="form_row">
                                    <div className="form_cell">
                                        <div className="form_field">
                                            <input type="text" name="full_name" className="floating-input"
                                                placeholder="Full name" />
                                            <label className="floating-label">Full
                                                name</label>
                                            <i className="field_icon">
                                                <svg width="23" height="22" viewBox="0 0 23 22"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11.7926 9.69335C11.7035 9.68443 11.5965 9.68443 11.4984 9.69335C9.37647 9.62202 7.69141 7.88347 7.69141 5.74371C7.69141 3.55937 9.45671 1.78516 11.65 1.78516C13.8343 1.78516 15.6085 3.55937 15.6085 5.74371C15.5996 7.88347 13.9145 9.62202 11.7926 9.69335Z"
                                                        stroke="#8D8D8D" strokeWidth="1.33735"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                    <path
                                                        d="M7.33499 12.9815C5.1774 14.4258 5.1774 16.7796 7.33499 18.215C9.7868 19.8555 13.8078 19.8555 16.2596 18.215C18.4172 16.7706 18.4172 14.4169 16.2596 12.9815C13.8167 11.3499 9.79571 11.3499 7.33499 12.9815Z"
                                                        stroke="#8D8D8D" strokeWidth="1.33735"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                </svg>
                                            </i>
                                        </div>
                                    </div>
                                </div>
                                <div className="form_row">
                                    <div className="form_cell">
                                        <div className="form_field">
                                            <input type="text" name="email" className="floating-input"
                                                placeholder="Email" />
                                            <label className="floating-label">Email</label>
                                            <i className="field_icon">
                                                <svg width="21" height="21" viewBox="0 0 21 21"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M14.598 18.0263H6.09908C3.5494 18.0263 1.84961 16.7515 1.84961 13.7769V7.8276C1.84961 4.85297 3.5494 3.57812 6.09908 3.57812H14.598C17.1477 3.57812 18.8475 4.85297 18.8475 7.8276V13.7769C18.8475 16.7515 17.1477 18.0263 14.598 18.0263Z"
                                                        stroke="#8D8D8D" strokeWidth="1.27484"
                                                        strokeMiterlimit="10" strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                    <path
                                                        d="M14.5986 8.25L11.9384 10.3747C11.063 11.0716 9.62667 11.0716 8.75128 10.3747L6.09961 8.25"
                                                        stroke="#8D8D8D" strokeWidth="1.27484"
                                                        strokeMiterlimit="10" strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                </svg>
                                            </i>
                                        </div>
                                    </div>
                                </div>
                                <div className="form_row">
                                    <div className="form_cell">
                                        <div className="form_field">
                                            <input type="text" name="phone" className="floating-input"
                                                placeholder="Phone" />
                                            <label className="floating-label">Phone</label>
                                            <i className="field_icon">
                                                <svg width="16" height="19" viewBox="0 0 16 19"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M14.7992 5.25V13.75C14.7992 17.15 13.9492 18 10.5492 18H5.44922C2.04922 18 1.19922 17.15 1.19922 13.75V5.25C1.19922 1.85 2.04922 1 5.44922 1H10.5492C13.9492 1 14.7992 1.85 14.7992 5.25Z"
                                                        stroke="#8D8D8D" strokeWidth="1.275"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                    <path d="M9.69883 3.97656H6.29883" stroke="#8D8D8D"
                                                        strokeWidth="1.275" strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                    <path
                                                        d="M7.99914 15.5334C8.72678 15.5334 9.31664 14.9436 9.31664 14.2159C9.31664 13.4883 8.72678 12.8984 7.99914 12.8984C7.27151 12.8984 6.68164 13.4883 6.68164 14.2159C6.68164 14.9436 7.27151 15.5334 7.99914 15.5334Z"
                                                        stroke="#8D8D8D" strokeWidth="1.275"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                </svg>
                                            </i>
                                        </div>
                                    </div>
                                </div>
                                <div className="form_row">
                                    <div className="form_cell">
                                        <div className="form_field">
                                            <textarea
                                                className="floating-input fieldHasNotIcon floating-textarea"
                                                placeholder="Message"></textarea>
                                            <label className="floating-label">Message</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form_row">
                                    <a href="javascript:void(0)"
                                        className="all_btn btn_large w_100 justify_content_center uppercase cs_send_msg"
                                        type="button">Send Message</a>
                                </div> 
                            </div>
                        </div>
                        <div className="contactUs_details_right">
                            <div className="contactUs_info_main">
                                <div className="contactUs_details_heading">
                                    <h2 >Contact Info,</h2>
                                </div>
                                <div className="address_detail">
                                    <ul>
                                        <li>
                                            <div className="address_detail">
                                                <div className="address_detail_icon">
                                                    <svg width="39" height="39" viewBox="0 0 39 39"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M19.4997 21.8275C22.2998 21.8275 24.5697 19.5576 24.5697 16.7575C24.5697 13.9574 22.2998 11.6875 19.4997 11.6875C16.6996 11.6875 14.4297 13.9574 14.4297 16.7575C14.4297 19.5576 16.6996 21.8275 19.4997 21.8275Z"
                                                            stroke="#0FA85B" strokeWidth="2.4375" />
                                                        <path
                                                            d="M5.88667 13.7963C9.08792 -0.276246 29.9367 -0.259996 33.1217 13.8125C34.9904 22.0675 29.8554 29.055 25.3542 33.3775C22.0879 36.53 16.9204 36.53 13.6379 33.3775C9.15292 29.055 4.01792 22.0513 5.88667 13.7963Z"
                                                            stroke="#0FA85B" strokeWidth="2.4375" />
                                                    </svg>
                                                </div>
                                                <div className="address_detail_text">
                                                    <strong>Location</strong>
                                                    <p>Bhatta Chock Lahore , Pakistan</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="address_detail">
                                                <div className="address_detail_icon">
                                                    <svg width="30" height="37" viewBox="0 0 30 37"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M28.0016 10.25V26.75C28.0016 33.35 26.3516 35 19.7516 35H9.85156C3.25156 35 1.60156 33.35 1.60156 26.75V10.25C1.60156 3.65 3.25156 2 9.85156 2H19.7516C26.3516 2 28.0016 3.65 28.0016 10.25Z"
                                                            stroke="#0FA85B" strokeWidth="2.44"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path d="M18.0961 7.77734H11.4961" stroke="#0FA85B"
                                                            strokeWidth="2.44" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path
                                                            d="M14.7958 30.2127C16.2082 30.2127 17.3533 29.0676 17.3533 27.6552C17.3533 26.2427 16.2082 25.0977 14.7958 25.0977C13.3833 25.0977 12.2383 26.2427 12.2383 27.6552C12.2383 29.0676 13.3833 30.2127 14.7958 30.2127Z"
                                                            stroke="#0FA85B" strokeWidth="2.44"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <div className="address_detail_text">
                                                    <strong>Phone</strong>
                                                    <p><a href="callTo:+992 315 0250218"
                                                        title="Please call us at: +92 315 0250218">
                                                        +992 315 0250218</a></p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="address_detail">
                                                <div className="address_detail_icon">
                                                    <svg width="34" height="29" viewBox="0 0 34 29"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M24.5 27.5H9.5C5 27.5 2 25.25 2 20V9.5C2 4.25 5 2 9.5 2H24.5C29 2 32 4.25 32 9.5V20C32 25.25 29 27.5 24.5 27.5Z"
                                                            stroke="#0FA85B" strokeWidth="2.2"
                                                            strokeMiterlimit="10" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path
                                                            d="M25 10.2461L20.305 13.9961C18.76 15.2261 16.225 15.2261 14.68 13.9961L10 10.2461"
                                                            stroke="#0FA85B" strokeWidth="2.2"
                                                            strokeMiterlimit="10" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <div className="address_detail_text">
                                                    <strong>Email</strong>
                                                    <p><a href="mailTo:usamashafique218@gmail.com"
                                                        title="Please Email us at: usamashafique218@gmail.com">
                                                        usamashafique218@gmail.com</a></p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="contactUs_social_icons">
                                    <h4>Social</h4>
                                    <ul>
                                        <li>
                                            <a href="https://www.facebook.com/c2cride" target="_blank" className="c_us_social_box">
                                                <i>
                                                    <svg width="15" height="29" viewBox="0 0 15 29"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M9.71024 28.2873V14.142H13.615L14.1324 9.26745H9.71024L9.71687 6.82769C9.71687 5.55633 9.83767 4.8751 11.6637 4.8751H14.1048V0H10.1995C5.50864 0 3.85758 2.36468 3.85758 6.34133V9.268H0.933594V14.1426H3.85758V28.2873H9.71024Z"
                                                            fill="#0FA85B" />
                                                    </svg>
                                                </i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://x.com/c2crides" target="_blank" className="c_us_social_box">
                                                <i>
                                                    <svg width="29" height="25" viewBox="0 0 29 25"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M9.32522 0.53125H0.554688L10.9535 13.7746L1.2199 24.8841H5.71711L13.079 16.4816L19.616 24.8069H28.3865L17.6856 11.1787L17.7045 11.2022L26.9182 0.685957H22.421L15.5787 8.49548L9.32522 0.53125ZM5.39587 2.85058H8.12625L23.5453 22.4874H20.8149L5.39587 2.85058Z"
                                                            fill="#0FA85B" />
                                                    </svg>
                                                </i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/c2crides/" target="_blank" className="c_us_social_box">
                                                <i>
                                                    <svg width="28" height="28" viewBox="0 0 28 28"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M13.9421 0.132812C10.1761 0.132812 9.70352 0.149279 8.2244 0.216591C6.74817 0.284191 5.74052 0.517904 4.85883 0.860817C3.9468 1.215 3.17315 1.68878 2.40239 2.45983C1.63105 3.23059 1.15727 4.00424 0.801934 4.91597C0.458154 5.79796 0.224153 6.8059 0.157708 8.28155C0.0915522 9.76067 0.0742188 10.2336 0.0742188 13.9996C0.0742188 17.7655 0.0909744 18.2367 0.157997 19.7158C0.225886 21.1921 0.459599 22.1997 0.802223 23.0814C1.15669 23.9934 1.63047 24.7671 2.40152 25.5379C3.17199 26.3092 3.94564 26.7841 4.85709 27.1383C5.73936 27.4812 6.7473 27.7149 8.22325 27.7825C9.70237 27.8498 10.1747 27.8663 13.9404 27.8663C17.7067 27.8663 18.1778 27.8498 19.657 27.7825C21.1332 27.7149 22.142 27.4812 23.0243 27.1383C23.936 26.7841 24.7085 26.3092 25.479 25.5379C26.2503 24.7671 26.7241 23.9934 27.0794 23.0817C27.4203 22.1997 27.6543 21.1918 27.7237 19.7161C27.7901 18.237 27.8074 17.7655 27.8074 13.9996C27.8074 10.2336 27.7901 9.76096 27.7237 8.28184C27.6543 6.80561 27.4203 5.79796 27.0794 4.91626C26.7241 4.00424 26.2503 3.23059 25.479 2.45983C24.7076 1.68849 23.9363 1.21471 23.0234 0.860817C22.1394 0.517904 21.1312 0.284191 19.6549 0.216591C18.1758 0.149279 17.7049 0.132812 13.9378 0.132812H13.9421ZM12.6977 2.63021C12.9392 2.62983 13.1991 2.62995 13.4795 2.63007L13.9417 2.63021C17.6441 2.63021 18.0829 2.6435 19.545 2.70994C20.897 2.77177 21.6308 2.99768 22.1196 3.18748C22.7667 3.43881 23.228 3.73926 23.7131 4.2246C24.1984 4.70993 24.4989 5.17216 24.7508 5.81927C24.9406 6.3075 25.1668 7.04128 25.2283 8.39329C25.2948 9.85507 25.3092 10.2942 25.3092 13.9949C25.3092 17.6956 25.2948 18.1347 25.2283 19.5965C25.1665 20.9485 24.9406 21.6823 24.7508 22.1705C24.4995 22.8176 24.1984 23.2784 23.7131 23.7634C23.2278 24.2488 22.767 24.5492 22.1196 24.8005C21.6313 24.9912 20.897 25.2165 19.545 25.2784C18.0832 25.3448 17.6441 25.3593 13.9417 25.3593C10.2389 25.3593 9.80012 25.3448 8.33833 25.2784C6.98632 25.216 6.25254 24.9901 5.76345 24.8003C5.11633 24.5489 4.65411 24.2485 4.16877 23.7631C3.68344 23.2778 3.38299 22.8167 3.13108 22.1693C2.94128 21.6811 2.71507 20.9473 2.65354 19.5953C2.5871 18.1335 2.57381 17.6944 2.57381 13.9914C2.57381 10.2884 2.5871 9.85161 2.65354 8.38982C2.71536 7.03781 2.94128 6.30403 3.13108 5.81523C3.38241 5.16811 3.68344 4.70589 4.16877 4.22055C4.65411 3.73522 5.11633 3.43477 5.76345 3.18286C6.25225 2.99219 6.98632 2.76686 8.33833 2.70474C9.61754 2.64697 10.1133 2.62963 12.6977 2.62674V2.63021ZM19.6797 6.59657C19.6797 5.67761 20.425 4.93314 21.3437 4.93314V4.93256C22.2624 4.93256 23.0077 5.6779 23.0077 6.59657C23.0077 7.51524 22.2624 8.26058 21.3437 8.26058C20.425 8.26058 19.6797 7.51524 19.6797 6.59657ZM13.9429 6.87891C10.0103 6.87891 6.82178 10.0674 6.82178 14.0001C6.82178 17.9327 10.0103 21.1198 13.9429 21.1198C17.8756 21.1198 21.0629 17.9327 21.0629 14.0001C21.0629 10.0675 17.8755 6.87906 13.9429 6.87891ZM18.5633 13.9992C18.5633 11.4463 16.4937 9.37695 13.9411 9.37695C11.3882 9.37695 9.31885 11.4463 9.31885 13.9992C9.31885 16.5518 11.3882 18.6215 13.9411 18.6215C16.4937 18.6215 18.5633 16.5518 18.5633 13.9992Z"
                                                            fill="#0FA85B" />
                                                    </svg>
                                                </i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.https://www.youtube.com/c2crides" target="_blank" className="c_us_social_box">
                                                <i>
                                                    <svg width="29" height="21" viewBox="0 0 29 21"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M27.6985 3.57855C27.3796 2.35329 26.4398 1.38846 25.2465 1.06101C23.084 0.465906 14.4115 0.465906 14.4115 0.465906C14.4115 0.465906 5.73905 0.465906 3.57633 1.06101C2.38301 1.38846 1.44324 2.35329 1.1243 3.57855C0.544901 5.79917 0.544901 10.4325 0.544901 10.4325C0.544901 10.4325 0.544901 15.0657 1.1243 17.2865C1.44324 18.5118 2.38301 19.4766 3.57633 19.8042C5.73905 20.3992 14.4115 20.3992 14.4115 20.3992C14.4115 20.3992 23.084 20.3992 25.2465 19.8042C26.4398 19.4766 27.3796 18.5118 27.6985 17.2865C28.2781 15.0657 28.2781 10.4325 28.2781 10.4325C28.2781 10.4325 28.2781 5.79917 27.6985 3.57855Z"
                                                            fill="#0FA85B" />
                                                        <path className="yt_btn_path"
                                                            d="M11.8105 15.2008V6.53418L18.7438 10.8677L11.8105 15.2008Z"
                                                            fill="#FCF8F4" />
                                                    </svg>
                                                </i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
