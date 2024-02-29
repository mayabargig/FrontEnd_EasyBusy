import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/User';
import { APIBaseUrl } from '../config';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { PhoneVibrate, Heart, SendCheck,Cart, Trash3Fill, HeartFill} from "react-bootstrap-icons"
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CartCard(props) {
    const {item, deleteFromCard ,cart, setCart} = props;
    const [singCart, setSingCart] = useState({});
    const [cartP, setCartP] = useState([]);
    const { user } = useContext(UserContext);
    // console.log(item);

    useEffect(()=>{
        if(item.userId===user.id){
            getCart();
        }
      },[cart]);

      const getCart = async () => {
        try {
            const isFav = !cart.forEach((pro) => pro._id === item.product);
            console.log(isFav);
            if (isFav) {
            const res = await fetch(`${APIBaseUrl}/products/${item.product}/`);
            const data = await res.json();
            console.log(data);
            setSingCart({data:data, id:item._id});
            setCartP((prevFavorites) => [...prevFavorites, data, {id:item._id}]);
        }
        } catch (error) {
            setSingCart([null])
            console.log(error);
        }
    };

  return (
      (singCart.data)&&(item.userId===user.id)?(
      <div className='productCard'>
        {
                <Card style={{ width: '18rem' }}>
                <div className='divHearts'>
                    <div>
                    </div>
                    {/* <div>
                      <Trash3Fill className='removeBtn'/>
                    </div> */}
                </div>
                  {
                      singCart.data.imgSrc?
                      (
                          <Card.Img variant="top" src={singCart.data.imgSrc}/>
                      ):
                      (
                          <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi7Z6nS0paslUx7X-rSOyNqmhge_ugyoMcFA&usqp=CAU"/>
                      )
                  }
                <Card.Body>
                  <Card.Title>{singCart.data.title}</Card.Title>
                  {/* <Card.Text>
                    For Details Call
                     052-8612326 <PhoneVibrate/>
                  </Card.Text> */}
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item> {singCart.data.price} $</ListGroup.Item>
                  <ListGroup.Item>Category: {singCart.data.category}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                <Button variant="primary">
                      <Link to={`/products/${singCart.data.id}`} className="GoToLink" >
                      See More <SendCheck/>
                      </Link>
                    </Button>
                    <button onClick={()=>deleteFromCard(singCart.id)}type="button" className="btn btn-outline-danger">
            Remove <Cart/></button>
                </Card.Body>
              </Card>
                
            }
            </div>
            ):null
  )
}
