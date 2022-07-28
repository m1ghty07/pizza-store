import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import MainLayout from './layouts/MainLayout';
import { Spinner } from './components';

const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPage" */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<Spinner />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<Spinner />}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
