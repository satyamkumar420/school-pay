import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getTransactionStatus } from "../services/transactionService";
import { Search } from "lucide-react";

const TransactionStatusPage = () => {
  const [customOrderId, setCustomOrderId] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCustomOrderId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customOrderId) {
      setError("Please enter a Custom Order ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setTransaction(null);

    try {
      const data = await getTransactionStatus(customOrderId);
      setTransaction(data);
    } catch (err) {
      setError(err.message || "Failed to fetch transaction status.");
    } finally {
      setLoading(false);
    }
  };

  // 🎨 Status badge component for visual appeal
  const StatusBadge = ({ status }) => {
    const baseClasses = "px-2.5 py-1 text-sm font-medium rounded-full";
    let statusClasses = "";

    switch (status) {
      case "Success":
        statusClasses = "bg-green-100 text-green-800";
        break;
      case "Pending":
        statusClasses = "bg-yellow-100 text-yellow-800";
        break;
      case "Failed":
        statusClasses = "bg-red-100 text-red-800";
        break;
      default:
        statusClasses = "bg-gray-100 text-gray-800";
    }

    return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="flex items-center mb-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={customOrderId}
                  onChange={handleInputChange}
                  placeholder="Enter Custom Order ID..."
                  className="w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="ml-4 flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 text-nowrap"
              >
                {loading ? "Checking..." : "Check Status"}
              </button>
            </form>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {transaction && (
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Transaction Details
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Status:</span>
                    <StatusBadge status={transaction.status} />
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Order ID:</span>
                    <span className="text-gray-800">
                      {transaction.custom_order_id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Amount:</span>
                    <span className="text-gray-800">{transaction.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Date:</span>
                    <span className="text-gray-800">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransactionStatusPage;
