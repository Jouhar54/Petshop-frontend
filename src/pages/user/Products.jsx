import { useEffect } from "react"
import { SingleProduct } from "./SingelProduct";
import { fetchProducts } from "../../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

export function Products() {
  const dispatch = useDispatch();
  const { items=[], status, error } = useSelector(state => state.products);

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

  return (
    <div>
      {<div className="bg-white">
        <div className="mx-auto max-w-2xl px-2 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your pet is Hungry</h2>
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {items.map((product) => (
              <SingleProduct key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>}
    </div>
  )
}