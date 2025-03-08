import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Home from './Home'
import Shop from './Shop'
import Blog from './Blog'
import Contact from './Contact'
import About from './About'
import ShopDetail from './ShopDetail'
import BlogDetail from './BlogDetail'
import Checkout from './Checkout'
import ShoppingCart from './ShoppingCart'
import Wishlist from './Wishlist'

export default function Frontend() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='shop' element={<Shop />} />
                <Route path='blog' element={<Blog />} />
                <Route path='contact' element={<Contact/>} />
                <Route path='about' element={<About/>} />
                <Route path='shop-detail' element={<ShopDetail/>} />
                <Route path='blog-detail' element={<BlogDetail/>} />
                <Route path='checkout' element={<Checkout/>} />
                <Route path='shopping-cart' element={<ShoppingCart/>} />
                <Route path='wishlist' element={<Wishlist/>} />
            </Routes>
            <Footer />
        </>
    )
}
