import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Star, Calendar, Clock, DollarSign, Award, Users, Globe } from 'lucide-react';
import { movieService } from '../services/movieService';
import { Navbar } from '../components/Navbar';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  budget: number;
  revenue: number;
  genres: Array<{ id: number; name: string }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  status: string;
}

export function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await movieService.getMovieDetails(id!);
        setMovie(data);
      } catch (error) {
        setError('Ошибка при загрузке информации о фильме');
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error || !movie) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen text-white text-xl">
          {error || 'Фильм не найден'}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-blue-950 pt-16">
        <Navbar />
        {/* Hero Section with Backdrop */}
        <div className="relative h-[60vh] w-full">
          <div className="absolute inset-0">
            <img
              src={movieService.getImageUrl(movie.backdrop_path, 'original')}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto flex gap-8">
              {/* Poster */}
              <div className="w-64 flex-shrink-0">
                <img
                  src={movieService.getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
              
              {/* Movie Info */}
              <div className="flex-grow text-white">
                <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                <div className="flex flex-wrap gap-6 mb-6 text-lg">
                  <div className="flex items-center">
                    <Star className="mr-2 text-yellow-400" />
                    <span>{movie.vote_average.toFixed(1)} ({movie.vote_count} голосов)</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2" />
                    <span>{new Date(movie.release_date).toLocaleDateString('ru-RU')}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2" />
                    <span>{movie.runtime} мин.</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map(genre => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-blue-600/50 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2">
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">О фильме</h2>
                <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
              </section>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-blue-900/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-6">Детали</h3>
                <div className="space-y-4">
                  {movie.budget > 0 && (
                    <div className="flex items-center text-gray-300">
                      <DollarSign className="mr-3 text-blue-400" />
                      <div>
                        <div className="text-sm text-gray-400">Бюджет</div>
                        <div>${movie.budget.toLocaleString()}</div>
                      </div>
                    </div>
                  )}
                  {movie.revenue > 0 && (
                    <div className="flex items-center text-gray-300">
                      <Award className="mr-3 text-blue-400" />
                      <div>
                        <div className="text-sm text-gray-400">Сборы</div>
                        <div>${movie.revenue.toLocaleString()}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center text-gray-300">
                    <Users className="mr-3 text-blue-400" />
                    <div>
                      <div className="text-sm text-gray-400">Статус</div>
                      <div>{movie.status}</div>
                    </div>
                  </div>
                  {movie.production_countries.length > 0 && (
                    <div className="flex items-center text-gray-300">
                      <Globe className="mr-3 text-blue-400" />
                      <div>
                        <div className="text-sm text-gray-400">Страна</div>
                        <div>{movie.production_countries.map(c => c.name).join(', ')}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 