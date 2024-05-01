import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserBlog() {
  const [blogs, setBlogs] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : null;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }


  useEffect(() => {
    axios
      .get('/blogs/post/', config)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);
  return (
    <div style={{ minHeight: "100vh" }}>
      {blogs.length === 0 ? (
        <div style={{textAlign: 'center'}}>
          <i class="fa-regular fa-face-frown-open fa-2x"></i>
          <h5>You don't have any blog yet!</h5>
          <Link to={'/blogs/create'} style={{color: 'black'}}>Add Blog Post</Link>
        </div>
      ) : (
        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mt-3 maindiv">
          {blogs.map((blog) => (
            <div className="card" key={blog._id} style={{height: '20rem', width: '17rem'}}>
              <img src={blog.image} className='card-img-top' alt="..." style={{height: '50%'}} />
              <div className="card-body">
                <p className="card-title"><b>{blog.title}</b></p>
                <Link to={`/blogs/details/${blog._id}`} style={{color: 'black'}}><p className='read'><b>Read Now</b></p></Link>
              </div>
            </div>
          ))}
        </div>)}
    </div>
  )
}
