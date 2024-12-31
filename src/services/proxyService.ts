import axios from 'axios';

const API_BASE_URL = 'http://localhost:3005/api';

interface ProxyConfig {
  method: string;
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export const proxyService = {
  async makeRequest(config: ProxyConfig) {
    try {
      console.log('🚀 ProxyService: Отправка запроса к:', config.url);
      console.log('📝 ProxyService: Параметры запроса:', config.params);

      // Заменяем TMDB URL на наш прокси URL
      const proxyUrl = config.url.replace('https://api.themoviedb.org/3', API_BASE_URL);
      
      const response = await axios({
        method: config.method,
        url: proxyUrl,
        params: config.params,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 30000
      });

      if (!response.data) {
        throw new Error('Нет данных в ответе');
      }

      console.log('✅ ProxyService: Получен ответ:', {
        status: response.status,
        dataPreview: JSON.stringify(response.data).slice(0, 200) + '...'
      });

      return response.data;
    } catch (error) {
      console.error('❌ ProxyService: Ошибка запроса:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Ошибка от сервера
          const errorMessage = error.response.data?.details?.status_message || 
                             error.response.data?.details?.message || 
                             error.response.statusText;
          console.error('Детали ошибки:', error.response.data);
          throw new Error(`Ошибка сервера: ${error.response.status} - ${errorMessage}`);
        } else if (error.request) {
          // Проверяем тип ошибки
          if (error.code === 'ECONNABORTED') {
            throw new Error('Превышено время ожидания ответа от сервера');
          } else {
            throw new Error('Ошибка сети: сервер не отвечает');
          }
        }
      }
      throw new Error(`Неизвестная ошибка: ${error.message}`);
    }
  },

  getTmdbUrl(endpoint: string): string {
    return `https://api.themoviedb.org/3${endpoint}`;
  }
}; 