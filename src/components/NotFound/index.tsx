import React from 'react';

import styles from './NotFound.module.scss';

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <h1>Nothing found...</h1>
      <p>Try it again</p>
    </div>
  );
};
