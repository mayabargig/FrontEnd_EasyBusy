import 'bootstrap/dist/css/bootstrap.min.css';
import {React, useContext, useEffect, useState} from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Facebook, Twitter, Instagram, Whatsapp,PencilSquare ,InfoCircle,GeoAlt, EnvelopeAt,Telephone} from "react-bootstrap-icons"
import { UserContext } from '../context/User';
import { Link } from 'react-router-dom';

export default function UserCard() {
    const { user }=useContext(UserContext);
    // console.log(user);
    // const [user, setUser] = useState({gender:"male"})
    useEffect(()=>{

    },[])

  return (
    <div>
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
    <MDBContainer className="py-5 h-100">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="6" className="mb-4 mb-lg-0">
          <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
            <MDBRow className="g-0">
              <MDBCol md="4" className="gradient-custom text-center text-white"
                style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                   <Link to={`/profile/edit`}  className="penEdit" >
                  <PencilSquare/>
                  </Link>
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
                <MDBTypography tag="h5">{user.firstName} {user.lastName}</MDBTypography>
                <MDBCardText>{user.job}</MDBCardText>
                <MDBIcon far icon="edit mb-5" />
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody className="p-4">
                  <MDBTypography tag="h6">Contact Information <InfoCircle/></MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Email</MDBTypography>
                      <MDBCardText className="text-muted"><EnvelopeAt/> {user.email} </MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Phone </MDBTypography>
                      <MDBCardText className="text-muted"><Telephone/> {user.telephone}</MDBCardText>
                    </MDBCol>
                  </MDBRow>

                  <MDBTypography tag="h6">Location <GeoAlt/></MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">
                      <MDBTypography tag="h6">{user.address.country} , {user.address.city}</MDBTypography>
                      <MDBCardText className="text-muted">{user.address.street} \ {user.address.apartment}</MDBCardText>
                  </MDBRow><br></br>

                  <div className='divIcons'>
                    <a href="#!"><Facebook /></a>
                    <a href="#!"><Twitter /></a>
                    <a href="#!"><Instagram /></a>
                    <a href="#!"><Whatsapp /></a>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </section>
    </div>
  );
}
