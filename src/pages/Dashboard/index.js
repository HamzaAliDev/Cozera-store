import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
// import TableBookings from './TableBooking'
// import CurrentOrders from './CurrentOrders'
// import OrderHistory from './OrderHistory'
// import Feedback from './Feedback'
import UserEmail from './UserEmail'
// import MenuList from './MenuList'
// import AddItem from './AddItem'
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
              {/* <Route path="table-bookings" element={<TableBookings />} />
              <Route path="orders" element={<CurrentOrders />} />
              <Route path="order-history" element={<OrderHistory />} />
              <Route path="user-feedback" element={<Feedback />} /> */}
              <Route path="users-email" element={<UserEmail />} />
              {/* <Route path="menu-list" element={<MenuList />} />
              <Route path="add-new-item" element={<AddItem />} /> */}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
