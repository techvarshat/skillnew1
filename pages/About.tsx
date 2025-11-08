import React from 'react';
import Card from '../components/Card';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">About This Project</h1>
      <Card className="p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
          <p className="text-white/80 leading-relaxed">
            Our goal is to build a web application that helps students instantly find and access the best free online resources for any skill or learning topic. We believe that education should be accessible to everyone, and this platform is our contribution to making that a reality. By aggregating and ranking high-quality free content, we aim to empower learners worldwide.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">The Team</h2>
          <p className="text-white/80 leading-relaxed">
            We are a passionate team of four student developers, designers, and researchers dedicated to creating useful tools for our peers. This project is a collaborative effort to apply our skills to a real-world problem and learn along the way.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <span className="font-semibold px-4 py-2 bg-glass-bg border border-glass-border rounded-lg">React</span>
            <span className="font-semibold px-4 py-2 bg-glass-bg border border-glass-border rounded-lg">TypeScript</span>
            <span className="font-semibold px-4 py-2 bg-glass-bg border border-glass-border rounded-lg">Tailwind CSS</span>
            <span className="font-semibold px-4 py-2 bg-glass-bg border border-glass-border rounded-lg">Vite</span>
            <span className="font-semibold px-4 py-2 bg-glass-bg border border-glass-border rounded-lg">Netlify</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default About;
