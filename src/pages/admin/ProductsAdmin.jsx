import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, editProduct, fetchProducts } from "../../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProductsAdmin() {
  const dispatch = useDispatch();
  const { items = [], status, error } = useSelector((state) => state.products);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    category: "",
    price: "",
  });
  const [deleteProductId, setDeleteProductId] = useState(null); // To track the product to be deleted
  const [showDeleteModal, setShowDeleteModal] = useState(false); // To show or hide the delete modal
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

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
    dispatch(editProduct({ updatedProduct, _id: editingProduct._id }));
    dispatch(fetchProducts());
    setEditingProduct(null);
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProduct({ id: deleteProductId }));
    dispatch(fetchProducts());
    setShowDeleteModal(false);
    setDeleteProductId(null);
  };

  const openDeleteModal = (productId) => {
    setDeleteProductId(productId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteProductId(null);
  };

  return (
    <>
      <ul role="list" className="divide-y divide-gray-300 ml-10">
        {items.map((product) => (
          <li key={product._id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img className="h-12 w-12 flex-none rounded-sm bg-gray-50" src={product.imageSrc} alt={product.imageAlt} />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{product.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{product.category}</p>
              </div>
            </div>
            <button
              onClick={() => openDeleteModal(product._id)}
              className="bg-red-500 hover:bg-red-700 text-white px-2 h-8 rounded-md"
            >
              Delete
            </button>
            <button
              onClick={() => handleModify(product)}
              className="bg-blue-500 hover:bg-blue-700 text-white px-2 h-8 rounded-md"
            >
              Modify
            </button>
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
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
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
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
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

      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 bg-gray-200 hover:bg-gray-300 py-1.5 px-4 rounded-lg"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-4 rounded-lg"
                onClick={handleDeleteProduct}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-10 rounded"
        onClick={() => navigate("/admin/addProduct")}
      >
        Add Product
      </button>
    </>
  );
}