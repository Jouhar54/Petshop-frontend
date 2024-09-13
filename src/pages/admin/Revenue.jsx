import { useEffect, useState } from 'react';
import api from '../../utils/axiosIntersepter';

const RevenuePage = () => {

    return (
        < div className="md:w-1/2 w-full bg-white shadow-lg rounded-lg p-6" >
            <h1 className="text-xl font-semibold mb-4">Order Summary</h1>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Grand Total: ₹{grandTotal}</h2>
            </div>
        </div >
    );
};

export default RevenuePage;