import axios from 'axios'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

// API Key - en producción esto debería estar en variables de entorno seguras
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MWRjNzliNTc3OTQ1YmRiNzZkNzU1M2E4NzBjMjJiMCIsIm5iZiI6MTcyOTc2MTIxMS43NTYsInN1YiI6IjY3MWE2ZjBiNmFkOGY2MTVlYjA2YmVjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IZKcMwNCUQoR6HD_HpStT7lrcN2aVJywZ7gBBCtdweU'

console.log('TMDb API Key:', API_KEY ? 'Present' : 'Missing')

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
})

export const movieService = {
  // Obtener películas populares
  async getPopularMovies(page = 1) {
    try {
      console.log(`Fetching popular movies from TMDb (page ${page})...`)
      const response = await tmdbApi.get(`/movie/popular?page=${page}&language=es-ES`)
      console.log('TMDb response:', response.status, response.data?.results?.length || 0, 'movies')
      
      if (!response.data?.results) {
        throw new Error('No results from TMDb API')
      }
      
      return response.data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Sin+Poster',
        rating: Math.round(movie.vote_average / 2), // Convertir de 10 a 5 estrellas
        overview: movie.overview,
        releaseDate: movie.release_date,
        isWatching: Math.random() > 0.7 // Simulamos estado aleatorio
      }))
    } catch (error) {
      console.error('Error fetching popular movies:', error.message)
      if (error.response) {
        console.error('Response status:', error.response.status)
        console.error('Response data:', error.response.data)
      }
      throw error
    }
  },

  // Obtener películas en tendencia
  async getTrendingMovies() {
    try {
      const response = await tmdbApi.get('/trending/movie/week?language=es-ES')
      return response.data.results.slice(0, 10).map(movie => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Sin+Poster',
        rating: Math.round(movie.vote_average / 2),
        overview: movie.overview,
        releaseDate: movie.release_date,
        isWatching: Math.random() > 0.8
      }))
    } catch (error) {
      console.error('Error fetching trending movies:', error)
      return []
    }
  },

  // Obtener películas mejor calificadas
  async getTopRatedMovies() {
    try {
      const response = await tmdbApi.get('/movie/top_rated?page=1&language=es-ES')
      return response.data.results.slice(0, 8).map(movie => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Sin+Poster',
        rating: Math.round(movie.vote_average / 2),
        overview: movie.overview,
        releaseDate: movie.release_date,
        isWatching: false
      }))
    } catch (error) {
      console.error('Error fetching top rated movies:', error)
      return []
    }
  },

  // Obtener detalles de una película específica
  async getMovieDetails(movieId) {
    try {
      console.log(`Fetching movie details for ID: ${movieId}`)
      const response = await tmdbApi.get(`/movie/${movieId}?language=es-ES`)
      const movie = response.data
      
      if (!movie || !movie.id) {
        throw new Error(`Invalid movie data for ID ${movieId}`)
      }
      
      console.log(`Successfully loaded movie: ${movie.title}`)
      return {
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Sin+Poster',
        rating: Math.round(movie.vote_average / 2),
        overview: movie.overview,
        releaseDate: movie.release_date,
        runtime: movie.runtime,
        genres: movie.genres,
        isWatching: Math.random() > 0.8
      }
    } catch (error) {
      console.error(`Error fetching movie details for ID ${movieId}:`, error.message)
      if (error.response) {
        console.error('Response status:', error.response.status)
        console.error('Response data:', error.response.data)
      }
      throw error
    }
  }
}

export default movieService