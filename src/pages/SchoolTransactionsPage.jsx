import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getTransactionsBySchool } from "../services/transactionService";
import TransactionTable from "../components/TransactionTable";
import Pagination from "../components/Pagination";
import { Search } from "lucide-react";

const SchoolTransactionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });
  const [sort] = useState({ field: "created_at", order: "desc" });
  const [schoolId, setSchoolId] = useState(searchParams.get("school_id") || "");
  const [inputSchoolId, setInputSchoolId] = useState(schoolId);

  // 🔄 Fetch transactions when state changes
  const fetchTransactions = useCallback(async () => {
    if (!schoolId) return; // 🛑 Don't fetch if no school ID is set

    try {
      const params = {
        page: searchParams.get("page") || 1,
        limit: searchParams.get("limit") || 10,
        sort: searchParams.get("sort") || "created_at",
        order: searchParams.get("order") || "desc",
      };
      const response = await getTransactionsBySchool(schoolId, params);
      setTransactions(response.data); // ✅ Access data object
      setPagination(response); // ✅ Access pagination object
    } catch (error) {
      console.error(
        `Failed to fetch transactions for school ${schoolId}`,
        error
      );
    }
  }, [schoolId, searchParams]);

  // 🔄 Effect to run on initial load and when dependencies change
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // 🔄 Update URL when state changes
  const handleStateChange = (newState) => {
    const newSearchParams = new URLSearchParams(searchParams);
    for (const key in newState) {
      if (newState[key]) {
        newSearchParams.set(key, newState[key]);
      } else {
        newSearchParams.delete(key);
      }
    }
    setSearchParams(newSearchParams);
  };

  // 🔍 Handle school ID search
  const handleSearch = () => {
    setSchoolId(inputSchoolId);
    handleStateChange({ school_id: inputSchoolId, page: 1 }); // Reset to page 1
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* 🏫 School ID Search */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-full max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={inputSchoolId}
                  onChange={(e) => setInputSchoolId(e.target.value)}
                  placeholder="Enter School ID to search..."
                  className="w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleSearch}
                className="ml-4 flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>

            {schoolId ? (
              <>
                <TransactionTable
                  transactions={transactions}
                  sort={sort}
                  onSortChange={handleStateChange}
                />
                <Pagination
                  pagination={pagination}
                  onPageChange={handleStateChange}
                />
              </>
            ) : (
              <p className="text-center text-gray-500 py-10">
                Please enter a School ID to view transactions.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SchoolTransactionsPage;
