import React from 'react';
import { BrowserRouter, Route, Routes, Router } from "react-router-dom"

import NavBar from './NavFoot';
import LandingPage from './LadingPage';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import AllProducts from './AllProducts';
import OneProduct from './OneProduct';
import Purchase from './Purchases';
import WhisList from './WishList';
import ShoppingCart from './ShoppingCart';
import Product from './Product';
import NewProduct from './NewProduct';
import UpdateProduct from './UpdateProduct';
import Category from './Category';
import Brand from './Brand';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function App() {
    return (
        <div className="App" class="div-main">
            <BrowserRouter>
                <Routes>
                    <Route path="/Discos/public/" element={<NavBar />}>
                        <Route index element={<LandingPage />} />
                        <Route path='register' element={<Register/>}/>
                        <Route path='login' element={<Login/>}/>
                        <Route path='profile' element={<Profile/>}/>
                        <Route path="allProducts" element={<AllProducts />}/>
                        <Route path="allProducts/:product" element={<OneProduct />}/>
                        <Route path="purchases" element={<Purchase />}/>
                        <Route path="wishlist" element={<WhisList />}/>
                        <Route path="shoppingCard" element={<ShoppingCart />}/>
                        <Route path="products" element={<Product />}/>
                        <Route path="newProduct" element={<NewProduct />}/>
                        <Route path="updateProduct/:product" element={<UpdateProduct />}/>
                        <Route path="categories" element={<Category />}/>
                        <Route path="brands" element={<Brand />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}