import React from 'react'

const Register = () => {
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
            required
          /> 
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Display Name"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            required
          />
          <button type="submit">Register</button>
          <a href="#">Already a member? Login Here</a>
        </form>
      </div> 
    </div>
  )
}

export default Register