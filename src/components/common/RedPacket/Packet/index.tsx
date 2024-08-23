import Card from '@/components/common/RedPacket/Card'
import PulsingCircles from '@/components/common/RedPacket/PulsingCircles'
import OrbitLines from '@/components/common/RedPacket/OrbitLines'
import { Container } from '@mui/material'
import css from './styles.module.css'
import { WELCOME_RED_PACKET_IMG } from '@config/constants'

const Packet = () => {
  return (
    <Container className={css.container}>
      <div className={css.animationContainer}>
        <div className={css.spot3} />
        <Card {...WELCOME_RED_PACKET_IMG} />
        <OrbitLines />
        <PulsingCircles />
      </div>
    </Container>
  )
}

export default Packet
