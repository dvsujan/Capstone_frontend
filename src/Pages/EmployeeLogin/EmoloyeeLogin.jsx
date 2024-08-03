import React from 'react'
import { useRef } from 'react';
import toast, {Toaster} from 'react-hot-toast';
import axios from 'axios';


const EmoloyeeLogin = () => {
    const usernameRef = useRef();
  const passwordRef = useRef();
  const isValidEmail = (email)=>{  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value; 
    if(!isValidEmail(enteredUsername)){ 
      toast.error("Invalid email format");
      return;
    } 
    axios.post(process.env.REACT_APP_API+"/api/Employee/login", { 
      email: enteredUsername,
      password: enteredPassword,
    }).then((response)=>{
      if(response.status === 200){
        toast.success("Login successful");
        localStorage.setItem("emp-token", response.data.token);
        window.location.href = "/employee/store";
      }else{
        toast.error(response.message);
      }
    }).catch((error)=>{
      toast.error("Invalid credentials");
    }) 
    
  };

  return (
    <div className="login-page">
      <div className="signin-container">
        <h1>Employee Login</h1>
        <form>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Email address"
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
      <Toaster/>
    </div>
  );
}

export default EmoloyeeLogin