import React from 'react';
import { Play, Info } from 'lucide-react';

export function FeaturedMovie() {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=2000"
        alt="Featured Movie"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/70 to-transparent">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-4">Inception</h1>
            <p className="text-blue-200 text-lg mb-8">
              Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state.
            </p>
            <div className="flex space-x-4">
              <button className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-400 transition-colors">
                <Play className="h-5 w-5 mr-2" />
                Watch Now
              </button>
              <button className="flex items-center px-6 py-3 bg-blue-800/50 text-white rounded-full hover:bg-blue-700/50 transition-colors">
                <Info className="h-5 w-5 mr-2" />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}