import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  ImageListItem,
  CardActionArea,
  CardMedia,
  Stack,
} from '@mui/material'
import styles from './styles.module.css'
import { IMG_ARRAY, ONLY_ONE } from '@/config/constants'
import OpenButton from '../openButton.tsx'
import { useState } from 'react'
import ConfettiCom from '../confettiCom.tsx'
import MyCard from '@/components/common/RedPacket/Card'
const Layout = () => {
  const [openBoom, setOpenBoom] = useState(false)

  const openSuccess = () => {
    setOpenBoom(true)
  }
  return (
    <>
      <Container className={styles.container}>
        <ConfettiCom openBoom={openBoom} setOpenBoom={setOpenBoom} />
        <Grid container spacing={4}>
          {/* this one */}
          <Grid item xs={12} sm={6} md={4} key="special-card">
            <Card className={styles.card}>
              <CardContent>
                <Stack spacing={2}>
                  <MyCard {...ONLY_ONE} />
                  <OpenButton openSuccess={openSuccess} />
                </Stack>
              </CardContent>
            </Card>
            {/* </CardActionArea> */}
          </Grid>

          {IMG_ARRAY.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className={styles.card}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    redPacket {index + 1}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is a simple card description.
                  </Typography>

                  {/* <ImageListItem key={item.id}>
                  <img src={`${item.url}`} alt={item.alt || ''} />
                </ImageListItem> */}
                  {/* <Packet /> */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Layout
