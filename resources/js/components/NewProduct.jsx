import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React from 'react';
import { useState, useEffect } from "react";
import { Container } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import { ToastBody, ToastContainer } from 'react-bootstrap';

const NewProduct = () => {
  const token = sessionStorage.getItem('token');

  const navigate = useNavigate();

  function getCurrentDay() {
    var today = new Date();
    var diaHoy = today.getDate();
    if (diaHoy.toString().length <= 1) diaHoy = '0' + diaHoy
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + diaHoy; //'2022-12-03'
    var dateTime = date;

    var hoy = document.getElementById('birthDate');

    hoy.max = date;
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
            <Toast.Body><h5>Please verify the data entered</h5></Toast.Body>
          </Toast>
        </ToastBody>
      </ToastContainer>
    );
  }


  const [formValue, setFormValue] = useState({
    name: '',
    price: 0.0,
    quantity: 0,
    relase: '',
    deliverTime: 0,
    description: '',
  })

  const [category_id, setCategory_id] = useState(0)
  const [brand_id, setBrand_id] = useState(0)

  const [image, setImage] = useState(null);
  const onChangeFile = (e) => {
    setImage(e.target.files[0]);
  }


  const onChange = (e) => {
    e.persist();
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }


  const storeProduct = async () => {
    const formData = new FormData();
    formData.append("name", formValue.name)
    formData.append("price", formValue.price)
    formData.append("description", formValue.description)
    formData.append("relase", formValue.relase)
    formData.append("quantity", formValue.quantity)
    formData.append("deliverTime", formValue.deliverTime)
    formData.append("category_id", category_id)
    formData.append("brand_id", brand_id)
    formData.append("image", image)
    await axios.post('http://localhost:80/Discos/public/api/storeProduct',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    ).then(navigate("/Discos/public/products"))
    .catch(error => {
      setFormOk(true);
    })
  }

  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:80/Discos/public/api/showCategories`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        setCategory(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const [brand, setBrand] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:80/Discos/public/api/showBrand`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        console.log(res.data)
        setBrand(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <Container className='w-75'>
      {formOk && (<Validate />)}
      <Card className='m-4 p-3'>
        <Card.Title className="text-center"><h1>New Product</h1></Card.Title>
        <hr />
        <Form onSubmit={storeProduct} className="align-items-center">
          <Form.Group className="mb-3" controlId="gender">
            <Form.Label>New Image:</Form.Label>
            <Form.Control
              accept="image/*"
              type="file"
              onChange={onChangeFile}
            />
            <br />
            <Form.Label>Name:</Form.Label>
            <Form.Control
              title='Wrong input'
              name="name"
              type="text"
              maxLength={"100"}
              placeholder="Type the name"
              required
              value={formValue.name}
              onChange={onChange}
            />
            <br />
            <Form.Label>Category:</Form.Label>
            <Form.Select
              name="category"
              onChange={(e) => setCategory_id(e.target.value)}
            >
              <option value="">Select one please</option>
              {
                category.map(cat =>
                  <option value={cat.id}>{cat.name}</option>

                )
              }
            </Form.Select>
            <br />
            <Form.Label>Brand:</Form.Label>
            <Form.Select
              name="category"
              onChange={(e) => setBrand_id(e.target.value)}
            >
              <option value="">Select one please</option>
              {
                brand.map(cat =>
                  <option value={cat.id}>{cat.name}</option>

                )
              }
            </Form.Select>
            <br />
            <Form.Label>Relase Date:</Form.Label>
            <Form.Group className="mb-3" controlId="birthDate">
              <Form.Control
                onSelect={getCurrentDay}
                name="relase"
                type="date"
                required
                value={formValue.relase}
                onChange={onChange}
              />
            </Form.Group>
            <br />
            <Form.Label>Deliver time:</Form.Label>
            <Form.Control
              title='Wrong input'
              name="deliverTime"
              type="text"
              pattern="^[1-9]\d*$"
              placeholder="Type the deliver time"
              required
              value={formValue.deliverTime}
              onChange={onChange}
            />
            <br />
            <Form.Label>Price:</Form.Label>
            <Form.Control
              title='Wrong input'
              name="price"
              type="text"
              pattern="^[1-9]\d*(\.\d+)?$"
              placeholder="Type the price"
              required
              value={formValue.price}
              onChange={onChange}
            />
            <br />
            <Form.Label>Quantity:</Form.Label>
            <Form.Control
              title='Wrong input'
              name="quantity"
              type="text"
              pattern="^[1-9]\d*$"
              placeholder="Type the price"
              required
              value={formValue.quantity}
              onChange={onChange}
            />
            <br />
            <Form.Label>Description:</Form.Label>
            <Form.Control as='textarea'
              name="description"
              rows={3} value={formValue.description}
              onChange={onChange} />
            <br />
          </Form.Group>
          <div className='d-flex align-items-center'>
            <Button variant="outline-secondary" type='submit' className='mx-auto'>
              Add Product
            </Button>
          </div>
        </Form>

        <br />

      </Card>
    </Container>
  );
}

export default NewProduct;