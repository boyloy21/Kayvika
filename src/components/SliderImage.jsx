'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Slider = ({ images, captions, autoSlide = true, autoSlideInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Auto-slide effect
  useEffect(() => {
    if (!autoSlide) return;

    const slideInterval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(slideInterval); // Clear the interval on component unmount
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="overflow-hidden relative">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          width={800}
          height={600}
          className="w-full h-auto transition-transform duration-500"
        />
        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl font-semibold">
          {captions[currentIndex]}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-40 text-white px-2 py-1 rounded-r"
        onClick={prevSlide}
      >
        &#9664;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-40 text-white px-2 py-1 rounded-l"
        onClick={nextSlide}
      >
        &#9654;
      </button>

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-3">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
