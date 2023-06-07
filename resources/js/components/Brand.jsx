import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import React from 'react';
import {useState, useEffect } from "react";
import Toast from 'react-bootstrap/Toast';
import { ToastBody, ToastContainer } from 'react-bootstrap';
import { Trash } from "react-bootstrap-icons";


const Brand = () => {
    const token = sessionStorage.getItem('token');

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
                        <Toast.Body><h5>Brand registered or blank</h5></Toast.Body>
                    </Toast>
                </ToastBody>
            </ToastContainer>
        );
    }

    const [brand, setBrand] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:80/Discos/public/api/showBrand`)
        .then(res => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleDelete = async (e) => {
        await axios.delete(`http://localhost:80/Discos/public/api/deleteBrand/${e}`,
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

    const [name, setName] = useState('');
    const storeBrand = async () => {
        setFormOk(true);
        const formData = new FormData();
        formData.append("name", name)
        await axios.post('http://localhost:80/Discos/public/api/addBrand',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then(response => {

            console.log(response)
           

        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <Container className="p-3 pt-5">
            {formOk && (<Validate />)}
            <Card>
                <Card.Title className="p-3 text-center d-flex align-items-center justify-content-center">
                    <h1 className='mx-2'>Brands</h1>
                </Card.Title>
                <hr />
            </Card>
            <br />

            <div className="d-flex justify-content-center">
                <Card className="mx-2 p-3 text-center d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center w-100">
                        <Form onSubmit={storeBrand}>
                            <div className='d-flex align-items-center'>
                                <Form.Control
                                    as='textarea'
                                    rows={2}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mx-2"
                                />
                                <Button variant="outline-secondary" type='submit' className='mx-auto'>
                                    Add Brand
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Card>
            </div>
            <br />
            <div className="d-flex justify-content-center ">
                <Card className="w-25">
                    {brand.map(item =>
                        <>
                            <br />
                            <div className="d-flex align-items-center">
                                <h5 className="flex-grow-1 mx-2" style={{ fontWeight: 'normal' }}><strong>({item.id})</strong> {item.name}</h5>
                                <Button variant="outline-danger" className="mx-2" onClick={() => handleDelete(item.id)}><Trash /></Button>
                            </div>
                            <br />
                        </>
                    )}
                </Card>
            </div>


        </Container>
    );
}

export default Brand;
