import { useState, type FormEvent, type ComponentType } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import { fetchMovies } from "../../api/movies";
import type { MoviesResponse } from "../../types/movie";
import SearchForm from "../SearchForm/SearchForm";
import MovieList from "../MovieList/MovieList";
import css from "./App.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isFetching, isLoading, isError, error } = useQuery<
    MoviesResponse,
    Error,
    MoviesResponse
  >({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) {
      return;
    }
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const movies = (data as MoviesResponse | undefined)?.results ?? []
  const totalPages = (data as MoviesResponse | undefined)?.total_pages ?? 0

  return (
    <main className={css.app}>
      <div className={css.header}>
        <div>
          <h1 className={css.title}>Movie Search</h1>
          <p className={css.subtitle}>
            Search TMDB and browse paginated results.
          </p>
        </div>
        <SearchForm
          query={query}
          onQueryChange={setQuery}
          onSubmit={handleSearchSubmit}
        />
      </div>

      {isLoading && <p className={css.message}>Loading movies…</p>}
      {isError && (
        <p className={css.error}>{error?.message ?? "Something went wrong"}</p>
      )}
      {!isLoading && !isError && query.trim().length === 0 && (
        <p className={css.message}>
          Enter a movie title and press Search to begin.
        </p>
      )}
      {!isLoading &&
        !isError &&
        query.trim().length > 0 &&
        movies.length === 0 && (
          <p className={css.message}>No movies found for your query.</p>
        )}

      {!isLoading && !isError && movies.length > 0 && (
        <>
          <MovieList movies={movies} />
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}

      {isFetching && !isLoading && (
        <p className={css.fetching}>Refreshing results…</p>
      )}
    </main>
  );
};

export default App;
