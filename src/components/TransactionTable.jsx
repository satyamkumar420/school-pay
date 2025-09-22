import React from "react";
import { ChevronsUpDown, ArrowUp, ArrowDown } from "lucide-react";

const TransactionTable = ({ transactions, sort, onSortChange }) => {
  const handleSort = (field) => {
    const order = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    onSortChange({ sort: field, order });
  };

  // 🎨 Render sort icon based on current sort state
  const renderSortIcon = (field) => {
    if (sort.field !== field) {
      return <ChevronsUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sort.order === "asc" ? (
      <ArrowUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-blue-600" />
    );
  };

  // 🎨 Status badge component for visual appeal
  const StatusBadge = ({ status }) => {
    const baseClasses = "px-2.5 py-1 text-xs font-medium rounded-full";
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
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
        <thead className="bg-gray-50">
          <tr>
            {[
              { key: "collect_id", label: "Collect ID" },
              { key: "school_id", label: "School ID" },
              { key: "gateway", label: "Gateway" },
              { key: "order_amount", label: "Order Amount" },
              { key: "transaction_amount", label: "Transaction Amount" },
              { key: "status", label: "Status" },
              { key: "student_info.name", label: "Student Name" },
              { key: "student_info.id", label: "Student ID" },
              { key: "student_info.email", label: "Student Email" },
              { key: "custom_order_id", label: "Custom Order ID" },
            ].map(({ key, label }) => (
              <th
                key={key}
                className="whitespace-nowrap px-4 py-3 font-semibold text-left text-gray-700 cursor-pointer"
                onClick={() => handleSort(key)}
              >
                <div className="flex items-center">
                  {label}
                  <span className="ml-2">{renderSortIcon(key)}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {/* 🛡️ Safeguard to prevent crashes if transactions is not an array */}
          {Array.isArray(transactions) && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.collect_id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                  {transaction.collect_id}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {transaction.school_id}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {transaction.gateway}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {transaction.order_amount}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {transaction.transaction_amount}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <StatusBadge status={transaction.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {transaction.student_info.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {transaction.student_info.id}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {transaction.student_info.email}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {transaction.custom_order_id}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-10 text-gray-500">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
