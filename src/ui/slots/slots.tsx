import clsx from 'clsx';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SpinContext } from '../../app/spin.provider';
import pics from '../../pics.json';
import { Slot } from '../slot';
import styles from './slots.module.sass';
import { SpinButton } from '../spin-button';
import { FaStar } from 'react-icons/fa6';
import { Bulbs } from '../blubs';
import { Dice } from '../dice';

interface SlotResult {
  [key: number]: boolean;
}

export const Slots = () => {
  const { isSpin, isSuccess, setIsSuccess } = useContext(SpinContext);
  const [reloadKey, setReloadKey] = useState<number>(1);
  const [slotsResult, setSlotsResult] = useState<SlotResult>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const countPicsInJson = Object.keys(pics).length;
  const fruits = Array.from({ length: countPicsInJson }, (_, index) => `./img/pic/${index + 1}.png`);
  const [targetId, setTargetId] = useState<number | undefined>();
  const [targetText, setTargetText] = useState<string | undefined>();
  const [requiredTarget, setRequiredTarget] = useState<number | undefined>();
  const [blink, setBlink] = useState<boolean>(false);

  const [distance, setDistance] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1.5); // Увеличена скорость для более заметного эффекта

  const cardsRef = useRef<HTMLDivElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  const start = () => {
    const id = String(
      Math.floor(Math.random() * countPicsInJson) + 1,
    ) as keyof typeof pics;
    setTargetId(Number(id));
    setTargetText(pics[id]);
    setRequiredTarget(Math.floor(Math.random() * 5) + 1);
  };

  const reload = () => {
    setReloadKey((prevState) => prevState + 1);
    start();
  };

  const setResult = useCallback((value: boolean, slot: number) => {
    setSlotsResult((prevState) => ({
      ...prevState,
      [slot]: value,
    }));
  }, []);

  useEffect(() => {
    if (
      slotsResult[1] &&
      slotsResult[2] &&
      slotsResult[3] &&
      slotsResult[4] &&
      slotsResult[5]
    ) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  }, [slotsResult]);

  useEffect(() => {
    if (isSpin) {
      reload();
    }
  }, [isSpin]);

  useEffect(() => {
    if (isSpin || isSuccess) {
      setBlink(true);
    } else {
      setBlink(false);
    }
  }, [isSpin, isSuccess]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (cardsRef.current && bannerRef.current) {
        const cardElements = cardsRef.current.children;
        const cardWidth = (cardElements[0] as HTMLElement).offsetWidth;
        console.log(cardWidth);

        const containerWidth = bannerRef.current.offsetWidth

        setDistance((prevDistance) => {
          const newDistance = prevDistance - speed;

          if (Math.abs(newDistance) >= containerWidth - ( 2 / cardElements.length)) {
            return 0;
          }
          return newDistance;
        });
      }
    }, 16);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className={clsx(styles.wrapper, { 'pointer-events-none': isSuccess })}>
      <div className={styles.messageBox}>
        <div className={styles.message}>
          <FaStar />
          Slot Machine
          <FaStar />
        </div>
      </div>
      <div className={styles.decor}>
        <div ref={bannerRef} id="banner" className={styles.banner}>
          <div
            id="cards"
            ref={cardsRef}
            className={styles.fruits}
            style={{ transform: `translateX(${distance}px)`, whiteSpace: 'nowrap' }}
          >
            {fruits.concat(fruits).map((fruit, index) => (
              <img key={index} src={fruit} alt={`Fruit ${index}`} />
            ))}
          </div>
        </div>
      </div>
      <div>
      </div>
      <div className={styles.machine}>
        <Bulbs blink={blink} />
        <div className={styles.slots}>
          <Slot
            index={1}
            key={`slot1_${reloadKey}`}
            targetId={targetId}
            setResult={setResult}
            requiredTarget={requiredTarget === 1}
          />
          <Slot
            index={2}
            delay={0.5}
            key={`slot2_${reloadKey}`}
            targetId={targetId}
            setResult={setResult}
            requiredTarget={requiredTarget === 2}
          />
          <Slot
            index={3}
            delay={1}
            key={`slot3_${reloadKey}`}
            targetId={targetId}
            setResult={setResult}
            requiredTarget={requiredTarget === 3}
          />
          <Slot
            index={4}
            delay={1.5}
            key={`slot4_${reloadKey}`}
            targetId={targetId}
            setResult={setResult}
            requiredTarget={requiredTarget === 4}
          />
          <Slot
            index={5}
            delay={2}
            key={`slot5_${reloadKey}`}
            targetId={targetId}
            setResult={setResult}
            requiredTarget={requiredTarget === 5}
          />
        </div>
        <SpinButton targetText={targetText} />
        <div>
          <div className={styles.decorContainer}>
            <Dice />
            <div className={styles.decor}>
              <p>Spin and Win!</p>
              <div className={styles.hole}></div>
            </div>
            <Dice />
          </div>
        </div>
      </div>
    </div>
  );
};
