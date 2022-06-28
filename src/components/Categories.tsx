import React from 'react';

type CategoriesProps = {
  value: number;
  onCategoryChange: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, onCategoryChange }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            onClick={() => onCategoryChange(index)}
            className={value === index ? 'active' : ''}
            key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
