import { useState, type ComponentType } from "react";
import { Toaster } from "react-hot-toast";
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
  const apiKey =
    import.meta.env.VITE_TMDB_API_KEY?.trim() ??
    import.meta.env.VITE_TMDB_TOKEN?.trim();
  const hasApiKey = Boolean(apiKey);
  const shouldFetch = hasApiKey && query.trim().length > 0;

  const { data, isFetching, isLoading, isError, error } = useQuery<
    MoviesResponse,
    Error,
    MoviesResponse
  >({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: shouldFetch,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const handleSearchSubmit = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  return (
    <main className={css.app}>
      <SearchForm onSubmit={handleSearchSubmit} />
      <Toaster position="top-center" reverseOrder={false} />

      {isLoading && <p className={css.message}>Loading movies…</p>}
      {isError && (
        <p className={css.error}>{error?.message ?? "Something went wrong"}</p>
      )}
      {!hasApiKey && (
        <p className={css.error}>
          Missing VITE_TMDB_API_KEY environment variable. Add it to a local
          <code className={css.code}>.env</code> file or configure it in Vercel.
        </p>
      )}
      {hasApiKey && !isLoading && !isError && query.trim().length === 0 && (
        <p className={css.message}>
          Enter a movie title and press Search to begin.
        </p>
      )}
      {hasApiKey && !isLoading && !isError && query.trim().length > 0 && movies.length === 0 && (
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
