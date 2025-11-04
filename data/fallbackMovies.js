// Películas de respaldo en caso de que falle la API de TMDb
export const fallbackMovies = [
  {
    id: 550,
    title: "El Club de la Pelea",
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    rating: 5,
    overview: "Un empleado de oficina insomne y un fabricante de jabón forman un club de lucha clandestino.",
    releaseDate: "1999-10-15",
    isWatching: true
  },
  {
    id: 13,
    title: "Forrest Gump",
    poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    rating: 5,
    overview: "Las presidencias de Kennedy y Johnson a través de los ojos de un hombre de Alabama.",
    releaseDate: "1994-07-06",
    isWatching: false
  },
  {
    id: 680,
    title: "Pulp Fiction",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    rating: 5,
    overview: "Las vidas de dos sicarios de la mafia se entrelazan con las de otros criminales.",
    releaseDate: "1994-09-10",
    isWatching: false
  },
  {
    id: 155,
    title: "El Caballero Oscuro",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 5,
    overview: "Batman debe aceptar una de las pruebas psicológicas y físicas más grandes.",
    releaseDate: "2008-07-16",
    isWatching: false
  },
  {
    id: 27205,
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    rating: 5,
    overview: "Un ladrón que roba secretos corporativos a través del subconsciente.",
    releaseDate: "2010-07-15",
    isWatching: false
  },
  {
    id: 19404,
    title: "Dilwale Dulhania Le Jayenge",
    poster: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
    rating: 4,
    overview: "Un joven se enamora durante un viaje a Europa.",
    releaseDate: "1995-10-20",
    isWatching: true
  },
  {
    id: 674,
    title: "Cadena Perpetua",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    rating: 5,
    overview: "Dos hombres encarcelados crean una amistad a lo largo de varios años.",
    releaseDate: "1994-09-23",
    isWatching: false
  },
  {
    id: 238,
    title: "El Padrino",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    rating: 5,
    overview: "El patriarca de una dinastía del crimen organizado transfiere el control a su hijo.",
    releaseDate: "1972-03-14",
    isWatching: false
  }
]

export const fallbackFriendsWithMovies = [
  {
    id: 'f1',
    name: 'Sofía',
    avatar: '',
    watchedMovies: [
      { ...fallbackMovies[0], friendName: 'Sofía' }, // Fight Club
      { ...fallbackMovies[1], friendName: 'Sofía', rating: 4 }, // Forrest Gump  
      { ...fallbackMovies[2], friendName: 'Sofía', rating: 5 }, // Pulp Fiction
    ]
  },
  {
    id: 'f2',
    name: 'Diego', 
    avatar: '',
    watchedMovies: [
      { ...fallbackMovies[3], friendName: 'Diego', rating: 5, isWatching: false }, // Dark Knight
      { ...fallbackMovies[6], friendName: 'Diego', rating: 5, isWatching: false }, // Shawshank
      { ...fallbackMovies[7], friendName: 'Diego', rating: 4, isWatching: false }, // Godfather
    ]
  },
  {
    id: 'f3',
    name: 'Valentina',
    avatar: '',
    watchedMovies: [
      { ...fallbackMovies[5], friendName: 'Valentina', rating: 4 }, // DDLJ
      { ...fallbackMovies[4], friendName: 'Valentina', rating: 5, isWatching: false }, // Inception
    ]
  }
]