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
import ProtectRouter from './utils/protectRoute'
import Success from './Components/success'
import OrdersPage from './pages/user/Orders'
import UserProtectRouter from './utils/UserProtect'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route element={<UserProtectRouter />}>
            <Route path='/cart' element={<Cart />} />
            <Route path='/success' element={<Success />} />
            <Route path='/orders' element={<OrdersPage />} />
          </Route>
        </Route>
        <Route path='/login' element={<Login />} />

        <Route element={<ProtectRouter />}>
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='/admin' element={<AdminHandle />} />
            <Route path='/admin/addProduct' element={<AddNewProduct />} />
            <Route path='/admin/usersAdmin' element={<UsersAdmin />} />
            <Route path='/admin/productsAdmin' element={<ProductsAdmin />} />
          </Route>
        </Route>

      </Routes>
    </>
  )
}

export default App
