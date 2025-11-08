import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
      <Card className="p-8 md:p-12 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
          Find. Learn. Grow.
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-lg mx-auto mb-8">
          Instantly access the best free online resources for any skill. Your journey to mastery starts here.
        </p>
        <Link
          to="/search"
          className="bg-white text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Get Started
        </Link>
      </Card>
    </div>
  );
};

export default Home;
