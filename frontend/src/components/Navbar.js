import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  let Navigate = useNavigate();

  const HandleLogout=(e)=>{
    localStorage.removeItem('token')
    Navigate('/login')
    e.preventDefault()

  }
  useEffect(() => {}, [location]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link   active ${
                    location.pathname === "/" ? "active text-primary" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active text-primary" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
             {!localStorage.getItem('token')? <>
          <Link className="btn btn-primary mx-1" to="/login" role="button">
              Login
            </Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">
              Signup
            </Link></>:<> <button onClick={HandleLogout} className="btn btn-primary mx-1" role="button">
              Logout
            </button>
            </>
}
            {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
          </div>
        </div>
      </nav>
    </div>
  );
}
