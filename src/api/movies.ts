import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY?.trim() ??
  import.meta.env.VITE_TMDB_TOKEN?.trim();

export const fetchMovies = async (
  query: string,
  page: number,
): Promise<MoviesResponse> => {
  if (!API_KEY) {
    throw new Error(
      "Missing VITE_TMDB_API_KEY or VITE_TMDB_TOKEN environment variable",
    );
  }

  const response = await axios.get<MoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        api_key: API_KEY,
        query,
        page,
        include_adult: false,
        language: "en-US",
      },
    },
  );

  return response.data;
};
