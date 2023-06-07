import Button from 'react-bootstrap/Button';
import { ButtonGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Row, Col, Image, Form, Alert } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import { Container } from 'react-bootstrap';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsCartDash } from 'react-icons/bs';
import Toast from 'react-bootstrap/Toast';
import { ToastBody, ToastContainer } from 'react-bootstrap';

const OneProduct = () => {
  const user_id = sessionStorage.getItem('user');
  const token = sessionStorage.getItem('token');

  let id = useParams();


  const [formOkW, setFormOkW] = useState(false);
  const ValidateWish = ({name}) => {
    const toggleWish = () => setFormOkW(!formOkW);
    return (
      <ToastContainer className="p-3 d-flex justify-content-center w-75" position={'middle-center'}>
        <ToastBody>
          <Toast className="w-100" show={formOkW} onClose={toggleWish} delay={3000} autohide style={{ background: 'red' }}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
              <strong className="me-auto"><h4>Wishlist</h4></strong>
            </Toast.Header>
            <Toast.Body><h5>{name} has been added to wishlist</h5></Toast.Body>
          </Toast>
        </ToastBody>
      </ToastContainer>
    );
  }

  const [formOkC, setFormOkC] = useState(false);
  const ValidateCart = ({name}) => {
    const toggleWish = () => setFormOkC(!formOkC);
    return (
      <ToastContainer className="p-3 d-flex justify-content-center w-75" position={'middle-center'}>
        <ToastBody>
          <Toast className="w-100" show={formOkC} onClose={toggleWish} delay={3000} autohide style={{ background: 'gray' }}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
              <strong className="me-auto"><h4>Shopping cart</h4></strong>
            </Toast.Header>
            <Toast.Body><h5>{name} has been added to shopping cart</h5></Toast.Body>
          </Toast>
        </ToastBody>
      </ToastContainer>
    );
  }

  const [formOkB, setFormOkB] = useState(false);
  const ValidateBuy = ({name, price}) => {
    const toggleWish = () => setFormOkB(!formOkB);
    return (
      <ToastContainer className="p-3 d-flex justify-content-center w-75" position={'middle-center'}>
        <ToastBody>
          <Toast className="w-100" show={formOkB} onClose={toggleWish} delay={3000} autohide style={{ background: 'green' }}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
              <strong className="me-auto"><h4>Purchased</h4></strong>
            </Toast.Header>
            <Toast.Body><h5>You have purchased {name} for ${price}</h5></Toast.Body>
          </Toast>
        </ToastBody>
      </ToastContainer>
    );
  }



  const [buy, setBuy] = useState(false);
  const PostBuy = async (e) => {
    const formData = new FormData();
    formData.append("user_id", user_id)
    formData.append("product_id", e)
    await axios.post('http://localhost:80/Discos/public/api/buyProduct',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    ).then(response => {
      if (response.status == 200) {
        console.log('responsefasfrgarejgñoierjhsth');
        console.log(response.data);
        setFormOkB(true)
      }
    }).catch(error => {
      console.log(error);
      console.log('no jaló :c');
    })
  }

  //Agregar al carrito 
  const AddCart = async (e) => {
    const formData = new FormData();
    formData.append("product_id", e)
    formData.append("user_id", user_id)
    await axios.post('http://localhost:80/Discos/public/api/addCart',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    ).then(response => {
      if (response.status == 200) {
        setFormOkC(true)
        console.log('response');
        //console.log(response.data);
        console.log(response.data);

      }
    }).catch(error => {
      console.log(error);
    })
  }

  //Agregar al Wishlist
  const AddWishlist = async (e) => {
    const formData = new FormData();
    formData.append("product_id", e)
    formData.append("user_id", user_id)
    //formData.append("image", formValue.image)
    await axios.post('http://localhost:80/Discos/public/api/addWish',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    ).then(response => {
      if (response.status == 200) {
        setFormOkW(true)
        console.log('response');
        //console.log(response.data);
        console.log(response.data);

      }
    }).catch(error => {
      console.log(error);
    })
  }


  const [product, setProduct] = useState([]);
  useEffect(() => {//Get Products from Laravel
    axios.get(`http://localhost:80/Discos/public/api/specificProduct/${id.product}`)
      .then(res => {
        console.log(res)
        setProduct(res.data[0])
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Container className='m-3 mx-auto'>
      <Card className='p-3 gap-3'>

        <br />
        <Card.Title className="text-center"><h1>{product.name}</h1></Card.Title>
        <hr />
        {!formOkB && (<ValidateWish name={product.name}/>)}
        {formOkC && (<ValidateCart name={product.name}/>)}
        {formOkB && (<ValidateBuy name={product.name} price={product.price}/>)}
        <Row className='m-3 d-flex'>
          <Col>
            <Image
              className='p-2'
              src={"../" + product.image}
              style={{ height: '300px', width: '300px' }}
            />
          </Col>
          <Col>
            <Card.Text className="mt-2"><h2>Description:</h2></Card.Text>
            <Card.Text>{product.description}</Card.Text>
          </Col>
          <Col className="me-3 p-3">
            <Card.Text>
              <h5 style={{ fontWeight: 'normal' }}><strong>Price:</strong> ${product.price}</h5>
            </Card.Text>

            <Card.Text>
              <h5 style={{ fontWeight: 'normal' }}><strong>Gender:</strong> {product.category_name}</h5>
            </Card.Text>

            <Card.Text>
              <h5 style={{ fontWeight: 'normal' }}><strong>Brand:</strong> {product.brand_name}</h5>
            </Card.Text>

            <Card.Text>
              <h5 style={{ fontWeight: 'normal' }}><strong>Arrival time:</strong> {product.deliverTime} days</h5>
            </Card.Text>

            <Card.Text>
              <h5 style={{ fontWeight: 'normal' }}><strong>Quantity available:</strong> {product.quantity}</h5>
            </Card.Text>

            <Card.Text>
              <h5 style={{ fontWeight: 'normal' }}><strong>Relase Date:</strong> {product.relase}</h5>
            </Card.Text>

          </Col>
        </Row>
        <hr />
        <Row className="me-auto d-flex mx-auto justify-content-center">

          <Col>

            <ButtonGroup className="d-flex">
              {(token) ? <Button variant="outline-danger" size="lg" className='mx-2 align-items-center w-100' onClick={() => AddWishlist(product.id)}> <AiOutlineHeart /> </Button> : <></>}
              {(token) ? <Button variant="outline-secondary" className='mx-2 align-items-center' onClick={() => AddCart(product.id)}> <BsCartDash /> </Button> : <></>}
              {(token) ? <Button variant='outline-success' size="lg" className='mx-2 align-items-center' onClick={() => PostBuy(product.id)} > <h5>${product.price}</h5></Button> : <></>}
            </ButtonGroup>
          </Col>


        </Row>
      </Card>
    </Container>
  );
}

export default OneProduct;