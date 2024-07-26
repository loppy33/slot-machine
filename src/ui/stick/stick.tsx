import gsap from "gsap"
import { forwardRef, useContext, useImperativeHandle, useState } from "react"
import { ReactSVG } from "react-svg"
import { SpinContext } from "../../app/spin.provider"

import styles from './stick.module.sass'

export const Stick = forwardRef((_, ref) => {
  const [isMove, setIsMove] = useState(false)
  const { isSpin, setIsSpin, isSuccess } = useContext(SpinContext)

  useImperativeHandle(ref, () => ({
    move,
  }))

  const move = () => {
    if (isMove || isSpin || isSuccess) {
      return
    }
    setIsMove(true)
    gsap.to("#head", {
      y: 210,
      yoyo: true,
      repeat: 1,
      ease: "circ.in",
      onComplete: () => {
        setIsMove(false)
        setIsSpin(true)
      },
    })
    gsap.to("#stick", {
      y: 32,
      yoyo: true,
      repeat: 1,
      ease: "circ.in",
      scaleY: 0.3,
      transformOrigin: "50% 100%",
    })
    gsap.to("#hole", {
      y: 25,
      scaleY: 2,
      yoyo: true,
      repeat: 1,
      ease: "circ.in",
    })
  }

  return (
    <a href="#" onClick={move} className={styles.stick}>
      <ReactSVG src={"./img/stick.svg"} renumerateIRIElements={false} />
    </a>
  )
})
