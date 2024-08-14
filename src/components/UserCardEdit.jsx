import {React, useContext, useEffect, useState} from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Facebook, Twitter, Instagram, Whatsapp,PencilSquare ,InfoCircle,GeoAlt, EnvelopeAt,Telephone} from "react-bootstrap-icons"
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import { Input } from 'antd';
import { Row, Col } from 'react-bootstrap';
import { APIBaseUrl } from '../config';

export default function UserCardEdit() {
  const { user, token, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();

  //TODO:
  //to add links to contact:facebook and more..

  const handleInputChange = (name, value) => {
    setFormData(user);
    /** @type {string[]} */
    const spreadName = name?.split('.')
    if (spreadName?.length > 1) {
        setFormData(prev => ({ ...prev, [spreadName[0]]: { ...(prev?.[spreadName[0]] || {}), [spreadName[1]]: value } }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
};

const updateUser =async ()=>{

    try {
      const res = await fetch(`${APIBaseUrl}/users/${user.id}`, {
        method:"PATCH",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
      body:JSON.stringify(formData)
      });
      const data = await res.json();
      setUser(data);
      navigate('/profile')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='dark:text-white dark:bg-black'>
      <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
    <MDBContainer className='dark:text-white dark:bg-black'>
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="6" className="mb-4 mb-lg-0">
          <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
            <MDBRow className="g-0">
              <MDBCol md="4" className="gradient-custom text-center text-white"
                style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    <div> 
                        {(
                            (user.gender === "female")?(
                                <MDBCardImage 
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                alt="Avatar" className="my-5"
                                style={{ width: '80px' }} fluid />
                            ):(
                                <MDBCardImage
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                alt="avatar" className="rounded-circle"
                                style={{ width: '80px' }}
                                fluid />
                            )
                        )
                        }
                    </div>
                <MDBTypography tag="h5">
                  <Row>
                  <Col>
                  <Input defaultValue={user.firstName} placeholder={user.firstName}
                   name="firstName" onChange={(e) => handleInputChange("firstName", e.target.value)}/>
                    </Col>
                    <Col>
                    <Input defaultValue={user.lastName} placeholder={user.lastName}
                   name="lastName" onChange={(e) => handleInputChange("lastName", e.target.value)}/>
                    </Col>
                  </Row>
                </MDBTypography>
                <MDBCardText>
                <Input defaultValue={user.job} placeholder={user.job} name="job"
                  onChange={(e) => handleInputChange("job", e.target.value)}/>
                </MDBCardText>
                <MDBIcon far icon="edit mb-5" />
              </MDBCol>
              <MDBCol md="8">
              <div className='dark:text-white dark:bg-black'>
                <MDBCardBody className="p-4">
                  <MDBTypography tag="h6">Contact Information <InfoCircle/></MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6"> <EnvelopeAt/> Email</MDBTypography>
                      <MDBCardText className="text-muted">
                      <Input defaultValue={user.email} placeholder={user.email} name="email"
                  onChange={(e) => handleInputChange("email", e.target.value)}/>
                       </MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6"> <Telephone/> Phone</MDBTypography>
                      <MDBCardText className="text-muted">
                      <Input defaultValue={user.telephone} placeholder={user.telephone} name="telephone"
                  onChange={(e) => handleInputChange("telephone", e.target.value)}/>
                         </MDBCardText>
                    </MDBCol>
                  </MDBRow>

                  <MDBTypography tag="h6">Location <GeoAlt/></MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">
                      <MDBTypography tag="h6">
                        <Row>
                          <Col>
                          <Input defaultValue={user.address.country} placeholder={user.address.country} name="address.country"
                          onChange={(e) => handleInputChange("address.country", e.target.value)}/>
                          </Col> ,
                          <Col>
                          <Input  defaultValue={user.address.city} placeholder={user.address.city} name="address.city"
                          onChange={(e) => handleInputChange("address.city", e.target.value)}/>
                          </Col>
                        </Row>
                      </MDBTypography>
                      <MDBCardText className="text-muted">
                      <Row>
                          <Col>
                          <Input defaultValue={user.address.street} placeholder={user.address.street} name="address.street"
                          onChange={(e) => handleInputChange("address.street", e.target.value)}/>
                          </Col> \
                          <Col>
                          <Input defaultValue={user.address.apartment} placeholder={user.address.apartment} name="address.apartment"
                          onChange={(e) => handleInputChange("address.apartment", e.target.value)}/>
                          </Col>
                        </Row>
                        </MDBCardText>
                  </MDBRow><br></br>

                  <div className='divIcons'>
                  <a className="dark:text-white" href="#!"><Facebook /></a>
                    <a className="dark:text-white" href="#!"><Twitter /></a>
                    <a className="dark:text-white" href="#!"><Instagram /></a>
                    <a className="dark:text-white" href="#!"><Whatsapp /></a>
                  </div>
                  <br></br>
                        <div>
                  <button onClick={updateUser} type="button" className="btn btn-primary">Update</button>
                  <Link to={`/profile`}>
                  <button type="button" className="btn btn-danger">Cancel</button>
                    </Link>
                        </div>
                </MDBCardBody>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

  </section>
    </div>
  )
}
