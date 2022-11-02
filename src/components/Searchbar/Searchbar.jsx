import { useState } from 'react';
import css from './Searchbar.module.css';
import { FcSearch } from 'react-icons/fc';
import { PropTypes } from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubnmit = e => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubnmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>
            <FcSearch />
          </span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          name="value"
          autoComplete="off"
          autoFocus
          value={value}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
