// IDs de películas reales de TMDb para simular lo que han visto los amigos
export const friendsMoviePreferences = [
  {
    id: 'f1',
    name: 'Sofía',
    avatar: '',
    // IDs de películas populares y bien calificadas
    movieIds: [550, 680, 13, 27205, 324857], // Fight Club, Pulp Fiction, Forrest Gump, Inception, Spider-Man: Into the Spider-Verse
    currentlyWatching: 550 // Fight Club
  },
  {
    id: 'f2', 
    name: 'Diego',
    avatar: '',
    movieIds: [155, 497, 120, 578, 424], // The Dark Knight, The Green Mile, The Lord of the Rings, Jaws, Schindler's List
    currentlyWatching: null
  },
  {
    id: 'f3',
    name: 'Valentina', 
    avatar: '',
    movieIds: [19404, 10681, 597, 11216, 674], // Dilwale Dulhania Le Jayenge, WALL-E, Titanic, Cinema Paradiso, The Shawshank Redemption
    currentlyWatching: 19404
  },
]

// Función helper para generar calificaciones aleatorias pero coherentes
export function generateFriendRating(movieId, friendId) {
  // Usar una semilla basada en los IDs para generar calificaciones consistentes
  const seed = parseInt(movieId.toString() + friendId.slice(-1))
  const ratings = [4, 5, 4, 5, 3, 4] // Bias hacia calificaciones altas
  return ratings[seed % ratings.length]
}
