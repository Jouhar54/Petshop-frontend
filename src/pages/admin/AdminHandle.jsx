import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../slices/productSlice';

const AdminHandle = () => {
  const [category, setCategory] = useState("cat");
  const dispatch = useDispatch();
  const { items = [], status, error } = useSelector(state => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  const filteredProducts = items.filter((product) => product.category === category);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 flex justify-center space-x-4">
        <button
          className={`px-4 py-2 font-semibold text-white rounded-md ${category === "cat" ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-600"}`}
          onClick={() => setCategory("cat")}
        >
          CAT
        </button>
        <button
          className={`px-4 py-2 font-semibold text-white rounded-md ${category === "dog" ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-600"}`}
          onClick={() => setCategory("dog")}
        >
          DOG
        </button>
      </div>
      
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <li key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="relative">
              <img className="w-full h-48 object-cover" src={product.imageSrc} alt={product.imageAlt} />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-white text-lg font-semibold truncate">{product.name}</p>
                <p className="text-gray-300 text-sm truncate">{product.category}</p>
                <p className="text-white text-lg font-bold">${product.price}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminHandle;