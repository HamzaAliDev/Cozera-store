import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import PrivateAuthRoutes from '../../components/PrivateAuthRoutes'

export default function Auth() {
  return (
    <Routes>
      <Route path='/login' element={<PrivateAuthRoutes Component={Login} />} />
      <Route path='/register' element={<PrivateAuthRoutes Component={Register} />} />
    </Routes>
  )
}
