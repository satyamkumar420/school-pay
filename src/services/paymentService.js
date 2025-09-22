// 🚀 Import the API utility
import api from "./api";

/**
 * @description Create a new payment request
 * @param {object} paymentData - The payment data
 * @param {number} paymentData.amount - The payment amount
 * @param {object} paymentData.student_info - The student's information
 * @param {string} paymentData.student_info.name - The student's name
 * @param {string} paymentData.student_info.id - The student's ID
 * @param {string} paymentData.student_info.email - The student's email
 * @returns {Promise<any>} The response from the API
 */
export const createPayment = async (paymentData) => {
  try {
    // 📞 Make the API call to create a payment
    const response = await api.post("/payment/create-payment", paymentData);
    // ✅ Return the response data
    return response.data;
  } catch (error) {
    // ❌ Handle any errors
    console.error("Error creating payment:", error);
    throw error;
  }
};
