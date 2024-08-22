import Card from "@/components/send/Card";
import PulsingCircles from "@/components/send/PulsingCircles";
import OrbitLines from "@/components/send/OrbitLines";
import { Container } from "@mui/material";
import css from "./styles.module.css";

const Packet = (props: any) => {
  return (
    <Container className={css.container}>
      <div className={css.spot3} />
      <div className={css.animationContainer}>
        <Card {...props} />
        <OrbitLines />
        <PulsingCircles />
      </div>
    </Container>
  );
};

export default Packet;
