import { useEffect, useMemo, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeProduct, fetchCart } from '../../slices/cartSlice';
import api from '../../utils/axiosIntersepter';
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY

export function Cart() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const { items=[], status, error } = useSelector(state => state.cart);
  const email = localStorage.getItem('email')
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = useMemo(() => {
    return items.reduce((sum, product) => sum + product._id.price * product.quantity, 0);
  }, [items]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const handleCheckout = async () => {
    try {
      const response = await api.post('/users/create-checkout-session', {
        cartItems: items.map(item => ({
          name: item._id.name,
          imageSrc: item._id.imageSrc,
          price: item._id.price,
          quantity: item.quantity,
        })),
        email,
        userId
      });
  
      const stripe = window.Stripe(stripePublicKey);
      const { id } = response.data;
      await stripe.redirectToCheckout({ sessionId: id });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Transition show={open}>
        <Dialog className="relative z-50" onClose={setOpen}>
          <TransitionChild
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {items.map((product, index) => (
                                <li key={`${product._id}-${index}`} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product._id.imageSrc}
                                      alt={product._id.imageAlt}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>{product._id.name}</a>
                                        </h3>
                                        <p className="ml-4">${product._id.price * product.quantity}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{product._id.category}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center space-x-2">
                                        <button
                                          type="button"
                                          className="text-gray-500 p-1"
                                          onClick={() => dispatch(updateQuantity({ id: product._id._id, quantity: product.quantity >= 1 ? product.quantity - 1 : 0 }))}
                                        >
                                          -
                                        </button>
                                        <p className="text-gray-500">{product.quantity}</p>
                                        <button
                                          type="button"
                                          className="text-gray-500 p-1"
                                          onClick={() => dispatch(updateQuantity({ id: product._id._id, quantity: product.quantity + 1 }))}
                                        >
                                          +
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() => dispatch(removeProduct(product._id._id))}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>

                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {items.length > 0 ? (
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${total.toFixed(2)}</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                          <div className="mt-6">
                            <button id="rzp-button1"
                              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                              onClick={handleCheckout}
                            >
                              Checkout
                            </button>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                              or{' '}
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => setOpen(false)}
                              >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </p>
                          </div>
                        </div>
                      ) : (<h1 className='mb-10  text-center text-base'>Empty Cart</h1>)
                      }
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
