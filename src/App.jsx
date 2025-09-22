import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import SchoolTransactionsPage from "./pages/SchoolTransactionsPage";
import TransactionStatusPage from "./pages/TransactionStatusPage";
import PaymentPage from "./pages/PaymentPage"; // 💳 Import the new PaymentPage
import Header from "./components/Header";

// 🎨 Main layout with header
const MainLayout = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <main>
      <Outlet />
    </main>
  </div>
);

// 🔒 PrivateRoute component to protect routes
const PrivateRoute = () => {
  const token = localStorage.getItem("token"); // 🔍 Check for token
  return token ? <MainLayout /> : <Navigate to="/login" />; // 🔄 Redirect to login if no token
};

function App() {
  const token = localStorage.getItem("token"); // 🔍 Check for token

  return (
    <Router>
      <Routes>
        {/* 🚪 Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 🔒 Main App Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/school-transactions"
            element={<SchoolTransactionsPage />}
          />
          <Route path="/check-status" element={<TransactionStatusPage />} />
          <Route path="/create-payment" element={<PaymentPage />} />
        </Route>

        {/* 🔄 Redirect root based on token */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
