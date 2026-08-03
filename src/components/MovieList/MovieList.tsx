import type { Movie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";
import css from "./MovieList.module.css";

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => (
  <section className={css.list}>
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </section>
);

export default MovieList;
