import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { Link, Outlet, useNavigate } from "react-router-dom";

// Import icons from react-icons
import { MdCategory } from 'react-icons/md';  // Correct category icon
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'; // Cart and User icons
import { FaPowerOff } from 'react-icons/fa'; // Power icon

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md">
        <Card className="h-screen p-6 bg-white">
          <div className="mb-8 text-center">
            <Typography
              variant="h5"
              className="text-blue-gray-800 font-bold tracking-wide"
            >
              Admin Dashboard
            </Typography>
          </div>
          <List className="space-y-4">
            <ListItem className="hover:bg-blue-50 transition-colors rounded-lg p-3">
              <ListItemPrefix>
                <MdCategory className="h-6 w-6 text-blue-600" />
              </ListItemPrefix>
              <Link to="/admin" className="text-blue-gray-800 font-semibold">
                Category
              </Link>
            </ListItem>
            <ListItem className="hover:bg-blue-50 transition-colors rounded-lg p-3">
              <ListItemPrefix>
                <AiOutlineShoppingCart className="h-6 w-6 text-blue-600" />
              </ListItemPrefix>
              <Link to="/admin/addProduct" className="text-blue-gray-800 font-semibold">
                New Product
              </Link>
            </ListItem>
            <ListItem className="hover:bg-blue-50 transition-colors rounded-lg p-3">
              <ListItemPrefix>
                <AiOutlineShoppingCart className="h-6 w-6 text-blue-600" />
              </ListItemPrefix>
              <Link to="/admin/productsAdmin" className="text-blue-gray-800 font-semibold">
                Products
              </Link>
            </ListItem>
            <ListItem className="hover:bg-blue-50 transition-colors rounded-lg p-3">
              <ListItemPrefix>
                <AiOutlineUser className="h-6 w-6 text-blue-600" />
              </ListItemPrefix>
              <Link to="/admin/usersAdmin" className="text-blue-gray-800 font-semibold">
                Users
              </Link>
            </ListItem>
            <ListItem className="hover:bg-red-50 transition-colors rounded-lg p-3">
              <ListItemPrefix>
                <FaPowerOff className="h-6 w-6 text-red-600" />
              </ListItemPrefix>
              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold w-full text-left"
              >
                Log Out
              </button>
            </ListItem>
          </List>
        </Card>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-4">
        <Outlet />
      </main>
    </div>
  );
}