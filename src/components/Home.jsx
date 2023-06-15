import React from 'react'
import  {CssBaseline,Typography,Button, Card, CardContent, CardActions, CardMedia,Grid} from '@mui/material'
import { Container} from '@mui/system'
import { makeStyles } from 'tss-react/mui';
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux';

export const images=['https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1683556878/Croma%20Assets/Computers%20Peripherals/Laptop/Images/256605_0_afdyno.png/mxw_640,f_auto',
                     'https://www.jiomart.com/images/product/420x420/493177768/apple-iphone-14-plus-128-gb-purple-digital-o493177768-p593689593-0-202209091941.jpeg'            
                    ]

const useStyles = makeStyles()((theme) => {
  return {
    card: {
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'column',
      maxWidth:345,
      height:450,
      display:'flex'
    },

    media:{
      height: 200,     
      width: 200
    }
  };
});

const ProductCard = ({name,id,price,handler,imgSrc}) =>{

  const {classes} = useStyles()

  return(
    <Card className={classes.card} variant='outlined'>
      <CardMedia className = {classes.media} component="img" image={imgSrc}/>
      <CardContent>
          <Typography>{name}</Typography>
          <Typography>${price}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={()=>handler({name,price,id,quantity:1,imgSrc})}>Add to cart</Button>
      </CardActions>
   </Card>
  )
}

const Home = () => {

  const dispatch = useDispatch()

  const productList = [
    {name:'Mac Book Pro',price:12000,imgSrc:images[0],id:'1'},
    {name:'Apple iPhone14',price:10000,imgSrc:images[1],id:'2'},
  ]

  const addtoCartHandler = (options)=>{
    console.log(options)
    dispatch({type:"addToCart",payload:options})
    dispatch({type:'calculateprice'})
    toast.success('Added to cart')
  }

  return (

    <div>
          <CssBaseline/>
          <Container maxWidth='sm'sx={{mt:12,mb:4}} >
                  <Typography variant='h2' color='black' align='center'>Welcome to Shoppers</Typography>
                  <Typography variant='body1' color='gray' sx={{marginTop:'20px'}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, quas similique. Inventore, obcaecati fugiat ad veniam earum non ipsam! Culpa.</Typography>
          </Container>

          <Grid 
            container
            justifyContent="center"
            spacing={3}>
            {
              productList.map((i)=>(
                <Grid item xs={3}>
                <ProductCard 
                  key={i.id} 
                  imgSrc={i.imgSrc}
                  name={i.name}
                  price={i.price}
                  id={i.id}
                  handler={addtoCartHandler}
                  />
                </Grid>
              ))
            }
          </Grid>
          
    </div>
  )
}

export default Home