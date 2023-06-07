import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import { Row, Col, Form} from 'react-bootstrap';
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import { BsFillTrashFill} from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';
import { LuImagePlus } from 'react-icons/lu';
import "/xampp_t/htdocs/Discos/resources/css/app.css";

const Profile = () => {
    const user_id = sessionStorage.getItem('user')
    const token = sessionStorage.getItem('token')

    const [image, setImage] = useState(null);
    const onChangeFile = (e) => {
        setImage(e.target.files[0]);
    }
    const postImage = async () => {
        const formData = new FormData();
        formData.append("user_id", user_id)
        formData.append("image", image)
        await axios.post('http://localhost:80/Discos/public/api/addImg',
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
                window.location.reload(true);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const [user, setUser] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:80/Discos/public/api/showUser/${user_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res)
                setUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const [address, setAddress] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:80/Discos/public/api/showAddress/${user_id}`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res)
                setAddress(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const DeleteAddress = async (e) => {
        console.log(e)
        await axios.delete(`http://localhost:80/Discos/public/api/deleteAddress/${e}`
            , {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                window.location.reload(true);
            }).catch(error => {
                console.log(error.response.data);

            })
    }

    //Add Address
    const [add, setAdd] = useState('')
    //Store Address
    const postAddress = async (e) => {
        const formData = new FormData();
        formData.append("address", add)
        formData.append("user_id", user_id)
        await axios.post('http://localhost:80/Discos/public/api/addAddress',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json', 'Authorization': `Bearer ${token}`
                }
            }
        ).then(response => {
           console.log(response.data)
        }).catch(error => {
            console.log('nooo')
            console.log(error.response.data);

        })
    }


    return (
        <div class="div_card-profile">
            <Container>
                <Card className="w-75 p-3">
                    <Card.Title className="text-center"><h1>Profile</h1></Card.Title>
                    <hr />
                    <Row>
                        <Col>
                            <Card.Img
                                src={user.image}
                                className="w-100 mx-auto d-block rounded border p-2"
                            />
                            <div className="d-grid gap-2">
                                <Form.Group controlId="formFile" className="">
                                    <Form.Control
                                        accept="image/*"
                                        type="file"
                                        onChange={onChangeFile}
                                    />
                                </Form.Group>
                                <div className='d-flex w-100'>
                                    <Button variant="outline-secondary" size="ls" className='w-25' onClick={postImage}>
                                        <LuImagePlus size="sx" />
                                    </Button>
                                </div>
                            </div>

                        </Col>
                        <Col>
                            <ListGroup className="list-group-flush">

                                <ListGroup.Item>
                                    <h2>About you</h2>
                                </ListGroup.Item>
                                <h5 style={{ fontWeight: 'normal' }}><strong>Name:</strong> {user.name} {user.last_name}</h5>
                                <h5 style={{ fontWeight: 'normal' }}><strong>Gender:</strong> {user.gender}</h5>
                                <h5 style={{ fontWeight: 'normal' }}><strong>Date of birth:</strong> {user.birth}</h5>
                                <h5 style={{ fontWeight: 'normal' }}><strong>Email:</strong> {user.email}</h5>
                                <h5 style={{ fontWeight: 'normal' }}><strong>Phone:</strong> {user.phone}</h5>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Card.Body>
                            <Card.Title className="text-center"><h2>Addresses</h2></Card.Title>
                            <hr />
                            {address.map(ad => (
                                <div className="d-flex align-items-center">
                                    <p className="flex-grow-1 mx-2"><strong>({ad.id})</strong> {ad.address}</p>
                                    <Button variant="outline-danger" size="sm" className='mx-2' onClick={() => DeleteAddress(ad.id)} > <BsFillTrashFill /> </Button>
                                </div>
                            ))}
                            <div className='d-flex w-100'>
                                <Form onSubmit={postAddress}>
                                    <div className='d-flex align-items-center'>
                                    <Form.Control
                                        as='textarea'
                                        rows={2}
                                        onChange={(e) => setAdd(e.target.value)}
                                        className="mx-2"
                                    />
                                        <Button variant="outline-secondary" type='submit' className='mx-auto w-25'>
                                        New <AiOutlineHome />
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </Card.Body>
                    </Row>
                </Card>
            </Container>
        </div >
    );
}

export default Profile;
