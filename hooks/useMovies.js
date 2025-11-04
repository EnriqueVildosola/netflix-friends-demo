import { useState, useEffect } from 'react'
import { movieService } from '../services/tmdbService'
import { friendsMoviePreferences, generateFriendRating } from '../data/friends'
import { fallbackFriendsWithMovies, fallbackMovies } from '../data/fallbackMovies'

export function useMoviesData() {
  const [friendsWithMovies, setFriendsWithMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadFriendsMovies() {
      try {
        setLoading(true)
        console.log('Loading friends movies...')
        
        // Intentar cargar desde API
        const updatedFriends = []
        let apiWorking = true

        for (const friend of friendsMoviePreferences) {
          const friendMovies = []
          
          // Cargar detalles de cada película del amigo
          for (const movieId of friend.movieIds.slice(0, 3)) { // Limitar a 3 películas para faster loading
            try {
              console.log(`Loading movie ${movieId} for ${friend.name}`)
              const movieDetails = await movieService.getMovieDetails(movieId)
              if (movieDetails) {
                friendMovies.push({
                  ...movieDetails,
                  rating: generateFriendRating(movieId, friend.id),
                  isWatching: friend.currentlyWatching === movieId,
                  friendName: friend.name
                })
              }
            } catch (err) {
              console.log(`Error loading movie ${movieId}:`, err)
              apiWorking = false
              break
            }
          }

          if (apiWorking && friendMovies.length > 0) {
            updatedFriends.push({
              ...friend,
              watchedMovies: friendMovies
            })
          } else {
            // Si falla la API, usar datos de fallback
            console.log('API failed, using fallback data')
            apiWorking = false
            break
          }
        }

        if (apiWorking && updatedFriends.length > 0) {
          console.log('Successfully loaded from API:', updatedFriends)
          setFriendsWithMovies(updatedFriends)
        } else {
          console.log('Using fallback friends data')
          setFriendsWithMovies(fallbackFriendsWithMovies)
        }

      } catch (err) {
        console.error('Error loading friends movies, using fallback:', err)
        setFriendsWithMovies(fallbackFriendsWithMovies)
        setError('Usando datos de demostración')
      } finally {
        setLoading(false)
      }
    }

    loadFriendsMovies()
  }, [])

  return { friendsWithMovies, loading, error }
}

export function usePopularMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPopularMovies() {
      try {
        console.log('Loading popular movies...')
        const popularMovies = await movieService.getPopularMovies()
        
        if (popularMovies && popularMovies.length > 0) {
          console.log('Successfully loaded popular movies:', popularMovies.length)
          setMovies(popularMovies.slice(0, 10))
        } else {
          console.log('No popular movies from API, using fallback')
          setMovies(fallbackMovies.slice(0, 6))
        }
      } catch (err) {
        console.error('Error loading popular movies, using fallback:', err)
        setMovies(fallbackMovies.slice(0, 6))
      } finally {
        setLoading(false)
      }
    }

    loadPopularMovies()
  }, [])

  return { movies, loading }
}