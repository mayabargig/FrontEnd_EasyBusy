import 'bootstrap/dist/css/bootstrap.min.css';
import "./LogReg.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Login(props){
    const {changeHandler,handelSubmit }= props;

    return(
<Form onSubmit={handelSubmit} id="LoginForm" name="email">
        <h2>Login Page:</h2><br></br>
                <Row>
                <Col>
                <Form.Control name="email" onChange={changeHandler}
                placeholder="Email Address" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
                </Col>
                </Row><br></br>
                <Row>
                <Col>
                <Form.Control name="password" onChange={changeHandler}
                placeholder="Password" />
                </Col>
            </Row><br></br>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    )
}

export default Login;