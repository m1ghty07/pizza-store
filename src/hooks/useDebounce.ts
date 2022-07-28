import debounce from 'lodash.debounce';
import { useCallback } from 'react';

type CBType = (...args: any[]) => any;

const useDebounce = (fn: CBType, ms: number) => {
  return useCallback(debounce(fn, ms), []);
};

export default useDebounce;
