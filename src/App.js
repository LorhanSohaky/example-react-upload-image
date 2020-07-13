import React, { useState, useRef } from 'react'
import { Container, AppBar, Toolbar, IconButton, Typography, Box, LinearProgress, GridList, Fab, makeStyles, GridListTile } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import ArrowBack from '@material-ui/icons/ArrowBack'
import AddIcon from '@material-ui/icons/Add'

import { stopWatch, base64ToImage } from './utils'
import readFile from './lib/readFile'
import compressImageAndAutoResize from './lib/compressImage'
import Carousel from './components/Carousel'
import autoRotate from './lib/autoRotate'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

function App () {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [showCarousel, setShowCarousel] = useState(false)
  const inputRef = useRef()

  const classes = useStyles()

  function handleAddImage () {
    inputRef.current && inputRef.current.click()
  }

  async function handleImage (event) {
    setLoading(true)
    const files = event.target.files

    const stopwatch = stopWatch()
    stopwatch.start()
    let sizeBefore = 0
    let sizeAfter = 0

    try {
      for (let i = 0; i < files.length; i++) {
        const encodedImage = await readFile(files.item(i))
        sizeBefore += encodedImage.length
        const compressedImage = await (base64ToImage(encodedImage).then(autoRotate).then(compressImageAndAutoResize))
        sizeAfter += compressedImage.length

        setImages(prevState => [...prevState, compressedImage])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)

      stopwatch.stop()
      const interval = stopwatch.computeInterval('minutes')

      console.log(`${files.length} - files (Before ${(sizeBefore / 1000000).toFixed(2)} MB)`)
      console.log(`${files.length} - files (${(sizeAfter / 1000000).toFixed(2)} MB)`)
      console.log(`Processed in ${interval.toFixed(2)} min`)
    }
  }

  function renderGrid () {
    return <>
      <GridList
        cellHeight={160}
        cols={3}
        spacing={8}
      >
        {images.map((image, index) => <GridListTile key={index} onClick={() => setShowCarousel(true)}><img src={image} alt={`${index}`} /></GridListTile>)}
      </GridList>
      <Fab color='primary' aria-label='add' className={classes.fab} onClick={handleAddImage}>
        <AddIcon />
      </Fab>
    </>
  }

  function renderCarousel () {
    return <Carousel images={images}/>
  }

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <IconButton edge='start' color='inherit' aria-label='menu' onClick={() => showCarousel && setShowCarousel(false)}>
            {showCarousel ? <ArrowBack/> : <MenuIcon />}
          </IconButton>
          <Typography variant='h6' color='inherit'>
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
      <LinearProgress value={0} valueBuffer={0} style={loading ? 'visibility: visible' : 'visibility: hidden'}/>
      <Container>
        {showCarousel ? renderCarousel() : renderGrid()}
      </Container>
      <input ref={inputRef} type='file' accept='image/png, image/jpeg' style={'display:none'} onChange={handleImage} multiple />
    </Box>
  )
}

export default App
