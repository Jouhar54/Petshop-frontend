import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAdd, setShowAdd] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null); // State to hold product being edited
  const [editFormData, setEditFormData] = useState({
    name: "",
    category: "",
    price: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8002/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8002/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  const handleModify = (product) => {
    setEditingProduct(product);
    setEditFormData({
      name: product.name,
      category: product.category,
      price: product.price,
    });
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    const updatedProduct = {
      name: editFormData.name,
      category: editFormData.category,
      price: editFormData.price,
    };

    axios.put(`http://localhost:8002/products/${editingProduct.id}`, updatedProduct)
      .then((response) => {
        // Update local state with updated product
        const updatedProducts = products.map(product =>
          product.id === response.data.id ? response.data : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
      })
      .catch((error) => {
        console.error("Failed to update product:", error);
      });
  };

  return (
    <>
    <ul role="list" className="divide-y divide-gray-300 ml-10">
      {products.map((product) => (
        <li key={product.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-sm bg-gray-50" src={product.imageSrc} alt={product.imageAlt} />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{product.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{product.category}</p>
            </div>
          </div>
            <button onClick={()=>handleDelete(product.id)}
              className="bg-red-500 hover:bg-red-700 text-white px-2 h-8 rounded-md "
              >Delete</button>
            <button onClick={() => handleModify(product)} 
              className="bg-blue-500 hover:bg-blue-700 text-white px-2 h-8 rounded-md "
              >Modify</button>
          
        </li>
      ))}
    </ul>

    {editingProduct && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmitEdit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">category</label>
                <input
                  id="category"
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  value={editFormData.category}
                  onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" classprice="block text-sm font-medium text-gray-700">price</label>
                <input
                  id="price"
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 bg-gray-200 hover:bg-gray-300 py-1.5 px-4 rounded-lg focus:outline-none"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-4 rounded-lg focus:outline-none"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-10 rounded"
      onClick={()=> navigate('/admin/addProduct')}
    >
      Add Product
    </button>
    
    </>
  )
}
