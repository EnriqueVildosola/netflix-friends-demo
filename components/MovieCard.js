export default function MovieCard({ movie, showFriend }) {
  return (
    <div className="movie-card" title={movie.overview}>
      <img 
        src={movie.poster} 
        alt={movie.title} 
        className="poster"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/500x750?text=Sin+Poster'
        }}
      />
      <div className="meta">
        <div className="title">{movie.title}</div>
        <div className="rating">
          {'⭐'.repeat(movie.rating)} ({movie.rating}/5)
        </div>
        {movie.releaseDate && (
          <div className="release-date">
            {new Date(movie.releaseDate).getFullYear()}
          </div>
        )}
        {showFriend && (
          <div className="friend">
            {movie.isWatching ? '🎬 Viendo ahora' : '👍 Recomendado'} por {movie.friendName}
          </div>
        )}
      </div>
    </div>
  )
}
