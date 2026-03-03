import React, { useContext, useState } from 'react'
import { ArrowLeftSquare } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import { APIBaseUrl } from '../config';
import { Input } from 'antd';
import { UserContext } from '../context/User';

export default function HomeCardEdit(props) {
  const { addLink, products, setProducts }= props;
  const { user, token }=useContext(UserContext); 
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState([]);

  
  const handleFileChange = (e) => {
      // console.log(e.target.files[0]);
      const file = e.target.files[0];
      // if (file) {
          //   const reader = new FileReader();
          //   reader.onloadend = () => {
              //     setImageUrl(reader.result);
              //   };
              //   reader.readAsDataURL(file);
              // }
              //   console.log(reader.readAsDataURL(file));
            };

   const handleInputChange = (name, value) => {
              setFormData({ ...formData, [name]: value});
          };
            
const addProducts = async ()=>{
    try{
      const res = await fetch(`${APIBaseUrl}/products`, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(formData, user)
      });
      const data= await res.json();
      setProducts([...products,data.data]);
    }
    catch(error){
      console.log(error);
    }
addLink();
};

  return (
    <div id='divHomeCardEdit'>
    <button style={{display:'flex', flexDirection:'row'}}onClick={addLink} type="button" className="btn btn-warning" id='goBTN'>Go Back <ArrowLeftSquare/></button>
      {/* <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div> */}

<div className='AddProductCard' id='card'> 
      <Card style={{ width: '18rem'}} className=' dark:text-white dark:bg-black'>
    <h4>Add New Product...</h4><br></br>
         
                {/* <Card.Img variant="top" src={}/> */}
      <ListGroup className="list-group-flush">
      <ListGroup.Item className=' dark:text-white dark:bg-black'>
      <Input placeholder='Image URL' name="imgSrc"
            onChange={(e) => handleInputChange("imgSrc", e.target.value)}
            />
        </ListGroup.Item>
      <ListGroup.Item className=' dark:text-white dark:bg-black'>
      <Input placeholder='Title' name="title"
            onChange={(e) => handleInputChange("title", e.target.value)}
            />
        </ListGroup.Item>
        <ListGroup.Item className=' dark:text-white dark:bg-black'> 
        <Input placeholder='Price' name="price"
            onChange={(e) => handleInputChange("price", e.target.value)}
            />
        </ListGroup.Item>
        <ListGroup.Item className=' dark:text-white dark:bg-black'>
        <Input placeholder='Category' name="category"
            onChange={(e) => handleInputChange("category", e.target.value)}
            />
        </ListGroup.Item>
      </ListGroup>
      <Button onClick={addProducts} variant="primary important!">Add
          </Button>
    </Card>
     </div>
    </div>
  )
}
