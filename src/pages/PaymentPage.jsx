// 🚀 Import necessary hooks and services
import React, { useState } from "react";
import { createPayment } from "../services/paymentService";

// 🎨 Define the PaymentPage component
const PaymentPage = () => {
  // 📝 State for form data
  const [formData, setFormData] = useState({
    amount: "",
    student_info: {
      name: "",
      id: "",
      email: "",
    },
  });

  // 🔄 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.student_info) {
      setFormData((prevData) => ({
        ...prevData,
        student_info: {
          ...prevData.student_info,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // 🚀 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 📞 Call the createPayment service
      const response = await createPayment(formData);
      // 🔗 Redirect to the payment gateway
      if (response && response.collect_request_url) {
        window.location.href = response.collect_request_url;
      }
    } catch (error) {
      // ❌ Handle any errors
      console.error("Failed to create payment:", error);
    }
  };

  // 🎨 Render the payment form
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Payment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Student Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.student_info.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-700"
          >
            Student ID
          </label>
          <input
            type="text"
            name="id"
            id="id"
            value={formData.student_info.id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Student Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.student_info.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
