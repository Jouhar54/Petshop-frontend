import Modal from 'react-modal';
import { useEffect, useState } from "react";
import api from "../../utils/axiosIntersepter";

// Set the app element for accessibility
Modal.setAppElement('#root');

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedUserOrders, setSelectedUserOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

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
        setIsDeleteModalOpen(false);
        setUserIdToDelete(null);
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  const handleViewOrders = (userId) => {
    const userOrders = orders.filter(order => String(order.userId) === String(userId));
    setSelectedUserOrders(userOrders);
    setIsModalOpen(true);
  };

  const grandTotal = orders.reduce((total, order) => total + order.total_amount, 0);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* User List Section */}
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
                <div className="flex gap-x-4">
                  <button
                    onClick={() => handleViewOrders(person._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 h-8 rounded-md"
                  >
                    View Orders
                  </button>
                  <button
                    onClick={() => {
                      setUserIdToDelete(person._id);
                      setIsDeleteModalOpen(true);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 h-8 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Grand Total Section */}
        <div className="md:w-1/2 w-full bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-xl font-semibold mb-4">Order Summary</h1>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Grand Total: ₹{grandTotal}</h2>
          </div>
        </div>
      </div>

      {/* Modal for Viewing Orders */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed z-10 inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75" // Adjusted overlay opacity
      >
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-50">
          <h2 className="text-xl font-semibold">Order Details</h2>
          <ul role="list" className="divide-y divide-gray-200 mt-4">
            {selectedUserOrders.map((order) => (
              <li key={order._id} className="py-2 flex flex-col">
                {order.products.map((item) => (
                  <div key={item.productId?._id || item._id} className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          Product: {item.productId?.name || 'Unknown Product'}
                        </p>
                        <p className="text-xs text-gray-500">
                          Quantity: {item.quantity || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{(item.productId?.price || 0) * item.quantity}
                    </p>
                  </div>
                ))}

                <p className="text-sm font-medium text-gray-900 mt-2">
                  Total Amount: ₹{order.total_amount}
                </p>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Confirmation Modal for Deleting User */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="fixed z-10 inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75" // Adjusted overlay opacity
      >
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-50">
          <h2 className="text-xl font-semibold">Confirm Deletion</h2>
          <p className="mt-4 text-sm text-gray-700">Are you sure you want to delete this user? This action cannot be undone.</p>
          <div className="flex gap-x-4 mt-6">
            <button
              onClick={() => {
                if (userIdToDelete) {
                  handleDelete(userIdToDelete);
                }
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md"
            >
              Confirm
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UsersAdmin;