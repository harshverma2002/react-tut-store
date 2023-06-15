import React from "react"
import {AiFillDelete} from 'react-icons/ai'
import {Typography,Button,Card, CardContent, CardActions, CardMedia,Grid} from '@mui/material'
import {Box,Container} from '@mui/system'
import { makeStyles } from 'tss-react/mui';
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles()((theme) => {
    return {
      card: {
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        width:250,
        height:350,
        display:'flex'
      },
  
      media:{
        height: 100,     
        width: 100
      }
    };
  });

  const CartItem=({imgSrc,name,price,qty,dec,incr,del,id})=>{
    const {classes} = useStyles()

    return(
        <Card className={classes.card} variant='outlined'>
        <CardMedia className = {classes.media} component="img" image={imgSrc}/>
        <CardContent> 
            <Typography>{name}</Typography>
            <Typography>${price}</Typography>
        </CardContent>
        <CardActions>
            <Button onClick={()=> dec(id)}>-</Button>
            <Typography>{qty}</Typography>
            <Button onClick={()=> incr(id)}>+</Button>
        </CardActions>
        <AiFillDelete onClick={()=>del(id)}/>
    </Card>
    )
}


const Cart = () =>{

    const{cartItems,shipping,subTotal,tax,total} = useSelector(state=>state.cart)
    const dispatch = useDispatch()

    const incrHandler=(id)=>{
       dispatch({type:'addToCart',payload:{id},})
       dispatch({type:'calculateprice'})
    }

    const decHandler=(id)=>{
       dispatch({type:'decrement',payload:(id)})
       dispatch({type:'calculateprice'})
    }

    const delHandler=(id)=>{
       dispatch({type:'delete',payload:(id)})
       dispatch({type:'calculateprice'})
    }
    
    return (
        <div>
            <Container maxWidth='md' sx={{mt:12,mb:4,display:'flex',flexDirection:'row'}}>
                <main>
                  {
                    cartItems.length > 0 ?(
                        cartItems.map(i=>(
                            <CartItem imgSrc={i.imgSrc} name={i.name} price={i.price} qty={i.quantity} id={i.id} 
                                      incr={incrHandler} dec={decHandler} del={delHandler}/>
                        ))
                    )
                    :<Typography>no items yet</Typography>
                  }    
                </main>

                <aside>
                    <Box>
                        <Typography>Subtotal: ${subTotal}</Typography>
                        <Typography>Shipping: ${shipping}</Typography>
                        <Typography>Tax: ${tax}</Typography>
                        <Typography>Total: ${total}</Typography>
                    </Box>
                </aside>
            </Container>
        </div>
    )
}


export default Cart