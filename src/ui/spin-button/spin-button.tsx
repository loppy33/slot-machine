import gsap from "gsap"
import { forwardRef, useContext, useImperativeHandle, useState } from "react"
import { ReactSVG } from "react-svg"
import { SpinContext } from "../../app/spin.provider"
import styles from "./spin-button.module.sass"
import { SpinButtonProps } from "./spin-button.types"

export const SpinButton = forwardRef(({ targetText }: SpinButtonProps, ref) => {
  const { isSpin, setIsSpin, isSuccess } = useContext(SpinContext)

  useImperativeHandle(ref, () => ({
    move,
  }))

  const move = () => {
    console.log(123);
    
    if (isSpin || isSuccess) {
      return
    }
    setIsSpin(true)
    
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.messageBox}>
        <div className={styles.message}>
          {isSuccess ? (
            <div className={styles.white}>Проверка пройдена успешно</div>
          ) : (
            targetText && (
              <>
                <div className={styles.blue}>Выберите</div>
                <div className={styles.white}>{targetText}</div>
              </>
            )
          )}
        </div>
      </div>
      <button onClick={move} className={styles.buttonPushable} role="button">
        <span className={styles.buttonShadow}></span>
        <span className={styles.buttonEdge}></span>
        <span className={styles.buttonFront}>
          SPIN
        </span>
      </button>
    </div>
  )
})
