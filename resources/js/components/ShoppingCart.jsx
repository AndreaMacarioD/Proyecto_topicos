import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash } from "react-bootstrap-icons";
import { BsCartDash, BsBagCheck } from 'react-icons/bs';

const ShoppingCart = () => {
    const user_id = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');

    const [shoppingCart, setShoppingCart] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:80/Discos/public/api/showCart/${user_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res.data)
                setShoppingCart(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleDelete = async (e) => {
        await axios.delete(`http://localhost:80/Discos/public/api/deleteProductCart/${e}`,
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

    const handleClear = async (e) => {
        await axios.delete(`http://localhost:80/Discos/public/api/clearCart/${user_id}`,
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
        <Container className="w-100 p-3">

            <Card>
                <Card.Title className="p-3 text-center d-flex align-items-center justify-content-center">
                    <h1 className='mx-2'>Shopping Cart</h1>
                    <BsCartDash />
                </Card.Title>
                <hr />
            </Card>
            <hr />
            <div className="d-flex justify-content-center">
                <Card className="mx-2">
                    <Card.Title className="text-center mt-3 p-3 ">
                        <h2>Total:</h2>
                        <p>${shoppingCart.reduce(
                            (accumulator, currentValue) =>
                                accumulator + currentValue.price,
                            0
                        )}</p>
                    </Card.Title>
                </Card>
            </div>
            <br/>
            <div className="d-flex justify-content-center">
                <Card className="mx-2">
                    <Card.Title className="p-3 text-center d-flex align-items-center justify-content-center">
                        <div className="d-flex align-items-center">
                            <h2>Drop Shopping Cart</h2>
                            <Button variant="outline-danger" type="submit" className="mx-2 d-flex align-items-center">
                                <BsCartDash className="mx-auto d-flex align-items-center" onClick={handleClear} />
                            </Button>
                        </div>
                    </Card.Title>
                </Card>
            </div>            
            {shoppingCart.map(c =>
                <Card className="p-3 w-100 my-2">
                    <Button variant="outline-danger" className="ms-auto" onClick={() => handleDelete(c.id)}><Trash /></Button>
                    <Row>
                        <Card.Title className="text-center"><h2>{c.name}</h2></Card.Title>
                        <hr />
                    </Row>
                    <Row className="p-3" as={Link} to={'../allProducts/' + c.product_id} style={{ textDecoration: 'none' }}>
                        <Col className="p-1 text-center">
                            <Image
                                src={c.image}
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
                                            <h5 style={{ fontWeight: 'normal' }}><strong>Price:</strong> ${c.price}</h5>
                                        </Card.Text>

                                        <Card.Text>
                                            <h5 style={{ fontWeight: 'normal' }}><strong>Gender:</strong> {c.category}</h5>
                                        </Card.Text>

                                        <Card.Text>
                                            <h5 style={{ fontWeight: 'normal' }}><strong>Brand:</strong> {c.brand}</h5>
                                        </Card.Text>

                                        <Card.Text>
                                            <h5 style={{ fontWeight: 'normal' }}><strong>Added at:</strong> {c.date}</h5>
                                        </Card.Text>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Col>
                    </Row>
                    <Row>
                        <Card.Text className="mt-2"><h3>Description:</h3></Card.Text>
                        <Card.Text>{c.description}</Card.Text>
                    </Row>
                </Card>
            )}


        </Container>
    );
}

export default ShoppingCart;
