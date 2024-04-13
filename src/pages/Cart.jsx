import {React,  useState, useEffect, useContext } from 'react'
import { APIBaseUrl } from '../config/index';
import CartCard from '../components/CartCard';
import { UserContext } from '../context/User';

export default function Cart() {
    const { user, SingOutClick, token, cartCount, getCarts, setCart, loading, cart}=useContext(UserContext);

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
            getCarts();
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
