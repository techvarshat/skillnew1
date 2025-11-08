import React, { useState } from 'react';
import Card from '../components/Card';

const Feedback: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Feedback & Suggestions</h1>
      <Card className="p-8">
        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p className="text-white/80">Your feedback has been submitted and helps us improve the platform.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="feedbackType" className="block text-sm font-medium text-white/80 mb-2">
                Feedback Type
              </label>
              <select
                id="feedbackType"
                name="feedbackType"
                className="w-full p-3 bg-glass-bg border border-glass-border rounded-lg backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
              >
                <option>Suggestion</option>
                <option>Bug Report</option>
                <option>General Comment</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell us what you think..."
                className="w-full p-3 bg-glass-bg border border-glass-border rounded-lg backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 placeholder-white/50"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Feedback;
