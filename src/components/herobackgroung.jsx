import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DownArrow from '../images/arrow.png';
import NavBar from './navbar';
import GradientBackground from './gradientbg';

function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/talk');
  };

  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Gradient Background */}
      <GradientBackground />

      <div className="relative text-center space-y-4 mt-20 z-10">
        {/* Container for the text with gradient mask */}
        <div
          className="relative inline-block"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) -5%, rgba(255, 255, 255, 1) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          <h1 className="text-8xl font-sans text-white font-semibold mb-3">Revolutionizing</h1>
          <h2 className="text-7xl text-white pl-4 font-serif font-cursive italic">
            <span className="relative inline-block">
              <span className="relative z-10">Healthcare</span>
            </span>
            <span className=""> and Medicine</span>
          </h2>
          <h3 className="text-8xl font-sans text-white font-semibold mt-3">With AI</h3>
        </div>
        {/* White circle with arrow */}
        <div className="mt-8 flex items-center justify-center">
          <div
            className={`relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 ${isHovered ? 'bg-secondary' : 'bg-white'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
          >
            <img src={DownArrow} alt="down arrow" className="w-8 h-8" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
