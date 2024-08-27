import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminLayout from './adminLayout'
import AddNewProduct from './AddNewProduct'

const AdminPage = () => {
  return (
   <div>
    <AddNewProduct/>
    </div>
  )
}

export default AdminPage