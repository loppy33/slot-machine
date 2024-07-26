export interface IProps {
  index: number
  delay?: number
  targetId?: number
  setResult: (value: boolean, slot: number) => void
  requiredTarget: boolean
}

export interface ISelected {
  [key: number]: boolean
}
