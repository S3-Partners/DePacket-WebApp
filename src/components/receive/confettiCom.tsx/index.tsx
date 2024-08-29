import { ReactElement, useEffect } from 'react'
import Confetti from 'react-confetti-boom'

interface ConfettiComProps {
  openBoom: boolean
  setOpenBoom: (value: boolean) => void
}

const ConfettiCom = ({ openBoom, setOpenBoom }: ConfettiComProps): ReactElement => {
  useEffect(() => {
    if (openBoom) {
      const timer = setTimeout(() => {
        setOpenBoom(false)
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [openBoom, setOpenBoom])
  return (
    <>
      {openBoom && (
        <Confetti
          mode={'boom'}
          x={0.4}
          y={0.1}
          particleCount={100}
          deg={270}
          shapeSize={8}
          spreadDeg={45}
          effectInterval={1000}
          effectCount={2}
          colors={['#ff577f', '#ff884b', '#ffd384', '#fff9b0', '#3498db']}
        />
      )}
    </>
  )
}

export default ConfettiCom
