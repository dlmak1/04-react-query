import type { Movie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";
import css from "./MovieList.module.css";

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => (
  <ul className={css.grid}>
    {movies.map((movie) => (
      <li key={movie.id}>
        <MovieCard movie={movie} />
      </li>
    ))}
  </ul>
);

export default MovieList;
