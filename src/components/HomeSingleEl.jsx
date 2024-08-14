import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { XCircle, HeartFill, Heart, PhoneVibrate, Trash3Fill, SendCheck, Cart } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import { APIBaseUrl } from '../config';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';

function HomeSingleEl (){
    const params = useParams();
    const [product, setProduct] = useState({});
    const [isLiked, setLiked] = useState();

    //TODO:
    //fixed liked button

    const getProduct = async()=>{
        try{
            const res= await fetch(`${APIBaseUrl}/products/${params.id}`)
            const data= await res.json()
            setProduct(data);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
      getProduct();
    },[]);

    return(
      <div className='productCard dark:text-white dark:bg-black' id='card'>
      <Card style={{ width: '18rem', border:"1.5px solid white", boxShadow:"1px 2px 3px 2px black" }} className=' dark:text-white dark:bg-black'>
      <div className='divHearts'>
          <div>
          {
               isLiked ? <Heart className='likedBtn' color='red'/>
               : <HeartFill className='likedBtn' color='red'/>
            }
          </div>
          <div>
            <Trash3Fill className='removeBtn'/>
          </div>
      </div>
        {
            product.imgSrc?
            (
                <Card.Img variant="top" src={product.imgSrc}/>
            ):
            (
                <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi7Z6nS0paslUx7X-rSOyNqmhge_ugyoMcFA&usqp=CAU"/>
            )
        }
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          For Details Call
           052-8612326 <PhoneVibrate/>
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className=' dark:text-white dark:bg-black'> {product.price} $</ListGroup.Item>
        <ListGroup.Item className=' dark:text-white dark:bg-black'>category</ListGroup.Item>
      </ListGroup>
      <Card.Body>
          <button type="button" className="btn btn-outline-danger">
             Add To Card <Cart/></button>
      </Card.Body>
    </Card>
     </div>
   )
}

export default HomeSingleEl;