import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AdminHandle = () => {
  const [category, setCategory] = useState("cat");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const filteredProducts = products.filter((product) => product.category === category);

  return (
    <>
  <div className="flex space-x-4 m-4">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-5 py-1 rounded-md"
      onClick={()=>setCategory("cat")}
      >
      CAT
    </button>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-5 py-1 rounded-md"
      onClick={()=>setCategory("dog")}
    >
      DOG
    </button>
  </div>
  <ul role="list" className="divide-y divide-gray-300 ml-10">
      {filteredProducts.map((product) => (
        <li key={product.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-sm bg-gray-50" src={product.imageSrc} alt={product.imageAlt} />
              <p className="text-sm font-semibold leading-6 text-gray-900">{product.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{product.category}</p>
              <p className="text-sm font-semibold leading-6 text-gray-900">{product.price}</p>
          </div>
        </li>
      ))}
    </ul>
  </>
  )
}

export default AdminHandle