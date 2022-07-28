import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import qs from 'qs';

import { setCategory, setFilters, setCurrentPage } from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';
import { pizzaDataSelector } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncAction';
import { filterSelector } from '../redux/filter/selectors';

import {
  Error,
  NotFoundBlock,
  Categories,
  Pagination,
  PizzaBlock,
  Skeleton,
  Sort,
} from '../components';

import { sortList } from '../components/Sort';

export const Home: React.FC = () => {
  const { category, sort, currentPage, searchValue } = useSelector(filterSelector);
  const { items, status } = useSelector(pizzaDataSelector);

  const navigate = useNavigate();
  const isMounted = useRef(false);
  const isSearch = useRef(false);
  const dispatch = useAppDispatch();

  const onCategoryChange = useCallback((id: number) => {
    dispatch(setCategory(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const categoryId = category > 0 ? String(category) : '';
    const searchQuery = searchValue ? searchValue : '';
    const sortParams = sort.sort;

    dispatch(
      fetchPizzas({
        categoryId,
        searchQuery,
        sortParams,
        currentPage: String(currentPage),
      }),
    );
  };

  // parse parametrs from query string

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sort === params.sort);

      dispatch(
        setFilters({
          category: Number(params.category),
          sort: sort || sortList[0],
          currentPage: Number(params.currentPage),
          searchValue: '',
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // set query parametrs
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sort,
        category,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [category, sort.sort, currentPage]);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [category, sort.sort, currentPage]);

  const pizzas = items
    .filter((obj: any) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((pizza: any, index) => <PizzaBlock {...pizza} key={index} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={category} onCategoryChange={onCategoryChange} />
          <Sort value={sort} />
        </div>
        <h2 className="content__title">All products</h2>
        {status === 'error' ? <Error /> : null}

        {status === 'loading' ? (
          <div className="content__items">{skeletons}</div>
        ) : pizzas.length ? (
          <div className="content__items"> {pizzas} </div>
        ) : (
          <NotFoundBlock />
        )}

        {pizzas.length ? <Pagination currentPage={currentPage} onChangePage={onChangePage} /> : ''}
      </div>
    </>
  );
};
