import React from 'react'
import { Link } from 'react-router-dom'
import {FiShoppingCart} from 'react-icons/fi'
import  {CssBaseline,AppBar,Toolbar,Typography} from '@mui/material'
import { Box } from '@mui/system'
import { createTheme,ThemeProvider} from '@mui/material/styles'
import { makeStyles } from 'tss-react/mui';
import { useSelector } from 'react-redux'

const mytheme = createTheme({
  palette:{
    primary:{
      main:'#ffab00'
      }
  }
}) 

const useStyles = makeStyles()((mytheme) => {
  return {
    root: {
      color: mytheme.palette.primary,
    },
    apply: {
      marginRight: mytheme.spacing(5),
    },
  };
});

const Header = () => {

  const {cartItems} = useSelector(state=>state.cart)
  const { classes } = useStyles()

  return (
    <div>
        <CssBaseline/>
        <AppBar>
          <Toolbar>
            <ThemeProvider theme={mytheme}>
            <Typography className={classes.apply} variant='h4' sx={{mr:10}}>Shoppers</Typography>
              <Link to={'/'} style={{textDecoration:'none'}}><Typography variant='h6'color='primary'>Home</Typography></Link>
            </ThemeProvider>
            <Link to={'/cart'} style={{textDecoration:'none'}}>
              <Box display={'flex'} marginLeft={'1200px'}>
                <FiShoppingCart color='white' />
                <Typography variant='caption' color='white' sx={{pl:0.5}}>{cartItems.length}</Typography>
              </Box>
            </Link>
          </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header