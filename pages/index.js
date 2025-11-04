import Header from '../components/Header'
import FriendsPanel from '../components/FriendsPanel'
import MovieCard from '../components/MovieCard'
import { useMoviesData, usePopularMovies } from '../hooks/useMovies'

export default function Home() {
  const { friendsWithMovies, loading: friendsLoading, error } = useMoviesData()
  const { movies: popularMovies, loading: popularLoading } = usePopularMovies()

  // Flatten recommended movies from friends (rating >= 4)
  const recommended = []
  friendsWithMovies.forEach((f) => {
    f.watchedMovies.forEach((m) => {
      if (m.rating >= 4) {
        recommended.push({ ...m, friendName: f.name })
      }
    })
  })

  // Movies currently being watched by friends
  const watchingNow = []
  friendsWithMovies.forEach((f) => {
    f.watchedMovies.forEach((m) => {
      if (m.isWatching) watchingNow.push({ ...m, friendName: f.name })
    })
  })

  if (error) {
    return (
      <div>
        <Header />
        <main className="container">
          <div className="error-message">
            <h2>Error cargando películas</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="btn">
              Reintentar
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <main className="container">
        <section className="hero">
          <h1>Inicio</h1>
          <p>Bienvenido — mira lo que tus amigos recomiendan.</p>
        </section>

        <div className="layout">
          <div className="main-col">
            <section className="section">
              <h2>Recomendaciones de Amigos</h2>
              {friendsLoading ? (
                <div className="loading">
                  <p>Cargando recomendaciones...</p>
                </div>
              ) : (
                <div className="movies-grid">
                  {recommended.length ? (
                    recommended.map((m) => (
                      <MovieCard key={m.id + '-' + m.friendName} movie={m} showFriend />
                    ))
                  ) : (
                    <p className="muted">No hay recomendaciones disponibles.</p>
                  )}
                </div>
              )}
            </section>

            <section className="section">
              <h2>Lo que están viendo ahora</h2>
              {friendsLoading ? (
                <div className="loading">
                  <p>Cargando actividad de amigos...</p>
                </div>
              ) : (
                <div className="movies-grid">
                  {watchingNow.length ? (
                    watchingNow.map((m) => (
                      <MovieCard key={m.id + '-watching-' + m.friendName} movie={m} showFriend />
                    ))
                  ) : (
                    <p className="muted">Nadie está viendo algo ahora.</p>
                  )}
                </div>
              )}
            </section>

            <section className="section">
              <h2>Películas Populares</h2>
              {popularLoading ? (
                <div className="loading">
                  <p>Cargando películas populares...</p>
                </div>
              ) : (
                <div className="movies-grid">
                  {popularMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className="side-col">
            <FriendsPanel friends={friendsWithMovies} loading={friendsLoading} />
          </aside>
        </div>
      </main>
    </div>
  )
}
