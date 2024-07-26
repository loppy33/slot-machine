import React, { useState, useEffect } from 'react';
import styles from './bulbs.module.sass';
import { IProps } from './bulbs.types';

const numberOfBulbs = 20;

export const Bulbs: React.FC<IProps> = ({ blink }) => {
  const [activeBlink, setActiveBlink] = useState<'even' | 'odd' | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (blink) {
      interval = setInterval(() => {
        setActiveBlink(prev => (prev === 'even' ? 'odd' : 'even'));
      }, 500); 
    } else {
      setActiveBlink(null); 
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [blink]);

  return (
    <div className={styles.bulbs}>
      {Array.from({ length: numberOfBulbs }).map((_, index) => (
        <span
          key={index}
          className={`${styles.bulb} ${index % 2 === 0 ? (activeBlink === 'even' ? styles.blink : '') : (activeBlink === 'odd' ? styles.blink : '')}`}
        ></span>
      ))}
    </div>
  );
};
