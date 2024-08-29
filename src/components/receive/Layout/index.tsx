import { Container, Grid, Card, CardContent, Typography, ImageListItem } from '@mui/material'
import styles from './styles.module.css'
import Packet from '@/components/common/RedPacket/Packet'
import { IMG_ARRAY } from '@/config/constants'
import OpenButton from '../openButton.tsx'
const Layout = () => {
  const arr = [{ url: '' }]

  return (
    <Container className={styles.container}>
      <Grid container spacing={8}>
        {IMG_ARRAY.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={styles.card}>
              <CardContent>
                {/* <Typography variant="h5" component="div">
                  Card {index + 1}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This is a simple card description.
                </Typography> */}
                <OpenButton />
                <ImageListItem key={item.id}>
                  <img src={`${item.url}`} alt={item.alt || ''} />
                </ImageListItem>
                {/* <Packet /> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Layout
