import css from './Searchbar.module.css';
import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

export const Searchbar = ({ onPropSubmit }) => {
  const [imageTags, setImageTags] = useState('');
  const [page, setPage] = useState(1);

  const handleTagChange = evt => {
    setImageTags(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (imageTags.trim() !== '') {
      onPropSubmit(imageTags, page);
      setPage(1);

      setImageTags('');
    }
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <ImSearch style={{ width: 25, height: 25 }} />
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageTags}
          onChange={handleTagChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onPropSubmit: PropTypes.func.isRequired,
};
