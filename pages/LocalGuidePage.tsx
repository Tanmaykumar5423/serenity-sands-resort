import React, { useState } from 'react';
import { Search, MapPin, Loader2, Compass, Sun, Calendar as CalendarIcon, ExternalLink, Sparkles } from 'lucide-react';
import { searchLocalInsights, generateItinerary } from '../services/geminiService';
import { SearchResult } from '../types';

export const LocalGuidePage: React.FC = () => {
  // Search Grounding State
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Itinerary State
  const [preferences, setPreferences] = useState('');
  const [itinerary, setItinerary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setSearchResult(null);
    const result = await searchLocalInsights(query);
    setSearchResult(result);
    setIsSearching(false);
  };

  const handleGenerateItinerary = async () => {
    if (!preferences.trim()) return;
    setIsGenerating(true);
    setItinerary('');
    const result = await generateItinerary(preferences);
    setItinerary(result);
    setIsGenerating(false);
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold-600 font-bold tracking-widest uppercase text-sm">Explore the Area</span>
          <h1 className="text-5xl md:text-6xl font-serif text-navy-900 mb-6">Concierge Intelligence</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Powered by Gemini, our digital concierge brings you real-time local insights and personalized planning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT: Local Search (Grounding) */}
          <div className="bg-white p-8 shadow-xl rounded-2xl border border-stone-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <MapPin size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-serif text-navy-900">Local Guide</h2>
                <p className="text-xs text-stone-500 uppercase tracking-wide">Powered by Google Search</p>
              </div>
            </div>

            <p className="text-stone-600 mb-6 text-sm">
              Discover real-time events, weather, or local news nearby. Try searching for "Local festivals this weekend" or "Weather forecast".
            </p>

            <form onSubmit={handleSearch} className="flex gap-2 mb-8">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about local events..." 
                className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all"
              />
              <button 
                type="submit" 
                disabled={isSearching}
                className="bg-navy-900 text-white px-6 rounded-lg hover:bg-navy-800 disabled:opacity-50 transition-colors"
              >
                {isSearching ? <Loader2 className="animate-spin" /> : <Search />}
              </button>
            </form>

            {searchResult && (
              <div className="animate-fade-in space-y-4">
                <div className="bg-stone-50 p-6 rounded-lg border border-stone-100 prose prose-stone max-w-none text-sm leading-relaxed">
                  {searchResult.text.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">{line}</p>
                  ))}
                </div>
                
                {searchResult.sources.length > 0 && (
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest text-stone-400 mb-3">Sources</h4>
                    <ul className="space-y-2">
                      {searchResult.sources.map((source, idx) => (
                        <li key={idx}>
                          <a 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:underline text-sm truncate"
                          >
                            <ExternalLink size={12} />
                            {source.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Itinerary Generator */}
          <div className="bg-white p-8 shadow-xl rounded-2xl border border-stone-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gold-100 p-3 rounded-full text-gold-600">
                <Compass size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-serif text-navy-900">Day Planner</h2>
                <p className="text-xs text-stone-500 uppercase tracking-wide">AI Concierge Service</p>
              </div>
            </div>

            <p className="text-stone-600 mb-6 text-sm">
              Let us design your perfect day. Tell us what you love (e.g., "Relaxing spa day with seafood dinner" or "Adventure water sports").
            </p>

            <div className="mb-6">
              <textarea 
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder="Describe your ideal day..." 
                className="w-full h-32 bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold-200 focus:border-gold-400 outline-none transition-all resize-none"
              />
            </div>
            
            <button 
              onClick={handleGenerateItinerary}
              disabled={isGenerating}
              className="w-full bg-gold-500 text-white font-bold py-3 rounded-lg hover:bg-gold-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 mb-8"
            >
              {/* Fixed: Added Sparkles to import */}
              {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
              Curate My Day
            </button>

            {itinerary && (
              <div className="bg-stone-50 p-6 rounded-lg border border-stone-100 animate-fade-in relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-gold-400 rounded-l-lg"></div>
                <div className="prose prose-stone prose-headings:font-serif prose-headings:text-navy-900 prose-sm max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: itinerary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }} />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};