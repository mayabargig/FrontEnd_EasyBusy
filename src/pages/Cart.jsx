import {React,  useState, useEffect } from 'react'
import { APIBaseUrl } from '../config/index';
import CartCard from '../components/CartCard';

export default function Cart(props) {
    const { loading, cart,setCart, getCarts } = props;

  useEffect(()=>{
    getCarts();
  },[]);

      const deleteFromCard= async(id)=>{
        console.log(id);
        try {
          const res = await fetch(`${APIBaseUrl}/cart/${id}`, {
            method:"DELETE"
          });
          if(res.status === 200){
            const filtered = cart.filter((item)=>{
              // console.log(item);
              return item.id !== id;
            });
            setCart([...filtered]);
          }
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <div>
     {loading ? (
      <h1>Loading...</h1>
    ) : cart.length > 0 ? (
      <div id="productsContainer">
        {cart.map((item, i) => (
          <CartCard 
            key={`cart_${i}`}
            item={item}
            deleteFromCard={deleteFromCard}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>
    ) : (
      <h1>No Items Added To Cart Yet...</h1>
    )}
    </div>
  )
}
