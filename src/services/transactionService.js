import api from "./api";

const getTransactions = async (params) => {
  try {
    // 📡 Make the API call
    const response = await api.get("/transactions", { params });

    // ✅ Return the data
    return response.data;
  } catch (err) {
    // 🚨 Handle errors
    console.error("Failed to fetch transactions:", err);
    throw err.response ? err.response.data : { message: "An error occurred" };
  }
};

const getTransactionsBySchool = async (schoolId, params) => {
  try {
    // 📡 Make the API call
    const response = await api.get(`/transactions/school/${schoolId}`, {
      params,
    });

    // ✅ Return the data
    return response.data;
  } catch (err) {
    // 🚨 Handle errors
    console.error(`Failed to fetch transactions for school ${schoolId}:`, err);
    throw err.response ? err.response.data : { message: "An error occurred" };
  }
};

const getTransactionStatus = async (customOrderId) => {
  try {
    // 📡 Make the API call
    const response = await api.get(`/transaction/status/${customOrderId}`);

    // ✅ Return the data
    return response.data;
  } catch (err) {
    // 🚨 Handle errors
    console.error(
      `Failed to fetch transaction status for order ${customOrderId}:`,
      err
    );
    throw err.response ? err.response.data : { message: "An error occurred" };
  }
};

export { getTransactions, getTransactionsBySchool, getTransactionStatus };
