import React from "react";
import bgImage from "./../assets/p3.jpg";
import ParticlesComponent from "./particles";
import './../App.css'

const DreamHomeHeader = () => {
    return (
        <div
            className="dream-header w-full h-[400px]"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="overlay ">
                <div>
                    {/* <ParticlesComponent id="Particles" style={{ height: 'auto !important' }} /> */}
                </div>
            </div>

            <div className="header-text">
                <h1>Apply For Your Dream Home</h1>
                <p>Complete the rental application, and we will get in touch with you soon.</p>
            </div>
        </div>
    );
};

export default DreamHomeHeader;
