import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
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
    return <>Loading...</>;
  }

  const { imageUrl, title, price } = pizza;

  return (
    <div className="container">
      <img src={imageUrl} alt="" />
      <h2>{title}</h2>
      <span>{price}</span>
    </div>
  );
};

export default FullPizza;
