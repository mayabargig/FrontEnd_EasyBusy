import 'bootstrap/dist/css/bootstrap.min.css';
import "./LogReg.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Login(props){
    const {changeHandler,handelSubmit }= props;

    // const defaultEmail = "mayabargig@gmail.com";
    // const defaultPassword = "123";

    return(
      <div className=' dark:text-white dark:bg-black'>

<Form onSubmit={handelSubmit} id="LoginForm" name="email" className=' dark:text-white'>
        <h2>Login Page:</h2><br></br>
                <Row>
                <Col>
                <Form.Control 
                name="email"
                // defaultValue={defaultEmail} 
                // onChange={changeHandler}
                // placeholder="Email Address"
                placeholder="mayabargig@gmail.com"
                />
                <Form.Text className="dark:text-white dark:bg-black">
                  We'll never share your email with anyone else.
                </Form.Text>
                </Col>
                </Row><br></br>
                <Row>
                <Col>
                <Form.Control 
                name="password" 
                // defaultValue={defaultPassword} 
                // onChange={changeHandler}
                placeholder="123"
                // placeholder="Password"
                />
                </Col>
            </Row><br></br>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </div>
    )
}

export default Login;