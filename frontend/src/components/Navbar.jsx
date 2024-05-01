import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import '../css/Navbar.css';

const Navbar = () => {
  const isUserSignedIn = !!localStorage.getItem('user')
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('user')
    navigate('/')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-white">
        <div className="container-fluid">
          <div>
            <img src='/logo.jpg' style={{height: '2.5rem', width: '3.5rem', marginRight: '0.5rem'}} className="blognest" />
            <a className="navbar-brand" href="#"><b>BlogNest</b></a>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
              <li className="nav-item">
              <Link to={'/'} style={{textDecoration: 'none'}}><a className="nav-link"><b>Home</b></a></Link>
              </li>
              {isUserSignedIn ?
              <>  
              <li className="nav-item">
              <Link to={'/blogs/create'} style={{textDecoration: 'none'}}><a className="nav-link"><b>Add Post</b></a></Link>
            </li>
            <li className="nav-item ">
            <Link to={'/userblog'} style={{textDecoration: 'none'}}><a className="nav-link"><b>Your Post</b></a></Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={handleSignOut} style={{cursor:'pointer'}}><b>Logout</b></a>
            </li>
            </> : 
            <>
            <li className="nav-item">
            <Link to={'/blogs/signup'} style={{textDecoration: 'none'}}><a className="nav-link"><b>Sign Up</b></a></Link> 
          </li>
          <li className="nav-item ">
          <Link to={'/blogs/login'} style={{textDecoration: 'none'}}><a className="nav-link"><b>Log In</b></a></Link> 
          </li>
          </>
          }
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
