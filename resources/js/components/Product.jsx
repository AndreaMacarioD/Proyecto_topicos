import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash } from "react-bootstrap-icons";
import { BiCategoryAlt } from 'react-icons/bi';
const Product = () => {
  const token = sessionStorage.getItem('token');

  const [products, setProduct] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:80/Discos/public/api/showProducts`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {

        setProduct(res.data)
        console.log(res.data)
        console.log('bien?')
      })
      .catch(err => {
        console.log(err)
      })
  }, [])



  const handleDelete = async (e) => {
    await axios.delete(`http://localhost:80/Discos/public/api/deleteProduct/${e}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        window.location.reload(true);
      }).catch(error => {
        console.log(error.response.data);

      })
  }

  return (
    <Container className='p-3 pt-5'>
      <Card>
        <Card.Title className="p-3 text-center d-flex align-items-center justify-content-center">
          <h1 className='mx-2'>Products</h1>
        </Card.Title>
        <hr />
      </Card>
      <br />
      <div className="d-flex justify-content-center">
        <Card className="mx-2">
          <Card.Title className="p-3 text-center d-flex align-items-center justify-content-center">
            <div className="d-flex align-items-center">
              <h2>New Product</h2>
              <Button variant="outline-secondary" className="mx-2 d-flex align-items-center" as={Link} to={'../newProduct'}>
                <BiCategoryAlt className="mx-auto d-flex align-items-center" />
              </Button>
            </div>
          </Card.Title>
        </Card>
      </div>

      {products.map(item =>
        <Card className="p-3 w-100 my-2">
          <Button variant="outline-danger" className="ms-auto" onClick={() => handleDelete(item.id)}><Trash /></Button>
          <Row>
            <Card.Title className="text-center"><h2>{item.name}</h2></Card.Title>
            <hr />
          </Row>
          <Row className="p-3" as={Link} to={'../updateProduct/' + item.id} style={{ textDecoration: 'none' }}>
            <Col className="p-1 text-center">
              <Image className="w-100 "
                src={item.image}
                style={{
                  maxWidth: "250px",
                  maxHeight: "250px",
                }}
              ></Image>
            </Col>
            <Col>
              <Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <Card.Text>
                      <h5 style={{ fontWeight: 'normal' }}><strong>Price:</strong> ${item.price}</h5>

                      <h5 style={{ fontWeight: 'normal' }}><strong>Gender:</strong> {item.category_name}</h5>



                      <h5 style={{ fontWeight: 'normal' }}><strong>Brand:</strong> {item.brand_name}</h5>



                      <h5 style={{ fontWeight: 'normal' }}><strong>Arrival time:</strong> {item.deliverTime} days</h5>



                      <h5 style={{ fontWeight: 'normal' }}><strong>Quantity available:</strong> {item.quantity}</h5>



                      <h5 style={{ fontWeight: 'normal' }}><strong>Relase Date:</strong> {item.relase}</h5>
                    </Card.Text>

                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Col>
          </Row>
          <Row>
            <Card.Text className="mt-2"><h3>Description:</h3></Card.Text>
            <Card.Text>{item.description}</Card.Text>
          </Row>
        </Card>
      )}


    </Container>
  );
}

export default Product;