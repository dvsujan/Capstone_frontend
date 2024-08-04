import axios from "axios";
import React, { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidDetails = (username, email, password, confirmPassword) => {
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      return false;
    }
    if (!isValidEmail(email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };
  const registerUser = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (isValidDetails(username, email, password, confirmPassword)) {
      var res ; 
      toast.promise(
        axios.post(process.env.REACT_APP_API + "/api/User/register", {
          email:email,
          name:username,
          password:password,
        }).then
        ((response)=>{
          if(response.status === 200){
            
            toast.success("Registration successful");
            window.location.href = "/login";
          }        }).catch
          ((error)=>{
            toast.error(error.response.data.message);
            throw error ; 
          })
          ,
        {
          loading: "Registering...",
          success: "Registration successful",
          error:"Failed To Register",
        }
      );
    }
  };
  return (
    <div className="login-page">
      <div className="signin-container">
        <h1>Join Now!</h1>
        <form>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email address"
            ref={emailRef}
            required
          />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Display Name"
            ref={usernameRef}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            ref={passwordRef}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
            required
          />
          <button onClick={registerUser}>Register</button>
          <a href="/login">Already a member? Login Here</a>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
