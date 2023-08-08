import css from './Searchbar.module.css';
import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

export const Searchbar = ({ onPropSubmit }) => {
  // state = {
  //   imageTags: '',
  // };

  const [imageTags, setImageTags] = useState('');

  const handleTagChange = evt => {
    // this.setState({ imageTags: evt.currentTarget.value.toLowerCase() });
    setImageTags(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (imageTags.trim() === '') {
      return;
    }
    onPropSubmit(imageTags);

    // this.setState({ imageTags: '' });
    setImageTags('');
  };

  // const onSubmit = this.props.onSubmit;
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button
          type="submit"
          className={css.SearchFormButton}
          // onClick={onPropSubmit}
        >
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
