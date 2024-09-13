import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../utils/axiosIntersepter';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchProducts } from '../../slices/productSlice';
import { useDispatch } from 'react-redux';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Product name is required'),
  category: Yup.string().required('Category is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  imageSrc: Yup.string().url('Invalid URL').required('Image URL is required'),
});

const AddNewProduct = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const notify = () => toast.success('Product Added Successfully');

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const newProduct = {
      ...values,
      price: Number(values.price),
      quantity: 1,
    };

    try {
      await api.post("/admin/products", newProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      notify();
      dispatch(fetchProducts());
      resetForm();
    } catch (err) {
      setError(`Failed to add product: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <Formik
        initialValues={{
          name: '',
          category: '',
          description: '',
          price: '',
          imageSrc: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Product Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">Category</label>
                <Field
                  type="text"
                  id="category"
                  name="category"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="category" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">Product Description</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows="4"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="description" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">Price</label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="price" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="imageSrc">Image URL</label>
                <Field
                  type="text"
                  id="imageSrc"
                  name="imageSrc"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="imageSrc" component="div" className="text-red-600 text-sm mt-1" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isSubmitting ? 'Submitting...' : 'Add Product'}
            </button>
          </Form>
        )}
      </Formik>
      <Toaster />
    </div>
  );
};

export default AddNewProduct;