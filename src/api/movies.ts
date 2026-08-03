import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY?.trim();
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN?.trim();

export const fetchMovies = async (
  query: string,
  page: number,
): Promise<MoviesResponse> => {
  if (!API_KEY && !API_TOKEN) {
    throw new Error(
      "Missing VITE_TMDB_API_KEY or VITE_TMDB_TOKEN environment variable",
    );
  }

  const config = {
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    } as Record<string, string | number | boolean>,
    headers: {} as Record<string, string>,
  };

  if (API_KEY) {
    config.params.api_key = API_KEY;
  } else {
    config.headers.Authorization = `Bearer ${API_TOKEN}`;
  }

  const response = await axios.get<MoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    config,
  );

  return response.data;
};
