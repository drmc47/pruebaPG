import React from 'react'
import style from '../Home/Home.module.css'
import CollectionHome from '../collectionhome/collectionhome.jsx'
import ImageSlider from '../slider/slider'
import Grid from '@material-ui/core/Grid'

export default function Home() {
  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <div className={style.title}>
          <h1>Explore The NFTs Universe</h1>
        </div>
        <CollectionHome />
      </Grid>
      <ImageSlider />
    </React.Fragment>
  )
}
