import React from 'react';
import { X, Star, Calendar, Clock, DollarSign } from 'lucide-react';
import { Movie } from '../types/movie';
import { movieService } from '../services/movieService';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={movieService.getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            className="w-full h-[40vh] object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-3xl font-bold text-white mb-4">{movie.title}</h2>
          
          <div className="flex flex-wrap gap-4 mb-6 text-gray-300">
            <div className="flex items-center">
              <Star className="mr-2" size={20} />
              <span>{movie.vote_average.toFixed(1)} ({movie.vote_count} голосов)</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2" size={20} />
              <span>{new Date(movie.release_date).toLocaleDateString('ru-RU')}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2" size={20} />
              <span>{movie.runtime} мин.</span>
            </div>
            {movie.budget > 0 && (
              <div className="flex items-center">
                <DollarSign className="mr-2" size={20} />
                <span>{movie.budget.toLocaleString('ru-RU')} $</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">О фильме</h3>
            <p className="text-gray-300">{movie.overview}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">Жанры</h3>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map(genre => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 