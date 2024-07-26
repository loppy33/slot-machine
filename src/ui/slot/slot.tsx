import gsap from "gsap"
import { useContext, useEffect, useMemo, useState } from "react"
import { SpinContext } from "../../app/spin.provider"
import pics from "../../pics.json"
import styles from "./slot.module.sass"
import { IProps, ISelected } from "./slot.types"

export const Slot = ({
  index,
  delay = 0,
  targetId,
  setResult,
  requiredTarget,
}: IProps) => {
  const { isSpin, setIsSpin } = useContext(SpinContext)
  const duration = 5
  const countInTape = 20
  const countPicsInJson = Object.keys(pics).length
  const picHeight = 45
  const gap = 20
  const totalTapeHeight = (picHeight + gap) * countInTape
  const [selected, setSelected] = useState<ISelected>({
    0: false,
    1: false,
    2: false,
  })

  useEffect(() => {
    if (isSpin) {
      gsap.to(`#slot${index}`, {
        y: totalTapeHeight,
        duration,
        delay,
        ease: "circ.out",
        onComplete: () => {
          if (index === 5) {
            setIsSpin(false)
          }
        },
      })
    }
  }, [isSpin])

  const numbers = useMemo(() => {
    if (requiredTarget) {
      const numbers = [...Array(countInTape - 1).keys()].map(
        () => Math.floor(Math.random() * countPicsInJson) + 1,
      )
      numbers.unshift(targetId as number)
      return numbers
    }
    return [...Array(countInTape).keys()].map(
      () => Math.floor(Math.random() * countPicsInJson) + 1,
    )
  }, [requiredTarget, targetId])

  const clickHandle = (slot: number, number: number) => {
    setSelected({ ...selected, [slot]: !selected[slot] })
  }

  useEffect(() => {
    if (targetId) {
      const values: { [key: string]: number } = {
        0: numbers[0],
        1: numbers[1],
        2: numbers[2],
      }
      const idx = Object.keys(values).filter((key) => values[key] === targetId)

      const compareObject: { [key: number]: boolean } = {
        0: false,
        1: false,
        2: false,
      }
      idx.forEach((value) => {
        compareObject[Number(value)] = true
      })

      if (JSON.stringify(compareObject) === JSON.stringify(selected)) {
        setResult(true, index)
      } else {
        setResult(false, index)
      }
    }
  }, [numbers, targetId, selected])

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.slot}
        style={{ top: -totalTapeHeight }}
        id={`slot${index}`}
      >
        {numbers.map((number, slot) => {
          const img = selected[slot] ? (
            <img src={"./img/check.png"} alt={""} />
          ) : (
            <img src={`./img/pic/${number}.png`} alt={""} />
          )
          if (slot < 3) {
            return (
              <a
                onClick={() => clickHandle(slot, number)}
                key={`slot${index}_${slot}`}
                href={"#"}
              >
                {img}
              </a>
            )
          } else {
            return { ...img, key: `slot${index}_${slot}` }
          }
        })}
      </div>
    </div>
  )
}
