import React from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  id?: number;
  title: string;
  imageUrl: string;
  rating: number;
  year: number;
}

export function MovieCard({ id, title, imageUrl, rating, year }: MovieCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (id) {
      navigate(`/movie/${id}`);
    }
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      <div className="aspect-[2/3] w-full">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 to-transparent">
        <div className="absolute bottom-0 p-4 w-full">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <div className="flex items-center justify-between text-blue-200">
            <span>{year}</span>
            <span>★ {rating}</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-blue-900/60 transition-opacity duration-300 group-hover:opacity-100">
        <button className="rounded-full bg-blue-500 p-4 text-white hover:bg-blue-400 transition-colors">
          <Play className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}