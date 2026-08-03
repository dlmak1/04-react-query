import type { Movie } from "../../types/movie";
import css from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
}

const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }: MovieCardProps) => {
  const poster = movie.poster_path
    ? `${posterBaseUrl}${movie.poster_path}`
    : undefined;

  return (
    <article className={css.card}>
      <div className={css.posterWrapper}>
        {poster ? (
          <img className={css.poster} src={poster} alt={movie.title} />
        ) : (
          <div className={css.noPoster}>No image</div>
        )}
      </div>
      <div className={css.content}>
        <h2 className={css.title}>{movie.title}</h2>
        <p className={css.meta}>
          {movie.release_date || "Unknown release date"}
        </p>
        <p className={css.overview}>
          {movie.overview || "No description available."}
        </p>
        <span className={css.rating}>{movie.vote_average.toFixed(1)}</span>
      </div>
    </article>
  );
};

export default MovieCard;
