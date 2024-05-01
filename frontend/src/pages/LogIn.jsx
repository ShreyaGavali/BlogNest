import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const userData = {
      email,
      password
    }
    try{
    const response = await axios.post('/blogs/auth/login', userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      navigate('/');
      notifySuccess();
    }catch(error){
      notifyFailure();
    }
  }
  
  const notifySuccess = () => {
    toast.success("Welcome to BlogNest!");
  };

  const notifyFailure = () => {
    toast.error("Wrong email or password!");
  };


  return (
    <div style={{ minHeight: "100vh", margin: "0", padding: "0" }}>
      <div className='row mt-3'>
        <h3 style={{ textAlign: "center" }} className='mt-1'>Login</h3>
        <div className='col-8 offset-2'>
          <form onSubmit={onSubmit}>
            <div className="form-group mb-3">
              <input type='text' className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} />
              {errors.email && <div style={{display: 'flex' , color: 'red', gap: '0.5rem'}}>
              <i className="fa-solid fa-circle-exclamation mt-1"></i>
              <p className='error'>{errors.email}</p>
            </div>}
            </div>
            <div className="form-group mb-3">
              <input type='password' className='form-control' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange} />
              {errors.password && <div style={{display: 'flex' , color: 'red', gap: '0.5rem'}}>
              <i className="fa-solid fa-circle-exclamation mt-1"></i>
              <p className='error'>{errors.password}</p>
            </div>}
            </div>
            <p style={{textAlign: 'center'}}>Dont have an account ? <Link to={'/blogs/signup'} style={{color: 'black'}}>Signup</Link></p>
            <div className="form-group mb-3" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <button type='submit' className='btn btn-block' style={{backgroundColor: 'black', color: 'white', borderRadius: '1rem', width: '50%'}}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login