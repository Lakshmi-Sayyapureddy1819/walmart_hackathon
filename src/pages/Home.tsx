import React, { useState } from 'react';
import Image from './image2.jpg';

const FloatingLabel = ({ text, styleClass }) => {
  return <div className={`label ${styleClass}`}>{text}</div>;
};

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleIframeLoad = () => {
    setLoaded(true);
    // Add more delay for smooth transition
    setTimeout(() => setHideLoader(true), 2000);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Enhanced Custom Loader */}
      <div className={`enhanced-loader ${hideLoader ? 'hide' : ''}`}>
        {/* Animated Background Gradient */}
        <div className="animated-bg"></div>
        
        {/* Main Image with Advanced Effects */}
        <div className="image-container">
          <img 
            src={Image} 
            alt="Loading..." 
            className={`loader-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
          />
          
          {/* Blur Overlay Effect */}
          {/* <div className={`blur-overlay ${imageLoaded ? 'fade-out' : ''}`}></div> */}
          
          {/* Skeleton Loading Effect */}
          {/* <div className={`skeleton-overlay ${imageLoaded ? 'hidden' : ''}`}>
            <div className="skeleton-block skeleton-1"></div>
            <div className="skeleton-block skeleton-2"></div>
            <div className="skeleton-block skeleton-3"></div>
          </div> */}
        </div>

        {/* Enhanced Loading Animation */}
        <div className="loader-content">
          {/* <div className="modern-spinner"> */}
            {/* <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div> */}
          {/* </div> */}
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Smart Farm-to-Shelf
                <span className="block text-green-200">Scheduler</span>
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Transform traditional farming with AI-driven insights that optimize every stage from seed to shelf, 
                reducing costs while maximizing yields and sustainability.
              </p>
            
            <div className="loader-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar"></div>
          </div>
        </div>

      {/* Main Content */}
      <iframe
        src="https://skybox.blockadelabs.com/e/6b501be3b832de50154b6f9c0b3acc40"
        style={{ width: "100%", height: "100%", border: "none" }}
        allowFullScreen
        onLoad={handleIframeLoad}
      ></iframe>

      {/* Enhanced Floating Labels */}
      {loaded && (
        <>
          <FloatingLabel text="🌽 Harvest Readiness" styleClass="label1" />
          <FloatingLabel text="❄ Freshness Prediction" styleClass="label2" />
          <FloatingLabel text="🌧 Weather Impact" styleClass="label3" />
          <FloatingLabel text="📊 Yield Estimation" styleClass="label4" />
          <FloatingLabel text="🚚 Route Optimization" styleClass="label5" />
          <FloatingLabel text="🦠 Disease Detection" styleClass="label6" />
        </>
      )}
    </div>
  );
};

export default Home;
