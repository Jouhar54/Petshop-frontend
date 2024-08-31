
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { addToCart } from '../../slices/cartSlice';

export const SingleProduct = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = () => {
        navigate(`/products/${product._id}`);
    };

    return (

        <div key={product._id} >
            <div onClick={()=>handleNavigate} className="cursor-pointer">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
               <p>image</p>
            </div>
                    </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <p >
                            <span aria-hidden="true" />
                            {product.title}
                        </p>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>

                    <button className="text-sm font-semibold leading-6 text-indigo-600 hover:text-red-500"
                        onClick={() => dispatch(addToCart(product))} >Add</button>
                </div>

            </div>
        </div>

    )
}
