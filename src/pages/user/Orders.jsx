import { useEffect, useState } from 'react';
import api from '../../utils/axiosIntersepter';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('userId');

  
  useEffect(() => {
      const fetchOrders = async () => {
          try {
              const response = await api.get(`/users/${userId}/orders`);
              setOrders(response.data.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        
        fetchOrders();
    }, []);
    
    console.log(orders[0]);
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center text-2xl text-gray-500">
          <p>You haven't ordered anything yet.</p>
        </div>
      ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{order._id}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm text-gray-500">${order.total_amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{order.status?order.status:"Placed"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)}
    </div>
  );
};

export default OrdersPage;