// src/app/components/StarGame.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Star = {
  id: number;
  x: number;
  y: number;
  color: string;
};

const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500'];

const StarGame: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [bucketX, setBucketX] = useState(50);
  const [score, setScore] = useState(0);

  // Generate new stars periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setStars((prevStars) => [
        ...prevStars,
        {
          id: Date.now(),
          x: Math.random() * 100,
          y: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Move stars downward
  useEffect(() => {
    const interval = setInterval(() => {
      setStars((prevStars) =>
        prevStars
          .map((star) => ({ ...star, y: star.y + 5 }))
          .filter((star) => star.y < 100)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Handle keypress for bucket movement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setBucketX((prev) => Math.max(prev - 10, 0));
      } else if (e.key === 'ArrowRight') {
        setBucketX((prev) => Math.min(prev + 10, 100));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check for collisions and update score
  useEffect(() => {
    setStars((prevStars) => {
      let newStars = [...prevStars];
      newStars = newStars.filter((star) => {
        const caught = star.y > 90 && Math.abs(star.x - bucketX) < 10;
        if (caught) {
          setScore((prev) => prev + 1);
          return false; // Remove the caught star
        }
        return true; // Keep the star that wasn't caught
      });
      return newStars;
    });
  }, [bucketX]);

 // Handle bucket movement for mobile buttons
 const moveLeft = () => {
  setBucketX((prev) => Math.max(prev - 10, 0));
};

const moveRight = () => {
  setBucketX((prev) => Math.min(prev + 10, 100));
}; 

  return (
    <div className="bg-image-1  relative bg-black w-screen h-screen max-w-full mx-auto">
      <h1 className="text-xl  lg:text-3xl font-bold text-center text-white mt-2 mb-2">🌟Move & Catch the Star🌟</h1>
      <div className="bg-image-2  relative w-full h-[80vh] bg-white overflow-hidden rounded-lg sm:h-[70vh] lg:h-[70vh]">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute  w-10 h-10 lg:w-16 lg:h-16 ${star.color} star-shape`}
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
          ></div>
        ))}
        <div
          className="absolute bottom-0 w-20 h-6 lg:w-32 lg:h-8 bg-fuchsia-500 rounded-b-full"
          style={{ left: `${bucketX}%`, transform: 'translateX(-50%)' }}
        ></div>
        
        {/* Buttons for Mobile */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-between gap-4 sm:hidden">
  <button
    type="button" // Specifies that this is not a submit button
    title="Move left" // Provides accessible text for screen readers
    aria-label="Move left" // Alternative text for assistive technologies
    className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow-md"
    onClick={moveLeft}
  >
    <FaArrowLeft className="text-2xl" />
  </button>
  <button
    type="button" // Specifies that this is not a submit button
    title="Move right" // Provides accessible text for screen readers
    aria-label="Move right" // Alternative text for assistive technologies
    className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow-md"
    onClick={moveRight}
  >
    <FaArrowRight className="text-2xl" />
  </button>
</div>



      </div>
      <p className="text-white text-2xl font-bold text-center mt-1">Score: {score}</p>
      <h4 className='text-center text-sm text-white'>Author:Azmat Ali</h4>
    </div>
  );
};

export default StarGame;

/* 🌟 */