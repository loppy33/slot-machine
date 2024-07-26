import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react"

interface Context {
  isSpin: boolean
  setIsSpin: Dispatch<SetStateAction<boolean>>
  isSuccess: boolean
  setIsSuccess: Dispatch<SetStateAction<boolean>>
}

export const SpinContext = createContext<Context>({
  isSpin: false,
  setIsSpin: () => {},
  isSuccess: false,
  setIsSuccess: () => {},
})

export const SpinProvider = ({ children }: PropsWithChildren) => {
  const [isSpin, setIsSpin] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  return (
    <SpinContext.Provider
      value={{ isSpin, setIsSpin, isSuccess, setIsSuccess }}
    >
      {children}
    </SpinContext.Provider>
  )
}
