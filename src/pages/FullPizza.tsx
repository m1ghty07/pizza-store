import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Spinner } from '../components';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
    description: string;
  }>();
  const { id } = useParams();

  try {
    const fetchPizza = async () => {
      const { data } = await axios.get('https://628648de96bccbf32d72a35c.mockapi.io/items/' + id);
      setPizza(data);
    };

    useEffect(() => {
      fetchPizza();
    }, []);
  } catch (error) {
    console.log(error);
  }

  if (!pizza) {
    return <Spinner />;
  }

  const { imageUrl, title, price, description } = pizza;

  return (
    <div className="container">
      <div className="full-pizza">
        <img src={imageUrl} alt="" />
        <h2>{title}</h2>
        <p>
          <span className="full-pizza__desc">{title}</span> - {description}
        </p>
        <span>
          Order now for <span className="full-pizza__price">{price} $</span>
        </span>
        <Link to="/" className="button button--black">
          <span>Go back</span>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
