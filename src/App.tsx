import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { FeaturedMovie } from './components/FeaturedMovie';
import { MovieCard } from './components/MovieCard';
import { SearchBar } from './components/SearchBar';
import { Layout } from './components/Layout';
import './components/snow.css';
import './components/animations.css';

const movies = [
  {
    title: "The Dark Knight",
    imageUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=600",
    rating: 9.0,
    year: 2008
  },
  {
    title: "Inception",
    imageUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=600",
    rating: 8.8,
    year: 2010
  },
  {
    title: "Interstellar",
    imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600",
    rating: 8.6,
    year: 2014
  },
  {
    title: "The Matrix",
    imageUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=600",
    rating: 8.7,
    year: 1999
  }
];

function App() {
  return (
    <Layout>
      <div className="min-h-screen bg-blue-950">
        <div className="fixed top-0 w-full bg-blue-950/95 backdrop-blur-sm z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <div className="flex items-center text-blue-300">
                  <span className="ml-2 text-xl font-bold">CineStream</span>
                </div>
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
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-16">
          <FeaturedMovie />
          <main className="max-w-7xl mx-auto px-4 py-12">
            <section className="mb-12 animate-fade-in">
              <h2 className="text-2xl font-bold text-white mb-6">Trending Now</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie, index) => (
                  <div
                    key={movie.title}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <MovieCard {...movie} />
                  </div>
                ))}
              </div>
            </section>
            <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-2xl font-bold text-white mb-6">New Releases</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie, index) => (
                  <div
                    key={movie.title}
                    className="animate-slide-up"
                    style={{ animationDelay: `${(index * 0.1) + 0.3}s` }}
                  >
                    <MovieCard {...movie} />
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default App;