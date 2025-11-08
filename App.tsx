import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Results from './pages/Results';
import Resources from './pages/Resources';
import About from './pages/About';
import Feedback from './pages/Feedback';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="bg-black min-h-screen font-sans text-white/90">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,255,255,0.1),rgba(255,255,255,0))]"></div>
      </div>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/results" element={<Results />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;