import React from 'react';
import { Search, Film, Heart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-blue-950/95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center text-blue-300">
              <Film className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">CineStream</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              {['Movies', 'Series', 'New'].map((item) => (
                <button
                  key={item}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-blue-300 hover:text-white transition-colors">
              <Heart className="h-6 w-6" />
            </button>
            <button className="text-blue-300 hover:text-white transition-colors">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}