import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Cart } from './Cart'
import { useSelector } from 'react-redux'


export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart)

  const logedUser = localStorage.getItem('userId');

  const handleShowCart = () => {
    (logedUser ? setShowCart(!showCart) : navigate('/login'))
  }

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');
    navigate('/login');
    window.location.reload();
  };

  return (
    <>
      <header className="bg-white shadow-md">
  <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div className="flex lg:flex-1">
      <Link to="/" className="flex items-center -m-1.5 p-1.5">
        <img className="h-8 w-auto" src="src/assets/logo/logo.png" alt="Pet Shop" />
        <h1 className="text-lg font-semibold leading-6 text-gray-600 ml-2">Pet Food Co.</h1>
      </Link>
    </div>

    {/* Mobile menu button */}
    <div className="flex lg:hidden">
      <button
        type="button"
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        <span className="sr-only">Open main menu</span>
      </button>
    </div>

    {/* Desktop Navigation */}
    <PopoverGroup className="hidden lg:flex lg:gap-x-12">
      <Link to="/" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600">
        Home
      </Link>
      <Link to="/products" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600">
        Products
      </Link>
    </PopoverGroup>

    {/* Icons (Cart, Orders, Profile) */}
    <div className="hidden lg:flex lg:flex-1 lg:justify-center space-x-6">
      {/* Cart Icon */}
      <button className="relative py-2" onClick={handleShowCart}>
        <div className="absolute top-0 left-3">
          <p className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-1 text-xs text-white">
            {items ? items.length : 0}
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 text-gray-700 hover:text-indigo-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        {showCart && <Cart />}
      </button>
      
      {/* Orders Icon */}
      <Link to="/orders" className="relative py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 text-gray-700 hover:text-indigo-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 6.75V6A3.75 3.75 0 0111.25 2.25h1.5A3.75 3.75 0 0116.5 6v.75m-9 0a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-3A2.25 2.25 0 014.5 19.5V9.75A2.25 2.25 0 016.75 7.5h3zm7.5 0a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-3a2.25 2.25 0 01-2.25-2.25V9.75a2.25 2.25 0 012.25-2.25h3zM6 19.5v.75M18 19.5v.75"
          />
        </svg>
      </Link>

      {/* Profile Icon */}
      <Link to="/profile" className="relative py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 text-gray-700 hover:text-indigo-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 12a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5zM4.5 20.25A8.5 8.5 0 0112 14.25a8.5 8.5 0 017.5 6M4.5 20.25h15"
          />
        </svg>
      </Link>
    </div>

    {/* Log In/Out Buttons */}
    {logedUser ? (
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600">
          Log out
        </button>
      </div>
    ) : (
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600">
          Log in
        </Link>
      </div>
    )}
  </nav>

  {/* Mobile Menu */}
  <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
    <div className="fixed inset-0 z-10" />
    <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div className="flex items-center justify-between">
        <img className="h-8 w-auto" src="src/assets/logo/logo.png" alt="Pet Shop" />
        <button
          type="button"
          className="rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(false)}
        >
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">Close menu</span>
        </button>
      </div>

      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6">
            <Link to="/" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
              Home
            </Link>
            <Link to="/products" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
              Products
            </Link>
            <Link to="/orders" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
              Orders
            </Link>
            <Link to="/cart" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
              Cart
            </Link>
            <Link to="/profile" className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </DialogPanel>
  </Dialog>
</header>


      <main >
        <Outlet />
      </main>

      <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:py-16 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between mb-10">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white">Stay Connected</h2>
              <p className="mt-2 text-sm">
                Follow us on social media and stay updated with the latest news!
              </p>
            </div>

            <ul className="mt-8 flex justify-center sm:mt-0 sm:justify-end space-x-6">
              <li>
                <a href="https://facebook.com" rel="noreferrer" target="_blank" className="hover:opacity-75 transition-opacity">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" rel="noreferrer" target="_blank" className="hover:opacity-75 transition-opacity">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://x.com" rel="noreferrer" target="_blank" className="hover:opacity-75 transition-opacity">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://github.com" rel="noreferrer" target="_blank" className="hover:opacity-75 transition-opacity">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.87 8.174 6.839 9.496.5.092.682-.217.682-.482v-1.7c-2.782.603-3.37-1.344-3.37-1.344-.454-1.17-1.11-1.481-1.11-1.481-.907-.623.07-.61.07-.61 1.003.071 1.531 1.034 1.531 1.034.892 1.53 2.34 1.088 2.91.832.091-.647.35-1.087.635-1.338-2.22-.252-4.555-1.116-4.555-4.963 0-1.095.389-1.992 1.025-2.694-.102-.253-.444-1.27.097-2.648 0 0 .835-.267 2.736 1.023A9.514 9.514 0 0112 7.677c.846.004 1.698.115 2.493.336 1.9-1.29 2.735-1.023 2.735-1.023.542 1.379.2 2.395.098 2.648.638.702 1.024 1.6 1.024 2.694 0 3.858-2.338 4.707-4.566 4.955.358.308.676.918.676 1.851v2.74c0 .267.181.578.687.48C19.13 20.19 22 16.441 22 12.017 22 6.484 17.523 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center text-sm mt-8">
            <p>&copy; 2024 YourCompany. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </>
  )
}