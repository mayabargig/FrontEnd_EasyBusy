import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import "./LogReg.css";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function Register(props){
    const {handelSubmit, changeHandler, address, setAddress }= props;

    const handlerAddress = (e)=>{
        const { name, value } = e.target;
        setAddress({...address, [name]:value})
    }

    return (
        <Form id="singUpForm" onSubmit={handelSubmit} name='email' className=' dark:text-white dark:bg-black'>
            <h2>SingUp Page:</h2>
            <Row>
                <Col>
                <Form.Control name="firstName" onChange={changeHandler}
                 placeholder="First name" />
                </Col>
                <Col>
                <Form.Control name="lastName" onChange={changeHandler}
                 placeholder="Last name" />
                </Col>
                </Row><br></br>
                <Row>
                <Col>
                <Form.Control name="email" onChange={changeHandler}
                placeholder="Email" />
                </Col>
                <Col>
                <Form.Control name="password" onChange={changeHandler}
                placeholder="Password" />
                </Col>
            </Row><br></br>
            <Row>
                <Col>
                <Form.Control name="telephone" onChange={changeHandler}
                placeholder="Phone Number" />
                </Col>
                <Col>
                <Form.Control name="job" onChange={changeHandler}
                placeholder="Job" />
                </Col>
            </Row><br></br>
                <h5>Full Address:</h5>
            <Row>
                <Col>
                <Form.Control name="country" 
                value={address.country}
                onChange={handlerAddress}
                placeholder="Country" />
                </Col>
                <Col>
                <Form.Control name="city" onChange={handlerAddress}
                  value={address.city}
                placeholder="City" />
                </Col>
                </Row><br></br>
                <Row>
                <Col>
                <Form.Control name="street" onChange={handlerAddress}
                value={address.street}
                placeholder="Street" />
                </Col>
                <Col>
                <Form.Control name="apartment" onChange={handlerAddress}
                value={address.apartment}
                placeholder="Apartment" />
                </Col>
                </Row><br></br>
                <Row>
                    <Col>
                    <Form.Select name="role"aria-label="Default select example" onChange={changeHandler}>
                    <option>User Type</option>
                    <option value="regular">Regular</option>
                    <option value="admin">Admin</option>
                    </Form.Select>
                    </Col>
                    <Col>
                    <Form.Select name="gender"aria-label="Default select example" onChange={changeHandler}>
                    <option>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    </Form.Select>
                    </Col>
                </Row><br></br>
            <Button variant="primary" type="submit">
                Submit
            </Button>
    </Form>
    )
}   

export default Register;