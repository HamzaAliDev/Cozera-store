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
            </Routes>
            <Footer />
        </>
    )
}
