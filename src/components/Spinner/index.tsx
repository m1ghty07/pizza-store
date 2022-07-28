import React from 'react';
import styles from './Spinner.module.scss';

export const Spinner: React.FC = () => {
  return (
    <div className={styles.root}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="350px"
        height="350px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid">
        <circle
          cx="50"
          cy="50"
          r="32"
          stroke-width="8"
          stroke="#28c3d4"
          stroke-dasharray="50.26548245743669 50.26548245743669"
          fill="none"
          stroke-linecap="round">
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;1"
            values="0 50 50;360 50 50"></animateTransform>
        </circle>
      </svg>
    </div>
  );
};
