import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from 'react'
import { Row, Col, Image, Form, Alert } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import { ToastBody, ToastContainer } from 'react-bootstrap';
import { AiOutlineHeart } from 'react-icons/ai';


import "/xampp_t/htdocs/Discos/resources/css/app.css";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from 'axios';


const LandingPage = () => {
    const user_id = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    const admin = sessionStorage.getItem('admin');

    const [wish, setWish] = useState(false);
    const Wish = () => {
        const toggleWish = () => setWish(!wish);
        return (
            <ToastContainer className="p-3 d-flex justify-content-center w-75" position={'middle-center'}>
                <ToastBody>
                    <Toast className="w-100" show={wish} onClose={toggleWish} delay={3000} autohide style={{ background: 'red' }}>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto"><h4>Wishlist</h4></strong>
                        </Toast.Header>
                        <Toast.Body><h5>Product added to your Wishlist!</h5></Toast.Body>
                    </Toast>
                </ToastBody>
            </ToastContainer>
        );
    }

    const AddWishlist = async (e) => {
        const formData = new FormData();
        formData.append("product_id", e)
        formData.append("user_id", user_id)
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
                setWish(true)
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const [productos, setProductos] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:80/Discos/public/api/showProducts')
            .then(res => {
                setProductos(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <div class="main">
                <Carousel>
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src="imagesNav\00.jpg"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img
                            className="d-block w-100"
                            src="imagesNav\04.jpg"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="imagesNav\02.jpg"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
                <br />
                <CardGroup xs sm lg>
                    <Container className="d-flex flex-wrap">
                        <div className="w-100 justify-content-center">
                            {wish && (<Wish />)}
                        </div>
                        <Row sm={2} xs={2}>

                            {productos.map(product => (
                                <>
                                    <Col>

                                        <Card

                                            className="p-3 m-1 w-100"
                                            style={{
                                                textDecoration: "none",
                                                color: "black",

                                            }}

                                        >
                                            <div>
                                                {(token && !admin) ? <Button size="lg" variant="outline-danger" onClick={() => { AddWishlist(product.id) }} className="float-end btn-sm"><AiOutlineHeart size={25} /></Button> : <></>}
                                            </div>
                                            <Card.Img
                                                style={{ height: '400px', width: '400px' }}
                                                src={product.image}
                                                className="w-100"
                                                alt="Card image"
                                            />

                                            <Card.Body >
                                                <Card.Text><h4>{product.name}</h4><hr /></Card.Text>
                                                <Card.Text><strong>Description:</strong></Card.Text>
                                                <Card.Text>{product.description}</Card.Text>
                                                <Card.Text> <strong>Price:</strong>  ${product.price}</Card.Text>
                                                <Card.Text> <strong>Gender:</strong>  {product.category_name}</Card.Text>
                                                <Card.Text> <strong>Brand:</strong>  {product.brand_name}</Card.Text>
                                                <Card.Text> <strong>Relase Date:</strong>  {product.relase}</Card.Text>
                                                {!admin ? <Button
                                                    variant="outline-secondary"
                                                    className='mx-2'
                                                    as={Link}
                                                    to={`allProducts/${product.id}`}
                                                >
                                                    Details
                                                </Button>
                                                    : <></>}
                                            </Card.Body>


                                        </Card>
                                    </Col>
                                </>
                            ))}
                        </Row>
                    </Container>
                </CardGroup>
            </div>
        </>
    );
}

export default LandingPage;
