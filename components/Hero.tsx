
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark bg-opacity-50 z-10"></div>
        <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-brand-accent/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-brand-secondary/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
      <div className="container mx-auto px-6 text-center relative z-20">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          Unleash Your Team's Potential with <span className="text-brand-primary">Synergy</span>
        </h1>
        <p className="text-lg md:text-xl text-brand-light max-w-3xl mx-auto mb-8">
          The ultimate collaboration platform designed to streamline workflows, boost productivity, and bring your projects to life.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started Free
          </a>
          <a href="#" className="bg-transparent border-2 border-brand-light text-brand-light font-bold py-3 px-8 rounded-lg text-lg hover:bg-brand-light hover:text-brand-dark transition-all duration-300">
            Request a Demo
          </a>
        </div>
      </div>
       <style>{`
        @keyframes blob {
	        0% {
		        transform: translate(0px, 0px) scale(1);
	        }
	        33% {
		        transform: translate(30px, -50px) scale(1.1);
	        }
	        66% {
		        transform: translate(-20px, 20px) scale(0.9);
	        }
	        100% {
		        transform: translate(0px, 0px) scale(1);
	        }
        }
        .animate-blob {
            animation: blob 7s infinite;
        }
        .animation-delay-2000 {
            animation-delay: 2s;
        }
        .animation-delay-4000 {
            animation-delay: 4s;
        }
       `}</style>
    </section>
  );
};

export default Hero;
