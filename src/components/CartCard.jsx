import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/User';
import { APIBaseUrl } from '../config';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { PhoneVibrate, Heart, SendCheck, Cart, Trash3Fill, HeartFill } from "react-bootstrap-icons"
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CartCard(props) {
  const { item, deleteFromCard, cart, setCart } = props;
  const [singCart, setSingCart] = useState({});
  const [cartP, setCartP] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const isFav = !cart.forEach((pro) => pro._id === item.product);
      if (isFav) {
        const { data } = await axios.get(`${APIBaseUrl}/products/${item.product}/`);
        setSingCart({ data: data, id: item._id });
      }
    } catch (error) {
      setSingCart([null])
      console.log(error);
    }
  };

  return (
    singCart.data ? (
      <div className='productCard  dark:text-white dark:bg-black' >
        {
          <Card style={{ width: '18rem', border: "1.5px solid white", boxShadow: "1px 2px 3px 2px black" }}
            className=' dark:text-white dark:bg-black'>
            <div className='divHearts'>
              <div>
              </div>
            </div>
            {
              singCart.data.imgSrc ?
                (
                  <Card.Img variant="top" src={singCart.data.imgSrc} />
                ) :
                (
                  <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi7Z6nS0paslUx7X-rSOyNqmhge_ugyoMcFA&usqp=CAU" />
                )
            }
            <Card.Body>
              <Card.Title>{singCart.data.title}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item className='  dark:text-white dark:bg-black'> {singCart.data.price} $</ListGroup.Item>
              <ListGroup.Item className='  dark:text-white dark:bg-black'>Category: {singCart.data.category}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button variant="primary">
                <Link to={`/products/${singCart.data.id}`} className="GoToLink" >
                  See More <SendCheck />
                </Link>
              </Button>
              <button onClick={() => deleteFromCard(singCart.id)} type="button" className="btn btn-danger">
                Remove <Cart /></button>
            </Card.Body>
          </Card>

        }
      </div>
    ) : null
  )
}
