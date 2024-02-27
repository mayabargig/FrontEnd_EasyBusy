import React, { useEffect, useState } from 'react'
import HomeCard from '../components/HomeCard';
import HomeSingleEl from '../components/HomeSingleEl';
import { APIBaseUrl } from '../config';
import HomeCardEdit from '../components/HomeCardEdit';
import {PlusCircleFill} from 'react-bootstrap-icons'


export default function Home() {
  const [products, setProducts]= useState([]);
  const [isClick, setClick]= useState(false);
 
  useEffect(()=>{
    getProducts();
  },[])

  const getProducts = ()=>{
    fetch(`${APIBaseUrl}/products`)
    .then(res=> res.json())
    .then(res=>{
      setProducts(res);
    })
    .catch(err=> console.log(err))
  }

  const addLink = ()=>{
    setClick(!isClick);
  };

  console.log(products);
  return (
    <div>
      {isClick?(
        <HomeCardEdit setProducts={setProducts} products={products} addLink={addLink}/>
        ):(
          <div>
            <h1>All My Products...
            </h1>
            <button onClick={addLink}type="button" class="btn btn-info">Add Product <PlusCircleFill/></button>
          <div id='productsContainer'>
      {
        products.map((item, i)=>{
          return <HomeCard item={item} key={`prod_${i}`}
          setProducts={setProducts} products={products}/>
        })
      }
      </div>
      </div>
      )}
    </div>
  )
}
