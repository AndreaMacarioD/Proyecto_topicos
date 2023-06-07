import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import {ToastBody, ToastContainer } from 'react-bootstrap';
import axios from 'axios';


const Login = () => {

  const onChangeFormData = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const [formOk, setFormOk] = useState(false);
  const Validate = () => {
        const toggleWish = () => setFormOk(!formOk);
        return (
            <ToastContainer className="p-3 d-flex justify-content-center w-75" position={'middle-center'}>
                <ToastBody>
                    <Toast className="w-100" show={formOk} onClose={toggleWish} delay={3000} autohide style={{ background: 'red' }}>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto"><h4>ERROR</h4></strong>
                        </Toast.Header>
                        <Toast.Body><h5>Bad Password or Email</h5></Toast.Body>
                    </Toast>
                </ToastBody>
            </ToastContainer>
        );
    }

 
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    email: '',
    password: ''
  });

  const login = (e) => {
    e.preventDefault();
    setFormOk(false);

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    axios.post("http://localhost:80/Discos/public/api/login",
      formData,
      { headers })
      .then(response => {

        sessionStorage.setItem('token', response.data.token);

        sessionStorage.setItem('user', response.data.user.id);

        if (response.data.user.admin === 1) {
          sessionStorage.setItem('admin', response.data.user.admin);
          const admin = sessionStorage.getItem('admin');
          if (admin === '1') {
            navigate("/Discos/public/products");
          }
        }
        else {
          navigate("/Discos/public/");
        }
        window.location.reload();

      }).catch(error => {
        setFormOk(true);
      });
  }
  return (
    <>
      <Container className="container d-flex justify-content-center">
        <Card className="p-3 mt-5 login w-75">
          <br />
          <Card.Title className="text-center"><h1>Login</h1></Card.Title>
          <hr />
          {formOk && (<Validate />)}
          <Form onSubmit={login}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                title='Wrong email, try again'
                type="email"
                placeholder="Type your email"
                value={formData.email}
                name="email"
                onChange={onChangeFormData}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                title='Wrong password, check your credentials'
                type="password"
                required
                placeholder="Type your password"
                value={formData.password}
                name="password"
                onChange={onChangeFormData}
                autoComplete="on"
              />
            </Form.Group>

            <div className='d-flex align-items-center'>
              <Button variant="outline-secondary" type='submit' className='mx-auto'>
                Login
              </Button>
            </div>
            <div className="text-center">
              <Form.Label className="mt-2">You do not have an account? <Link to="/Discos/public/register"><span className='text-primary' role="button">Register</span></Link></Form.Label>
            </div>
          </Form>
        </Card>
      </Container>
    </>
  );
}

export default Login;
