import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../utils/axiosIntersepter';
import { useState } from 'react';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.number().required('Required').positive('Price must be positive'),
  imageSrc: Yup.string().url('Invalid URL').required('Required'),
});

const AddNewProduct = () => {
  const [error, setError] = useState(null); // To hold error messages

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
      console.log('Product added successfully');
      resetForm();
    } catch (err) {
      setError(`Failed to add product: ${err.message}`);
      console.log(`Failed ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-max mx-10 mt-3 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Formik
        initialValues={
          {
            name: '',
            category: '',
            description: '',
            price: '',
            imageSrc: ''
          }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Product Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category">Category</label>
              <Field
                type="text"
                id="category"
                name="category"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">Product Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="price">Product Price</label>
              <Field
                type="number"
                id="price"
                name="price"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="imageSrc">Product Image URL</label>
              <Field
                type="text"
                id="imageSrc"
                name="imageSrc"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="imageSrc" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-indigo-600 text-white font-medium text-sm leading-5 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? 'Submitting...' : 'Add Product'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewProduct;