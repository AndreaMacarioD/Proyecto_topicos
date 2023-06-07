import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import { ToastBody, ToastContainer } from 'react-bootstrap';
import React from 'react';



const Register = () => {

  function getLegalAge() {
    var today = new Date();
    var diaHoy = today.getDate();
    if (diaHoy.toString().length <= 1) diaHoy = '0' + diaHoy;

    // Restar 18 años a la fecha actual
    var eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), diaHoy);
    var year = eighteenYearsAgo.getFullYear();
    var month = eighteenYearsAgo.getMonth() + 1;
    var day = eighteenYearsAgo.getDate();

    var date = year + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');
    var dateTime = date;

    var hoy = document.getElementById('birthDate');
    hoy.max = date;
  }


  const navigate = useNavigate();

  const [gender, setGender] = useState('')
  const [formValue, setFormValue] = useState({
    name: '',
    last_name: '',
    birth: '',
    email: '',
    phone: '',
    password: '',
  })

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
            <Toast.Body><h5>Please verify the data entered</h5></Toast.Body>
          </Toast>
        </ToastBody>
      </ToastContainer>
    );
  }



  const onChange = (e) => {
    e.persist();
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }

  const postData = async (e) => {
    if (e && e.preventDefault()) e.preventDefault(); e.preventDefault();
    const formData = new FormData();
    formData.append("name", formValue.name)
    formData.append("last_name", formValue.last_name)
    formData.append("birth", formValue.birth)
    formData.append("gender", gender)
    formData.append("phone", formValue.phone)
    formData.append("email", formValue.email)
    formData.append("password", formValue.password)
    await axios.post('http://localhost:80/Discos/public/api/register',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      }
    ).then(response => {
      if (response.status == 200) {

        sessionStorage.setItem('token', response.data.token);

        sessionStorage.setItem('user', response.data.user.id);

        navigate("/Discos/public/Profile");

      }
    }).catch(error => {
      setFormOk(true);
    })
  }

  return (
    <Container className="w-75">
      <br />
      {formOk && (<Validate />)}
      <Card className="m-4 p-3">
        <Card.Title className="text-center"><h1>Register</h1></Card.Title>
        <hr />
        <Form onSubmit={postData}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              title='Wrong input'
              name="name"
              type="text"
              maxLength={"100"}
              pattern="[A-Za-z]{1,100}"
              placeholder="Type your name"
              required
              value={formValue.name}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastNames">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              name="last_name"
              type="text"
              placeholder="Type last name"
              maxLength={"100"}
              pattern="[A-Za-z]{1,100}"
              required
              value={formValue.last_name}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="birthDate">
            <Form.Label>Birth date</Form.Label>
            <Form.Control
              onSelect={getLegalAge}
              name="birth"
              type="date"
              required
              value={formValue.birth}
              onChange={onChange}
            />
          </Form.Group>

          <Col>
            <Form.Group className="mb-3" controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="category"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Nonbinary">Nonbinary</option>
                <option value="Other">Other</option>
                <option value="Unknown">I prefer not to say</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              type="tel"
              pattern="[0-9+()-]+"
              maxLength="10"
              required
              placeholder="Type your phone"
              value={formValue.phone}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              title='Wrong email input, has to be something as example@domain.com'
              name='email'
              type="email"
              placeholder="Type your email"
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
              maxLength={100}
              required
              value={formValue.email}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={formValue.password}
              onChange={onChange} />
          </Form.Group>
          <div className='d-flex align-items-center'>
            <Button variant="outline-secondary" type='submit' className='mx-auto'>
              Submit
            </Button>
          </div>
          <div className="text-center">
            <Form.Label className="mt-2">You already have an account? <Link to="/Discos/public/login"><span className='text-primary' role="button">Login</span></Link></Form.Label>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default Register;
