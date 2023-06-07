import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsBagCheck } from 'react-icons/bs';


const Purchase = () => {
  const user_id = sessionStorage.getItem('user');
  const token = sessionStorage.getItem('token');

  const [products, setProduct] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:80/Discos/public/api/purchases/${user_id}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {

        setProduct(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Container className="w-100 p-3">
      <Card>
        <Card.Title className="p-3 text-center d-flex align-items-center justify-content-center">
          <h1 className='mx-2'>Purchases</h1>
          <BsBagCheck />
        </Card.Title>
        <hr />
      </Card>

      {products.map(product =>

        <Card className="p-3 w-100 my-2">
          <Row>
            <Card.Title className="text-center"><h2>{product.name}</h2></Card.Title>
            <hr />
          </Row>
          <Row className="p-3" as={Link} to={'../allProducts/' + product.product_id} style={{ textDecoration: 'none' }}>

            <Col className="p-1 text-center ">
              <Image
                src={product.image}
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
                      <h5 style={{ fontWeight: 'normal' }}><strong>Price:</strong> ${product.price}</h5>
                    </Card.Text>

                    <Card.Text>
                      <h5 style={{ fontWeight: 'normal' }}><strong>Gender:</strong> {product.category}</h5>
                    </Card.Text>

                    <Card.Text>
                      <h5 style={{ fontWeight: 'normal' }}><strong>Brand:</strong> {product.brand}</h5>
                    </Card.Text>

                    <Card.Text>
                      <h5 style={{ fontWeight: 'normal' }}><strong>Purchase Datetime:</strong> {product.date_of_buy}</h5>
                    </Card.Text>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Col>
          </Row>
          <Row>
            <Card.Text className="mt-2"><h3>Description:</h3></Card.Text>
            <Card.Text>{product.description}</Card.Text>
          </Row>
        </Card>
      )}


    </Container>
  );
}

export default Purchase;