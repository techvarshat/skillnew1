
import React from 'react';
import { BoltIcon, ChatBubbleLeftRightIcon, UsersIcon } from './IconComponents';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-gray-800/20 p-8 rounded-xl border border-gray-700/50 transition-all duration-300 hover:border-brand-primary/50 hover:shadow-2xl hover:shadow-brand-primary/10">
    <div className="bg-brand-primary/10 text-brand-primary w-16 h-16 rounded-lg flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
    <p className="text-brand-light opacity-80">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const featuresData = [
    {
      icon: <ChatBubbleLeftRightIcon />,
      title: "Real-Time Collaboration",
      description: "Communicate seamlessly with your team through integrated chat, video calls, and shared documents. Never miss an update.",
    },
    {
      icon: <BoltIcon />,
      title: "Automated Workflows",
      description: "Save time and reduce manual effort. Create custom automated workflows that handle repetitive tasks for you.",
    },
    {
      icon: <UsersIcon />,
      title: "Advanced Team Management",
      description: "Organize teams, assign roles, and manage permissions with ease. Get a clear overview of your team's progress and workload.",
    },
  ];

  return (
    <section className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Why Teams Choose Synergy</h2>
          <p className="text-lg text-brand-light mt-4 max-w-2xl mx-auto">
            We provide the tools you need to stay organized, focused, and ahead of the curve.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
