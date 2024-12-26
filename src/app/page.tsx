"use client"

import React from 'react';
import StarGame from './components/StarGame';

const HomePage: React.FC = () => {
  return (
    <main className="bg-image-1 min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
  <h1 className="text-4xl font-bold mb-6 hidden md:block">🌟🌟🌟Welcome to Catch the Star🌟🌟🌟</h1>
  <p className="text-lg mb-4 hidden md:block">🌟🌟A fun game where you catch colorful falling stars!🌟🌟</p>
  <StarGame />
</main>

  );
};

export default HomePage;
