import React, { useState } from 'react';
import { Container, AppBar, Toolbar, IconButton, Typography, Box, LinearProgress, GridList, Fab, makeStyles, GridListTile } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));

function App() {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])

  const classes = useStyles();

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' color='inherit'>
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
      {loading && <LinearProgress />}
      <Container>
        <GridList
          cellHeight={160}
          cols={3}
          spacing={8}
        >
         {images.map((image,index)=> <GridListTile key={index}><img src={image} alt={`${index}`} /></GridListTile>)} 
        </GridList>
        <Fab color='primary' aria-label='add' className={classes.fab}>
          <AddIcon />
        </Fab>
      </Container>
    </Box>
  )
}

export default App;
