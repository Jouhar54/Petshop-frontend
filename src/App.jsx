import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/user/Home'
import { Login } from './pages/user/Login'
import { Products } from './pages/user/Products'
import { Layout } from './pages/user/Layout'
import UsersAdmin from './pages/admin/UsersAdmin'
import ProductsAdmin from './pages/admin/ProductsAdmin'
import AdminHandle from './pages/admin/AdminHandle'
import AddNewProduct from './pages/admin/AddNewProduct'
import AdminLayout from './pages/admin/adminLayout'
import { Cart } from './pages/user/Cart'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<Products />} />
        </Route>
        <Route path='/login' element={<Login />} />

        <Route path='/admin' element={<AdminLayout />}>
          <Route path='/admin' element={<AdminHandle />} />
          <Route path='/admin/addProduct' element={<AddNewProduct />} />
          <Route path='/admin/usersAdmin' element={<UsersAdmin />} />
          <Route path='/admin/productsAdmin' element={<ProductsAdmin />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
