import { Outlet, Navigate } from 'react-router-dom'
const UserProtectRouter = () => {
  const user = localStorage.getItem("accessToken")

  return user ? <Outlet/> : <Navigate to="/login"/>
}

export default UserProtectRouter