import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import api from "../../utils/axiosIntersepter";
import toast, { Toaster } from 'react-hot-toast';

export function Login() {
  const navigate = useNavigate();
  const [action, setAction] = useState('Login');

  const handleAction = () => {
    setAction('Sign up');
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password must be greater than 6 characters')
      .required('Required'),
    ...(action === 'Sign up' && {
      username: Yup.string()
        .min(3, 'Share your full name with us')
        .required('Required'),
    })
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (action === 'Sign up') {
        api.post(`users/register`, values)
          .then((res) => {
            console.log('Signed up successfully:', res.data);
            toast.success('Signed up successfully');
            setAction('login')
          })
          .catch((err) => {
            console.error('Failed to sign up:', err.message);
            toast.error('Failed to sign up');
          });
      } else {
        api.post(`users/login`, { email: values.email, password: values.password })
          .then((res) => {
            localStorage.setItem('userId', res.data.data._id);
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('email', res.data.data.email);
            console.log(res.data);
            navigate("/")
            toast.success(`Logged in successfully`)
            // window.location.reload();
            if (res.data.data.email === 'admin@gmail.com') {
              navigate('/admin')
            }
          }).catch((err) => {
            toast.error(`Create a new account: ${err.message}`);
          })
      }
    },
  });

  return (
    <>
      <Toaster />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {action} to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            {action === 'Sign up' && (
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    User Name
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="current-username"
                    {...formik.getFieldProps('username')}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-600">{formik.errors.username}</div>
                ) : null}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...formik.getFieldProps('email')}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  {...formik.getFieldProps('password')}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600">{formik.errors.password}</div>
              ) : null}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {action}
              </button>
            </div>
          </form>

          {action === 'Sign up' ? (
            <button onClick={() => setAction('Login')} className="mt-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Back to login
            </button>
          ) : (
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <button onClick={handleAction} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Create a new account
              </button>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
