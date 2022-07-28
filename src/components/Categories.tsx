import React, { memo } from 'react';

type CategoriesProps = {
  value: number;
  onCategoryChange: (index: number) => void;
};

export const Categories: React.FC<CategoriesProps> = memo(({ value, onCategoryChange }) => {
  const categories = ['All', 'Meet', 'Vegan', 'Grill', 'Spicy', 'Сlosed'];

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
});
