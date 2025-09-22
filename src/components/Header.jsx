import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  ArrowRightLeft,
  Search,
  LogOut,
  CreditCard,
} from "lucide-react";
import { logout } from "../services/authService";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 🚪 Handle user logout
  const handleLogout = () => {
    logout(); // 🚀 Call the logout function
    navigate("/login"); // 🔄 Redirect to the login page
  };

  // 🎨 NavLink component for active styling
  const NavLink = ({ to, icon, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
          isActive
            ? "bg-blue-500/10 text-blue-800"
            : "text-gray-600 hover:bg-blue-500/10 hover:text-blue-800"
        }`}
      >
        {icon}
        {children}
      </Link>
    );
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-clip text-blue-600">
              School Pay
            </span>
          </Link>
        </div>
        <nav className="flex items-center space-x-2">
          <NavLink
            to="/dashboard"
            icon={<LayoutGrid className="w-5 h-5 mr-2" />}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/school-transactions"
            icon={<ArrowRightLeft className="w-5 h-5 mr-2" />}
          >
            School Transactions
          </NavLink>
          <NavLink
            to="/check-status"
            icon={<Search className="w-5 h-5 mr-2" />}
          >
            Check Status
          </NavLink>
          {/* ✨ Add the new create payment link */}
          <NavLink
            to="/create-payment"
            icon={<CreditCard className="w-5 h-5 mr-2" />}
          >
            Create Payment
          </NavLink>
        </nav>
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 rounded-md"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
