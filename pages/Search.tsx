import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '../components/IconComponents';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const trendingTopics = ['React', 'Python', 'Figma', 'Next.js', 'Data Science'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/results?q=${encodeURIComponent(query)}`);
    }
  };
  
  const handleTrendingClick = (topic: string) => {
    navigate(`/results?q=${encodeURIComponent(topic)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">What do you want to master today?</h1>
      
      <form onSubmit={handleSearch} className="w-full max-w-lg mb-10">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder=""
            aria-label="Enter topic or skill to search"
            className="w-full pl-6 pr-16 py-3 bg-transparent border-2 border-white/80 rounded-full focus:outline-none focus:border-white transition-all duration-300 text-white text-lg"
          />
          <button type="submit" aria-label="Search" className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors transform hover:scale-105">
            <SearchIcon className="w-6 h-6" />
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="text-sm text-white/50 mr-2">Trending:</span>
        {trendingTopics.map(topic => (
            <button
              key={topic}
              onClick={() => handleTrendingClick(topic)}
              className="px-3 py-1 bg-transparent border border-white/60 rounded-full text-sm text-white/80 hover:bg-white hover:text-black transition-all duration-300"
            >
              {topic}
            </button>
        ))}
      </div>
    </div>
  );
};

export default Search;