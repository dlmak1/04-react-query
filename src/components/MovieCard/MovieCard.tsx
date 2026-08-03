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
      {poster ? (
        <img className={css.image} src={poster} alt={movie.title} />
      ) : (
        <div className={css.image} />
      )}
      <h2 className={css.title}>{movie.title}</h2>
    </article>
  );
};

export default MovieCard;
