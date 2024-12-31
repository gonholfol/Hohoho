import { Movie } from '../types/movie';
import { proxyService } from './proxyService';

const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
};

export const movieService = {
  async searchMovies(query: string) {
    console.log('🎬 MovieService: Поиск фильмов по запросу:', query);
    const data = await proxyService.makeRequest({
      method: 'GET',
      url: proxyService.getTmdbUrl('/search/movie'),
      headers,
      params: {
        query: encodeURIComponent(query),
        language: 'ru',
        include_adult: 'false'
      }
    });
    console.log('📽️ MovieService: Найдено фильмов:', data.results?.length);
    return data;
  },

  async getMovieDetails(id: string | number) {
    console.log('🎬 MovieService: Запрос деталей фильма:', id);
    const data = await proxyService.makeRequest({
      method: 'GET',
      url: proxyService.getTmdbUrl(`/movie/${id}`),
      headers,
      params: {
        language: 'ru'
      }
    });
    console.log('📽️ MovieService: Получены детали фильма:', data.title);
    return data;
  },

  async getTrendingMovies() {
    console.log('🎬 MovieService: Запрос трендовых фильмов');
    const data = await proxyService.makeRequest({
      method: 'GET',
      url: proxyService.getTmdbUrl('/trending/movie/week'),
      headers,
      params: {
        language: 'ru'
      }
    });
    console.log('📽️ MovieService: Получено трендовых фильмов:', data.results?.length);
    return data;
  },

  getImageUrl(path: string | null, size: 'w500' | 'original' = 'w500'): string {
    if (!path) return 'https://via.placeholder.com/500x750?text=Нет+постера';
    return `http://localhost:3005/api/t/p/${size}${path}`;
  }
}; 