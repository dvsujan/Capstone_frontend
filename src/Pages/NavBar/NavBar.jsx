import React, { useEffect, useState } from 'react'
import './navbar.css'
import Logo from '../../Assets/Logo.svg'
import { parseJwt } from '../../global/Global';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);  
  const navigate = useNavigate(); 
  useEffect(()=>{ 
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      const parsedToken = parseJwt(token);  
      const currentTime = new Date().getTime();
      if (parsedToken.exp * 1000 < currentTime) {
        localStorage.removeItem("token");
        setLoggedIn(false);
      }
      setLoggedIn(true);
    }
    else{
      setLoggedIn(false); 
      const path = (window.location.href.split('/'))[3].split("?")[0]; 
      const exceptPaths = ['login','register','employee', 'menu','admin',''];
      if(!exceptPaths.includes(path)){
        window.location.href = ( `/login?history=${window.location.pathname}`); 
      }
    }
  },[]) 
  const logoutUser = ()=>{ 
    localStorage.removeItem("token");
    window.location.reload(); 
  }
  
  return (
    <nav>
      <div className="left">
        <a href='/'><img src={Logo} alt="" /></a>
      </div>
      <div className="right">
        <ul>
          <li><a href="/menu">Menu</a></li>
          <li className='nav-store'><a href="/store">Find a store</a></li> 
          {
            loggedIn ? <>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/cart" style={{color:'red'}} onClick={logoutUser} className='nav-logout'>Logout</a></li>
            </> : <>
              <li><a href='/login'>Login</a></li>
              <li><a href='/register' className='nav-register'>Register</a></li>
            </>
          }
        </ul>
      </div>
    </nav>
  )
}

export default NavBar