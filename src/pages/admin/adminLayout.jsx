import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
import { Link,  Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

  
   
  export default function AdminLayout() {
    const navigate = useNavigate();
  
    return (
      <div className="flex h-screen">
        <aside>
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Admin Page
          </Typography>
        </div>
        <List>
          <ListItem >
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to='/admin'>Category</Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to='/admin/addProduct'>New Product</Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to='/admin/productsAdmin'>Products</Link>
            
          </ListItem>
          
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to='/admin/usersAdmin'>Users</Link>
          </ListItem>
          
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            <button onClick={()=>{
              localStorage.removeItem('userData');
              navigate('/login')
            }}>Log Out</button>
          </ListItem>
        </List>
      </Card>
      </aside>
      <main>
        <Outlet />
      </main>
      <footer>

      </footer>
      </div>
    );
  }