import 'bootstrap/dist/css/bootstrap.min.css';
import {React, useContext } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Facebook, Twitter, Instagram, Whatsapp,PencilSquare ,InfoCircle,GeoAlt, EnvelopeAt,Telephone} from "react-bootstrap-icons"
import { UserContext } from '../context/User';
import { Link } from 'react-router-dom';

export default function UserCard() {
    const { user }=useContext(UserContext);

    //TODO: 
    //add option to upload profile image and change
  return (
    <div className='dark:text-white dark:bg-black  !important'>
    <section className='vh-100 dark:text-white important! dark:bg-black important!'>
    <MDBContainer className='dark:text-white dark:bg-black !important' >
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="6" className="mb-4 mb-lg-0">
          <MDBCard className="mb-3 dark:text-white dark:bg-black" style={{ borderRadius: '.5rem', border:"1.5px solid white", boxShadow:"1px 2px 3px 2px black"}}>
            <MDBRow className="max-w-full">
              <MDBCol md="4" className="gradient-custom text-center text-white max-w-full"
                style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem'}}
                >
                   <Link to={`/profile/edit`}  className="penEdit dark:text-white dark:bg-black !important" >
                  <PencilSquare cla />
                  </Link>
                    <div style={{display:'flex', alignItems: 'center', justifyContent:'center' }}> 
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
                  <div className='dark:text-white dark:bg-black'>
                <MDBCardBody className="p-4">

                  <MDBTypography tag="h6">Contact Information <InfoCircle/></MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Email</MDBTypography>
                      <MDBCardText className="dark:text-white"><EnvelopeAt/> {user.email} </MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Phone </MDBTypography>
                      <MDBCardText className="dark:text-white"><Telephone/> {user.telephone}</MDBCardText>
                    </MDBCol>
                  </MDBRow>

                  <MDBTypography tag="h6">Location <GeoAlt/></MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">
                      <MDBTypography className="dark:text-white" tag="h6">{user.address.country} , {user.address.city}</MDBTypography>
                      <MDBCardText className="dark:text-white">{user.address.street} \ {user.address.apartment}</MDBCardText>
                  </MDBRow><br></br>

                  <div className='divIcons'>
                    <a className="dark:text-white" href="#!"><Facebook /></a>
                    <a className="dark:text-white" href="#!"><Twitter /></a>
                    <a className="dark:text-white" href="#!"><Instagram /></a>
                    <a className="dark:text-white" href="#!"><Whatsapp /></a>
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
  );
}
