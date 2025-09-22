import React from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

const FilterBar = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleReset = () => {
    onFilterChange({
      status: "",
      school_id: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
      <div className="flex items-center mb-4">
        <SlidersHorizontal className="w-5 h-5 mr-2 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* 🎨 Status Filter */}
        <div className="flex flex-col">
          <label
            htmlFor="status"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            value={filters.status}
            onChange={handleInputChange}
            className="w-full p-2 text-sm border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {/* 🏫 School ID Filter */}
        <div className="flex flex-col">
          <label
            htmlFor="school_id"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            School ID
          </label>
          <input
            type="text"
            name="school_id"
            id="school_id"
            value={filters.school_id}
            onChange={handleInputChange}
            placeholder="Enter School ID"
            className="w-full bg-white p-2 text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 📅 Start Date Filter */}
        <div className="flex flex-col">
          <label
            htmlFor="startDate"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={filters.startDate}
            onChange={handleInputChange}
            className="w-full bg-white p-2 text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 📅 End Date Filter */}
        <div className="flex flex-col">
          <label
            htmlFor="endDate"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={filters.endDate}
            onChange={handleInputChange}
            className="w-full bg-white p-2 text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 🔄 Reset Button */}
        <div className="flex items-end">
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center p-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
