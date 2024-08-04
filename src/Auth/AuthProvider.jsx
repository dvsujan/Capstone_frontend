import React, { createContext, useContext, useState, useEffect } from 'react';
import { parseJwt } from '../global/Global';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        console.log(token); 
        login(token); 
    //     setLoggedIn(true);
    //     console.log("asdf")
    //   const parsedToken = parseJwt(token);
    //   const currentTime = new Date().getTime();
    //   if (parsedToken.exp * 1000 < currentTime) {
    //     localStorage.removeItem("token");
    //     setLoggedIn(false);
    //   } else {
    //     setLoggedIn(true);
    //   }
    }
  }, [isLoggedIn]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, redirectPath, setRedirectPath }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

