import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import NavBar from "./Pages/NavBar/NavBar";
import Register from "./Pages/Register/Register";
import LandingPage from "./Pages/Landing/Landing";
import Menu from "./Pages/Menu/Menu";
import Product from "./Pages/Product/Product";
import Store from "./Pages/Store/Store";
import Cart from "./Pages/Cart/Cart";
import Orders from "./Pages/Orders/Orders";
import EmoloyeeLogin from "./Pages/EmployeeLogin/EmoloyeeLogin";
import StorePage from "./Pages/StorePage/StorePage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import { AuthProvider } from "./Auth/AuthProvider";
import ProtectedRoute from "./Auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product/*" element={<Product/>} />
          <Route path="/store" element={<Store/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/employee/login" element={<EmoloyeeLogin />} />
          <Route path="/employee/store" element={<StorePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
