import { Outlet, Navigate } from 'react-router-dom'
const ProtectRouter = () => {
  const user = localStorage.getItem("email")

  return user==='admin@gmail.com'  ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectRouter