import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../assets/img/empty-cart.png';

export const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Your cart is empty <span>😕</span>
        </h2>
        <p>
          You probably haven't ordered pizza yet.
          <br />
          Go to main page for make online order.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Go back</span>
        </Link>
      </div>
    </>
  );
};
