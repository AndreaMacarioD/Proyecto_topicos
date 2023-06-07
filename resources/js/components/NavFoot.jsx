import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Outlet } from "react-router-dom";
import { Facebook, Whatsapp } from "react-bootstrap-icons";

import { BsCartDash, BsBagCheck } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.css';

const Footer = () => (

    <footer className="page-footer font-small blue pt-4" class="footer" style={{ background: '#3F51B5' }}>
        <div className="container-fluid text-center text-md-left">
            <div className="row d-flex align-items-center justify-content-center ">
                <div className="col-md-6 mt-md-0 mt-3">


                    <h5 className="text-uppercase">Contact us</h5>
                    <ul className="list-unstyled">
                        <li class="d-flex align-items-center justify-content-center">
                            <a
                                class="me-2"
                                href="https://www.facebook.com/"
                            >
                                Facebook
                            </a>
                            <Facebook />
                        </li>
                        <li class="d-flex align-items-center justify-content-center">
                            <a class="me-2" href="https://wa.me/4491999350">
                                Whatsapp
                            </a>
                            <Whatsapp />
                        </li>
                    </ul>
                    <p>© 2023 - Ecommerce Software developed by Equipo Guns'n Tracks™.</p>
                </div>
            </div>
        </div>
    </footer>
);

const NavBar = () => {
    const token = sessionStorage.getItem('token');
    const admin = sessionStorage.getItem('admin');

    const out = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('admin');
        window.location.reload(true);
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" style={{ background: '#3F51B5' }}>
                <Container className="p-2 mx-auto" >
                    <Navbar.Brand as={Link} to="/Discos/public/" style={{ color: '000000' }}>
                        <img
                            src="imagesNav\logo3.png"
                            width="160"
                            height="60"
                            className="d-inline-block align-top"
                            alt="Gun's N' Tracks"
                        />
                    </Navbar.Brand>
                    <Nav className="me-auto d-flex">

                        {(!admin) ?
                            <Nav.Link className="ml-auto"> <Button
                                className="mx-2" size="lg"
                                variant="outline-light"
                                as={Link}
                                to='allProducts'
                            >All Products</Button>
                            </Nav.Link> :
                            <></>}
                    </Nav>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <div className="d-flex ">
                            {(token && !admin /*normal User*/) &&
                                <>
                                    <Nav.Link className="ml-auto">
                                        <Button
                                            className="mx-2" size="lg"
                                            variant="outline-light"
                                            as={Link}
                                            to='wishlist'
                                        >
                                            <AiOutlineHeart />
                                        </Button>
                                    </Nav.Link>

                                    <Nav.Link className="ml-auto">
                                        <Button
                                            className="mx-2" size="lg"
                                            variant="outline-light"
                                            as={Link}
                                            to='shoppingCard'
                                        >
                                            <BsCartDash />
                                        </Button>
                                    </Nav.Link>

                                    <Nav.Link className="ml-auto">
                                        <Button
                                            className="mx-2" size="lg"
                                            variant="outline-light"
                                            as={Link}
                                            to='purchases'
                                        >
                                            <BsBagCheck />
                                        </Button>
                                    </Nav.Link>
                                </>
                            }

                            {(token && admin === '1' /*ADMIN*/) &&
                                <>
                                    <Nav.Link className="ml-auto">
                                        <Button
                                            className="mx-2" size="lg"
                                            variant="outline-light"
                                            as={Link}
                                            to='products'
                                        >
                                            Products
                                        </Button>
                                    </Nav.Link>

                                    <Nav.Link className="ml-auto">
                                        <Button
                                            className="mx-2" size="lg"
                                            variant="outline-light"
                                            as={Link}
                                            to='categories'
                                        >
                                            Categories
                                        </Button>
                                    </Nav.Link>

                                    <Nav.Link className="ml-auto">
                                        <Button
                                            className="mx-2" size="lg"
                                            variant="outline-light"
                                            as={Link}
                                            to='brands'
                                        >
                                            Brands
                                        </Button>
                                    </Nav.Link>
                                </>
                            }
                        </div>

                        <Nav className="me-10 gap-3">
                            <Nav.Link className="d-flex gap-1">
                                <NavDropdown

                                    className="justify-content-center"
                                    title="User"
                                    id="basic-nav-dropdown"
                                    style={{ color: 'white' }}
                                >

                                    {token ? (
                                        <>
                                        </>
                                    ) : (
                                        <NavDropdown.Item as={Link} to="login">
                                            Login
                                        </NavDropdown.Item>
                                    )}

                                    {token ? (
                                        <>
                                        </>
                                    ) : (
                                        <NavDropdown.Item as={Link} to="register">
                                            Create an account
                                        </NavDropdown.Item>
                                    )}

                                    {(token && !admin) ? (
                                        <NavDropdown.Item as={Link} to="profile">
                                            Profile
                                        </NavDropdown.Item>
                                    ) : (
                                        <></>
                                    )}

                                    {token ? (
                                        <>
                                            <NavDropdown.Item onClick={out} as={Link}>
                                                Logout
                                            </NavDropdown.Item>
                                        </>
                                    ) : (
                                        <></>
                                    )}


                                </NavDropdown>
                            </Nav.Link>
                        </Nav>
                        <Nav xs sm lg className="d-flex flex-wrap">
                            <Nav.Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
            <section class="section-main">
                <Outlet></Outlet>
            </section>
            <br />
            <Footer />
        </>
    );
}

export default NavBar;