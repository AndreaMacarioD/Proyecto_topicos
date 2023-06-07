import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ToastBody, ToastContainer } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from 'react-bootstrap/Toast';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { AiOutlineHeart } from 'react-icons/ai';



const AllProducts = () => {
    const user_id = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    let { productoS } = useParams();
    let condicion;

    if (productoS != null) {

        condicion = productoS;
    } else {

        condicion = "";
    }

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


    const [selectedTag, setSelectedTag] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");

    const [query, setQuery] = useState("");


    const [productos, setProductos] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:80/Discos/public/api/showProducts')
            .then(res => {
                console.log(res)
                setProductos(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const Duplicates = productos.map((tags) => tags.category_id);
    const [pivote, setPivote] = useState([...new Set(Duplicates)]);

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

    return (
        <>
            <br />
            <Container className="main">
                <Card className="w-100 p-3">
                    <h1 className="text-center">Filters</h1>
                    <hr />
                    <Row>
                        <Form.Group className="w-25 d-inline-block">
                            <Form.Label><h5>Gender:</h5></Form.Label>
                            <Form.Select
                                type="select"
                                onChange={(e) => setSelectedTag(e.target.value)}
                            >
                                <option value="">Select one</option>
                                {productos.filter((tags, index, self) => self.findIndex(t => t.category_id === tags.category_id) === index).map((tags) => (
                                    <option key={tags.category_id} value={tags.category_id}>{tags.category_name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="w-25 d-inline-block">
                            <Form.Label><h5>Brand:</h5></Form.Label>
                            <Form.Select
                                type="select"
                                onChange={(e) => setSelectedBrand(e.target.value)}
                            >
                                <option value="">Select one</option>
                                {productos.reduce((uniqueBrands, product) => {
                                    if (!uniqueBrands.some(brand => brand.brand_id === product.brand_id)) {
                                        uniqueBrands.push({ brand_id: product.brand_id, brand_name: product.brand_name });
                                    }
                                    return uniqueBrands;
                                }, []).map((brand) => (
                                    <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
                                ))}

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="w-50 d-inline">
                            <Form.Label><h5>Price:</h5></Form.Label>
                            <br />
                            <Form.Range
                                className="w-100"
                                controlId="maxCost"
                                min={10}
                                max={5000}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <p>Maximum price: ${query}</p>
                        </Form.Group>
                    </Row>

                </Card>
            </Container>

            <Container className="d-flex p-3">


                <Container xs sm lg>
                    <Container className="d-flex flex-wrap">
                        <div className="w-100 justify-content-center">
                            {wish && (<Wish />)}
                        </div>
                        <Row sm={2} xs={2}>
                            {productos.filter(
                                (productf) =>
                                    productf.category_id.toString().includes(selectedTag) &&
                                    productf.name.includes(condicion) &&
                                    (productf.price.toString().includes(query) || productf.price < query) &&
                                    productf.brand_id.toString().includes(selectedBrand)
                            ).map(product => (
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
                                                {(token) ? <Button size="lg" variant="outline-danger" onClick={() => { AddWishlist(product.id) }} className="float-end btn-sm"><AiOutlineHeart size={25} /></Button> : <></>}
                                            </div>
                                            <Card className='m-3 mx-auto d-flex'>



                                                <Card.Img

                                                    style={{ height: '400px', width: '400px' }}
                                                    src={product.image}
                                                    className="w-100"
                                                    alt="Card image"
                                                />
                                            </Card>


                                            <Card.Body>

                                                <Card.Text><h4>{product.name}</h4><hr /></Card.Text>
                                                <Card.Text><strong>Description:</strong></Card.Text>
                                                <Card.Text>{product.description}</Card.Text>
                                                <Card.Text> <strong>Price:</strong>  ${product.price}</Card.Text>
                                                <Card.Text> <strong>Gender:</strong>  {product.category_name}</Card.Text>
                                                <Card.Text> <strong>Brand:</strong>  {product.brand_name}</Card.Text>
                                                <Card.Text> <strong>Relase Date:</strong>  {product.relase}</Card.Text>
                                                <Button
                                                    variant="outline-secondary"
                                                    className='mx-2'
                                                    as={Link}
                                                    to={`../allProducts/${product.id}`}
                                                >
                                                    Details
                                                </Button>

                                            </Card.Body>


                                        </Card>
                                        <Card.Footer>

                                        </Card.Footer>

                                    </Col>

                                </>
                            ))}
                        </Row>
                    </Container>
                </Container>
            </Container>
        </>
    );
}

export default AllProducts;
