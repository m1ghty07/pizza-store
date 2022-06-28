import React, { useRef, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useDebounce((str: string) => dispatch(setSearchValue(str)), 500);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onClearClick = () => {
    dispatch(setSearchValue(''));
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <input ref={inputRef} value={query} onChange={onInputChange} placeholder="Поиск пиццы..." />
      {query && <span onClick={() => onClearClick()}>x</span>}
    </div>
  );
};

export default Search;
