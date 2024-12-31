import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Загружаем .env файл
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Проверяем наличие API ключа
const API_KEY = process.env.VITE_TMDB_API_KEY;
if (!API_KEY) {
  console.error('❌ Ошибка: VITE_TMDB_API_KEY не найден в .env файле');
  process.exit(1);
}

// Включаем CORS для нашего фронтенда
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Прокси для изображений TMDB
app.get('/api/t/p/*', async (req, res) => {
  try {
    const imagePath = req.path.replace('/api', '');
    const imageUrl = `https://image.tmdb.org${imagePath}`;
    
    console.log('🖼️ Прокси получил запрос изображения:', imageUrl);
    
    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'stream',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'image/*'
      }
    });
    
    // Передаем заголовки изображения
    res.set('Content-Type', response.headers['content-type']);
    res.set('Cache-Control', 'public, max-age=31536000'); // кэшируем на 1 год
    
    // Передаем изображение
    response.data.pipe(res);
  } catch (error) {
    console.error('❌ Ошибка при получении изображения:', error.message);
    res.status(404).send('Изображение не найдено');
  }
});

// Прокси для TMDB API
app.get('/api/*', async (req, res) => {
  try {
    const tmdbPath = req.path.replace('/api', '');
    const tmdbUrl = `https://api.themoviedb.org/3${tmdbPath}`;
    
    console.log('🔄 Прокси получил запрос:', {
      path: tmdbPath,
      params: req.query
    });
    
    // Добавляем все query параметры из оригинального запроса
    const response = await axios({
      method: 'get',
      url: tmdbUrl,
      params: req.query,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
    
    console.log('✅ Прокси получил ответ от TMDB');
    res.json(response.data);
  } catch (error) {
    console.error('❌ Ошибка прокси:', error.message);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Добавляем больше информации об ошибке
        console.error('Детали ошибки:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
        res.status(error.response.status).json({
          error: 'TMDB API Error',
          details: error.response.data
        });
      } else if (error.request) {
        res.status(504).json({
          error: 'Gateway Timeout',
          details: 'TMDB API не отвечает'
        });
      }
    } else {
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.message
      });
    }
  }
});

const PORT = 3005;

// Добавляем обработку ошибок
process.on('uncaughtException', (error) => {
  console.error('Необработанная ошибка:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Необработанное отклонение промиса:', error);
});

try {
  app.listen(PORT, () => {
    console.log(`🚀 Прокси-сервер запущен на порту ${PORT}`);
    console.log(`🔑 API ключ ${API_KEY ? 'найден' : 'не найден'}`);
  });
} catch (error) {
  console.error('Ошибка при запуске сервера:', error);
  process.exit(1);
} 