import { useContext, useEffect, useRef } from "react"
import { SpinContext } from "../../app/spin.provider"
import { Slots } from "../slots"
import { Stick } from "../stick"
import styles from "./slot-machine.module.sass"
import { IProps, IStickRef } from "./slot-machine.types"

export const SlotMachine = ({ onSuccess }: IProps) => {
  const stickRef = useRef<IStickRef>(null)
  const { isSuccess } = useContext(SpinContext)

  useEffect(() => {
    if (stickRef) {
      stickRef.current?.move()
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      onSuccess()
    }
  }, [isSuccess])

  return (
    <div className={styles.wrapper}>
      <Slots />
      <Stick  ref={stickRef} />
    </div>
  )
}
