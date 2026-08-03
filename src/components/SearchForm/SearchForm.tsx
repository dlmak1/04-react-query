import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "react-hot-toast";
import css from "./SearchForm.module.css";

interface SearchFormProps {
  onSubmit: (value: string) => void;
}

const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const [query, setQuery] = useState("");

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(trimmedQuery);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
            value={query}
            onChange={handleInput}
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchForm;
