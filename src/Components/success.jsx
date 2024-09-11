import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import api from "../utils/axiosIntersepter";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let isSuccess = true;
    const fetchData = async () => {
      try {
        const response = await api.get(`/users`);
        if (response.status === 200 && isSuccess)
          toast.success("Payment successful");
        navigate("/");
      } catch (error) {
        console.log(error.message);
        navigate("/");
      }
    };
    const timeoutId = setTimeout(fetchData, 3000);

    return () => {
      isSuccess = false;
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <Toaster />
      <img
        src="https://cdn.dribbble.com/users/253392/screenshots/6906291/check.gif"
        alt="Success"
        className="w-48 h-48 object-cover mb-6"
      />
      <h1 className="text-2xl font-semibold text-green-700 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-600">
        Thank you for your purchase. Your transaction has been completed successfully.
      </p>
    </div>
  );
};

export default Success;