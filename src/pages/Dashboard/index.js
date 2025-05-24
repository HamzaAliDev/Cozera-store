import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import UserEmail from './UserEmail'
import LayoutDesign from '../../components/LayoutDesign'
import { Layout } from 'antd'
import Products from './Products';
import AddProduct from './AddProduct';
import Orders from './Orders';

const { Content } = Layout;
export default function Dashboard() {
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <LayoutDesign />
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/add-products' element={<AddProduct />} />
              <Route path='/orders' element={<Orders />} />
              <Route path="users-email" element={<UserEmail />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
