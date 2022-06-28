import React from 'react';

import styles from './NotFound.module.scss';

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <h1>Страница не найдена</h1>
      <p>Вернитесь на главную страницу и попробуйте снова</p>
    </div>
  );
};
