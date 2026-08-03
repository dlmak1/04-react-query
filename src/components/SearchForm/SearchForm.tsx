import type { ChangeEvent, FormEvent } from "react";
import css from "./SearchForm.module.css";

interface SearchFormProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const SearchForm = ({ query, onQueryChange, onSubmit }: SearchFormProps) => {
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  return (
    <form className={css.form} onSubmit={onSubmit}>
      <label className={css.label} htmlFor="movie-search">
        Search movies
      </label>
      <div className={css.fieldGroup}>
        <input
          id="movie-search"
          className={css.input}
          type="text"
          placeholder="Type a movie title"
          value={query}
          onChange={handleInput}
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
