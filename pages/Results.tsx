import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Resource, searchResources, incrementViews, addReview } from '../data/dummyData';
import Card from '../components/Card';
import { StarIcon, EyeIcon, SparklesIcon, LoadingSpinner } from '../components/IconComponents';

const ResourceCard: React.FC<{ resource: Resource; onReviewAdded?: () => void }> = ({ resource, onReviewAdded }) => {
  const [showForm, setShowForm] = React.useState(false);
  const [author, setAuthor] = React.useState('');
  const [text, setText] = React.useState('');
  const [rating, setRating] = React.useState(5);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;
    setSubmitting(true);
    try {
      await addReview(resource.id, { author, text, rating });
      setAuthor(''); setText(''); setRating(5); setShowForm(false);
      onReviewAdded && onReviewAdded();
    } catch (err) {
      console.error('Failed to add review', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden h-full group">
      <div className="overflow-hidden">
        <img src={resource.thumbnail} alt={resource.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-white/50 mb-1">{resource.provider.toUpperCase()}</span>
        <h3 className="font-bold text-lg mb-3 text-white">{resource.title}</h3>

        {resource.summary && (
          <div>
            <div className="flex items-center gap-1 mb-2">
              {[1,2,3,4,5].map((star) => (
                <StarIcon 
                  key={star}
                  className={`w-5 h-5 ${
                    star <= resource.rating 
                      ? 'text-yellow-400' 
                      : 'text-white/20'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-white/60">
                AI Educational Rating
              </span>
            </div>
            
            <div className="border-l-2 border-purple-400/50 pl-3 space-y-1">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <p className="text-sm font-semibold text-white/90">AI Summary</p>
              </div>
              <p className="text-sm text-white/70">{resource.summary}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-around text-white/90 mt-auto pt-4 border-t border-glass-border">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5">
              <EyeIcon className="w-5 h-5"/>
              <span className="font-bold text-lg">{Number(resource.views).toLocaleString()}</span>
            </div>
            <span className="text-xs text-white/60">VIEWS</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-sm font-medium">{(resource.reviews || []).length} reviews</div>
          </div>
        </div>

        <div className="p-3 border-t border-glass-border bg-white/2">
          <button type="button" onClick={() => setShowForm(s => !s)} className="text-sm text-white/80 hover:text-white">
            {showForm ? 'Cancel' : 'Add Review'}
          </button>
          {showForm && (
            <form onSubmit={handleSubmit} className="mt-3 space-y-2">
              <input 
                placeholder="Your name" 
                value={author} 
                onChange={e => setAuthor(e.target.value)} 
                className="w-full p-2 rounded-md bg-glass-bg border border-glass-border" 
                required 
              />
              <textarea 
                placeholder="Your review" 
                value={text} 
                onChange={e => setText(e.target.value)} 
                className="w-full p-2 rounded-md bg-glass-bg border border-glass-border" 
                rows={3} 
                required 
              />
              <div className="flex items-center gap-2">
                <label className="text-sm">Rating</label>
                <select 
                  value={rating} 
                  onChange={e => setRating(Number(e.target.value))} 
                  className="p-2 rounded-md bg-glass-bg border border-glass-border"
                >
                  {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="ml-auto bg-white text-black font-semibold py-1 px-3 rounded-md"
                >
                  {submitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => incrementViews(resource.id)}
        className="block text-center bg-white/10 font-semibold py-2.5 hover:bg-white/20 transition-colors text-sm"
      >
        Visit Resource
      </a>
    </Card>
  );
};

const Results: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const data = await searchResources(query);
      setResults(data);
    } catch (error) {
      console.error('Failed to fetch results:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (query) {
      fetchResults();
    } else {
      setLoading(false);
      setResults([]);
    }
  }, [query]);

  return (
    <div className="space-y-8">
      <div>
        <Link to="/search" className="text-sm text-white/60 hover:text-white">&larr; Back to Search</Link>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">Results for "{query}"</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner className="w-12 h-12 text-white" />
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map(resource => (
            <ResourceCard key={resource.id} resource={resource} onReviewAdded={fetchResults} />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
            <h2 className="text-xl font-bold mb-2">No Results Found</h2>
            <p className="text-white/70">Try searching for another topic or skill.</p>
        </Card>
      )}
    </div>
  );
};

export default Results;