import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
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
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    if (!password2.trim()) {
      errors.password2 = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    if (password !== password2) {
      alert('Password do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }
      const response = await axios.post('/blogs/auth/', userData)
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      navigate('/');
      notifySuccess();
    }
  }

  const notifySuccess = () => {
    toast.success("Signup successfully! Welcome to BlogNest");
  };

  return (
    <div style={{ minHeight: "100vh", margin: "0", padding: "0" }}>
    <div className='row mt-3' >
      <h3 style={{ textAlign: "center" }} className='mt-1'>Sign Up</h3>
      <div className='col-8 offset-2'>
        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
            <input type='text' className='form-control' id='name' name='name' value={name} placeholder='Enter your name' onChange={onChange} />
            {errors.name && 
            <div style={{display: 'flex' , color: 'red', gap: '0.5rem'}}>
              <i className="fa-solid fa-circle-exclamation mt-1"></i>
              <p className='error'>{errors.name}</p>
            </div>}
          </div>
          <div className="form-group mb-3">
            <input type='text' className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} />
            {errors.email &&  
            <div style={{display: 'flex' , color: 'red', gap: '0.5rem'}}>
              <i className="fa-solid fa-circle-exclamation mt-1"></i>
              <p className='error'>{errors.email}</p>
            </div>}
          </div>
          <div className="form-group mb-3">
            <input type='password' className='form-control' id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange} />
            {errors.password &&  
            <div style={{display: 'flex' , color: 'red', gap: '0.5rem'}}>
              <i className="fa-solid fa-circle-exclamation mt-1"></i>
              <p className='error'>{errors.password}</p>
            </div>}
          </div>
          <div className="form-group mb-3">
            <input type='text' className='form-control' id='password2' name='password2' value={password2} placeholder='Confirm Password' onChange={onChange} />
            {errors.password2 &&  
            <div style={{display: 'flex' , color: 'red', gap: '0.5rem'}}>
              <i className="fa-solid fa-circle-exclamation mt-1"></i>
              <p className='error'>{errors.password2}</p>
            </div>}
          </div>
          <p style={{textAlign: 'center'}}>Already have an account ? <Link to={'/blogs/login'} style={{color: 'black'}}>Login</Link></p>
          <div className="form-group mb-3" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <button type='submit' className='btn btn-block' style={{backgroundColor: 'black', color: 'white', borderRadius: '1rem', width: '50%'}}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default SignUp