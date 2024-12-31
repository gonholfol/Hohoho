import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MovieCard } from '../components/MovieCard';
import { SearchBar } from '../components/SearchBar';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Navbar';
import { movieService } from '../services/movieService';

export function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [location.search]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      setError('');
      navigate(`/search?q=${encodeURIComponent(query)}`, { replace: true });
      
      const data = await movieService.searchMovies(query);
      
      if (data.results && data.results.length > 0) {
        const validResults = data.results.filter(movie => 
          movie.title && (movie.release_date || movie.vote_average)
        );
        setSearchResults(validResults);
      } else {
        setError('По вашему запросу ничего не найдено');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Ошибка при поиске фильмов:', error);
      setError('Произошла ошибка при поиске. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-blue-950">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-6">
            <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-white text-xl py-12">{error}</div>
          ) : searchResults.length > 0 ? (
            <div className="py-8">
              <h1 className="text-3xl font-bold text-white mb-8">
                Результаты поиска: {searchQuery}
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((movie: any) => (
                  <div
                    key={movie.id}
                    className="animate-slide-up"
                  >
                    <MovieCard
                      id={movie.id}
                      title={movie.title}
                      imageUrl={movieService.getImageUrl(movie.poster_path)}
                      rating={movie.vote_average || 0}
                      year={movie.release_date ? new Date(movie.release_date).getFullYear() : 0}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-white text-xl py-12">
              Введите название фильма для поиска
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 