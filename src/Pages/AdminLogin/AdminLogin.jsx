import axios from "axios";
import React, { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const AdminLogin = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const data = {
      username: username,
      password: password
    };
    toast.promise(
      axios.post(process.env.REACT_APP_API+"/api/Admin/login",data)
        .then((res) => {
          localStorage.setItem("admin-token", res.data.token);
          window.location.href = "/admin";
        })
        .catch((err) => { 
          throw err.response.data.message;
        }),
        {
          loading: "Logging in...",
          success: "Logged in successfully",
          error: "Failed to login",
        }
    )
  };
  return (
    <div className="login-page">
      <div className="signin-container">
        <h1>Admin Login</h1>
        <form>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Admin Username"
            required
            ref={usernameRef}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            required
            ref={passwordRef}
          />

          <button onClick={handleLogin}>Sign In</button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminLogin;
