import React from 'react' 
import Accordion from '../components/Accordion'
 
function Faqs() {
    return (
        <div className="gradiantParent">
            <div className="gradiantChild">
                <section className="faqs_sec">
                    <div className="autoContent">
                        <div className="faqs_sec_inner">
                            <div className="headlines">
                                <h2>FAQs</h2>
                            </div>
                            <Accordion />
                        </div>
                    </div>
                </section>
            </div>
        </div> 
  )
}

export default Faqs
