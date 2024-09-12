
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../slices/cartSlice';
import toast, { Toaster } from 'react-hot-toast';

export const SingleProduct = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = () => {
        navigate(`/products/${product._id}`);
    };

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        toast.success(`${product.name} added to cart!`); // Show success toast
    };

    return (

        <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden group">
            <Toaster />
            <div
                onClick={handleNavigate}
                className="relative cursor-pointer hover:scale-105 transition-transform duration-300"
            >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                    <img
                        src={product.imageSrc}
                        alt="Product Image"
                        className="object-cover object-center w-full h-full rounded-t-lg"
                    />
                </div>
                <div className="absolute top-2 right-2 bg-white px-2 py-1 text-xs font-semibold text-indigo-600 rounded-md shadow">
                    New
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-md font-semibold text-gray-900 truncate">
                    <p>{product.name}</p>
                </h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-lg font-bold text-gray-900 mt-2">$ {product.price}</p>

                <button
                    className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold leading-6 hover:bg-red-500 transition-colors duration-300"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>

    )
}