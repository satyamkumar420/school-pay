import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getTransactions } from "../services/transactionService";
import TransactionTable from "../components/TransactionTable";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";

const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });

  const [sort] = useState({ field: "created_at", order: "desc" });
  const [filters] = useState({
    status: "",
    school_id: "",
    startDate: "",
    endDate: "",
  });

  // 🔄 Fetch transactions when state changes
  const fetchTransactions = useCallback(async () => {
    try {
      const params = {
        page: searchParams.get("page") || 1,
        limit: searchParams.get("limit") || 10,
        sort: searchParams.get("sort") || "created_at",
        order: searchParams.get("order") || "desc",
        status: searchParams.get("status") || "",
        school_id: searchParams.get("school_id") || "",
        startDate: searchParams.get("startDate") || "",
        endDate: searchParams.get("endDate") || "",
      };
      const response = await getTransactions(params);
      setTransactions(response.data); // ✅ Access data object
      setPagination(response); // ✅ Access pagination object
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  }, [searchParams]);

  // 🔄 Effect to run on initial load and when searchParams change
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

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Transactions Overview
            </h2>
            <FilterBar filters={filters} onFilterChange={handleStateChange} />
            <TransactionTable
              transactions={transactions}
              sort={sort}
              onSortChange={handleStateChange}
            />
            <Pagination
              pagination={pagination}
              onPageChange={handleStateChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
