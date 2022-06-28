import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Categories from '../components/Categories';
import { Pagination } from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort';
import qs from 'qs';
import {
  setCategory,
  setFilters,
  setCurrentPage,
  filterSelector,
} from '../redux/slices/filterSlice';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPizzas, pizzaDataSelector, SearchPizzaParams } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

export const Home: React.FC = () => {
  const { category, sort, currentPage, searchValue } = useSelector(filterSelector);
  const { items, status } = useSelector(pizzaDataSelector);

  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const dispatch = useAppDispatch();

  const onCategoryChange = (id: number) => {
    dispatch(setCategory(id));
  };

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

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

      const sort = sortList.find((obj) => obj.sort === params.sortParams);

      dispatch(
        setFilters({
          category: Number(params.categoryId),
          sort: sort || sortList[0],
          currentPage: Number(params.currentPage),
          searchValue: params.searchQuery,
        }),
      );
    }
    isMounted.current = true;
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sort,
        category: category > 0 ? category : null,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    if (!window.location.search) {
      dispatch(fetchPizzas({} as SearchPizzaParams));
    }
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
    .map((pizza: any) => <PizzaBlock {...pizza} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={category} onCategoryChange={onCategoryChange} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {status === 'error' ? (
            <div>
              <h2>ALARM ACHTUNG!NO PIZZAS BLYAT'!!!</h2>
            </div>
          ) : status === 'loading' ? (
            skeletons
          ) : (
            pizzas
          )}
        </div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};
