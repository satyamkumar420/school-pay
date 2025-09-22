import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ pagination, onPageChange }) => {
  // 🛡️ Safeguard against undefined pagination prop
  if (!pagination || pagination.totalPages <= 1) {
    return null; // Or a loading spinner, or an empty div
  }

  const { page, totalPages } = pagination;

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange({ page: page - 1 });
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange({ page: page + 1 });
    }
  };

  return (
    <div className="flex items-center justify-between mt-6">
      {/* ⬅️ Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={page <= 1}
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </button>

      {/* 📄 Page Info */}
      <span className="text-sm text-gray-700">
        Page <span className="font-semibold">{page}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </span>

      {/* ➡️ Next Button */}
      <button
        onClick={handleNext}
        disabled={page >= totalPages}
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
};

export default Pagination;
