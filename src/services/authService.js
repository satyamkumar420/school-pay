import api from "./api";

const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (err) {
    console.error("Login failed:", err);
    throw err.response ? err.response.data : { message: "An error occurred" };
  }
};

const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (err) {
    console.error("Registration failed:", err);
    throw err.response ? err.response.data : { message: "An error occurred" };
  }
};

const logout = () => {
  // 🚪 Remove the token from local storage
  localStorage.removeItem("token");
};

export { login, register, logout };
