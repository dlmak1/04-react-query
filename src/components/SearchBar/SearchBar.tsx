import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleAction = (formData: FormData) => {
    const query = (formData.get('query') as string | null)?.trim() ?? '';

    if (!query) {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(query);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAction(new FormData(event.currentTarget));
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
        <form className={css.form} action={handleAction as unknown as string} onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
