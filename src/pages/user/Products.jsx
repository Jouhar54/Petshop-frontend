import { useEffect, useState } from "react"
import { SingleProduct } from "./SingelProduct";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../slices/productSlice";
import SearchComponent from "../../Components/Search";
import { useDispatch, useSelector } from "react-redux";

export function Products() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const params = useParams();
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const filteredProducts = items.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredProducts);
  return (
    <div>
      <SearchComponent setSearchTerm={setSearchTerm} />
    {filteredProducts.id ? (<div>Single Product</div>) : (<div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your pet is Hungry</h2>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <SingleProduct key={product.id} product={product}/>
            ))}
        </div>
      </div>
    </div>) }
    </div>
  )
}
