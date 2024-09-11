import { useEffect, useState } from "react";
import api from "../../utils/axiosIntersepter";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/admin/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    api.get(`/admin/orders`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleDelete = (_id) => {
    api.delete(`admin/users/${_id}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== _id));
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  const grandTotal = orders.reduce((total, order) => total + order.total_amount, 0);
  console.log(orders);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 w-full bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-xl font-semibold mb-4">User List</h1>
          <ul role="list" className="divide-y divide-gray-200">
            {users.map((person) => (
              <li key={person._id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4 items-center">

                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {person.username}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {person.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(person._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 h-8 rounded-md"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:w-1/2 w-full bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-xl font-semibold mb-4">Order Details</h1>
          <div className="mt-4">
            <ul role="list" className="divide-y divide-gray-200">
              {orders.map((order) => (
                <li key={order._id} className="py-2 flex flex-col">
                  {order.products.map((item) => (
                    <div key={item.productId._id} className="flex justify-between items-center py-2">
                      <div className="flex items-center gap-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            Product: {item.productId.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ₹{item.productId.price * item.quantity}
                      </p>
                    </div>
                  ))}

                  <p className="text-sm font-medium text-gray-900 mt-2">
                    Total Amount: ₹{order.total_amount}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Grand Total: ₹{grandTotal}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}