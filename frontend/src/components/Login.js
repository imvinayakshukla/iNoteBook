import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const host = "http://localhost:5000";
  let Navigate = useNavigate();
  const [cre, setcre] = useState({ email: "", password: "" });
  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email: cre.email, password: cre.password }),
    });
    const json = await response.json();
    if(json.success)
    {
      localStorage.setItem('token',json.authtoken)
     Navigate('/')
    }
    else
    {
      alert(json.error);
    }
  };
  const onChange = (e) => {
    setcre({ ...cre, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <form className="mx-5 mt-4" onSubmit={handleClick}>
        <div className="mb-3 mx">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            onChange={onChange}
            value={cre.email}
            type="email"
            className="form-control"
            id="email"
            
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={onChange}
            value={cre.password}
            type="password"
            className="form-control"
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
