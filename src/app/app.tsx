import { SlotMachine } from "../ui/slot-machine"
import { SpinProvider } from "./spin.provider"

export const App = () => {
  const onSuccess = () => {
    console.log("success")
  }

  return (
    <SpinProvider>
      <SlotMachine onSuccess={onSuccess} />
    </SpinProvider>
  )
}
