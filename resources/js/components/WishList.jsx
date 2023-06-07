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
import { AiOutlineHeart } from 'react-icons/ai';


const WhisList = () => {
    const user_id = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');

    const [wish, setWish] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:80/Discos/public/api/showWish/${user_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                setWish(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleDelete = async (e) => {
        await axios.delete(`http://localhost:80/Discos/public/api/deleteWishProduct/${e}`,
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
        await axios.delete(`http://localhost:80/Discos/public/api/deleteWish/${user_id}`,
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
                    <h1 className='mx-2'>Wishlist</h1>
                    <AiOutlineHeart />
                </Card.Title>
                <hr />
            </Card>
            <hr />
            <div className="d-flex justify-content-center">
                <Card className="mx-2">
                    <Card.Title className="p-3 text-center d-flex align-items-center justify-content-center">
                        <div className="d-flex align-items-center">
                            <h2>Drop Wishlist</h2>
                            <Button variant="outline-danger" type="submit" className="mx-2 d-flex align-items-center">
                                <AiOutlineHeart className="mx-auto d-flex align-items-center" onClick={handleClear} />
                            </Button>
                        </div>
                    </Card.Title>
                </Card>
            </div>

            {wish.map(w =>
                <Card className="p-3 w-100 my-2">
                    <Button variant="outline-danger" className="ms-auto" onClick={() => handleDelete(w.id)}><Trash /></Button>
                    <Row>
                        <Card.Title className="text-center"><h2>{w.name}</h2></Card.Title>
                        <hr />
                    </Row>
                    <Row className="p-3" as={Link} to={'../allProducts/' + w.product_id} style={{ textDecoration: 'none' }}>
                        <Col className="p-1 text-center">
                            <Image className="w-100 "
                                src={w.image}
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
                                            <h5 style={{ fontWeight: 'normal' }}><strong>Price:</strong> ${w.price}</h5>
                                        </Card.Text>

                                        <Card.Text>
                                            <h5 style={{ fontWeight: 'normal' }}><strong>Gender:</strong> {w.category}</h5>
                                        </Card.Text>

                                        <Card.Text>
                                            <h5 style={{ fontWeight: 'normal' }}><strong>Brand:</strong> {w.brand}</h5>
                                        </Card.Text>

                                        <Card.Text>
                                            <h5 style={{ fontWeight: 'normal' }}><strong>Added at:</strong> {w.date}</h5>
                                        </Card.Text>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Col>
                    </Row>
                    <Row>
                        <Card.Text className="mt-2"><h3>Description:</h3></Card.Text>
                        <Card.Text>{w.description}</Card.Text>
                    </Row>
                </Card>
            )}
        </Container>
    );
}

export default WhisList;
