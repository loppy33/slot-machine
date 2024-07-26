import React from 'react';
import styles from './dice.module.sass';

export const Dice: React.FC = () => {
  return (
    <div className={styles.dice}>
      <div className={`${styles.side} ${styles.one}`}></div>
      <div className={`${styles.side} ${styles.two}`}></div>
      <div className={`${styles.side} ${styles.three}`}></div>
      <div className={`${styles.side} ${styles.four}`}></div>
      <div className={`${styles.side} ${styles.five}`}></div>
      <div className={`${styles.side} ${styles.six}`}></div>
    </div>
  );
};
