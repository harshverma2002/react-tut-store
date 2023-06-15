import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
    {
        cartItems:[],
        subTotal:0,
        shipping:0,
        tax:0,
        total:0,
    },
    {
        addToCart:(state,action)=>{
            const item = action.payload
            const isItemExist = state.cartItems.find(i=>i.id===item.id)
            //console.log(isItemExist)

            if(isItemExist){
                state.cartItems.forEach((i)=>{
                    if(i.id === item.id) i.quantity +=1
                })
            }
            else{
                state.cartItems.push(item)
            }
        },

        decrement:(state,action)=>{
            const item = state.cartItems.find(i=>i.id===action.payload)   
            //console.log(item.quantity)
            if(item.quantity>1){
                state.cartItems.forEach((i)=>{
                    if(i.id===item.id) i.quantity-=1
                })
            }
        },

        delete:(state,action)=>{
            state.cartItems=state.cartItems.filter(i=>i.id !== action.payload)
        },

        calculateprice:(state)=>{
            let sum=0;
            state.cartItems.forEach((i)=>{
                sum+=i.price*i.quantity
            })
            state.subTotal=sum
            state.shipping=sum>50000 ? 0 : 500
            state.tax = +(sum*0.1).toFixed()
            state.total=state.subTotal+state.shipping+state.tax
        }
    });