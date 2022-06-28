import debounce from 'lodash.debounce';
import { useCallback } from 'react';

const useDebounce = (fn, ms) => {
  return useCallback(debounce(fn, ms), []);
};

export default useDebounce;
