import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/ShowAllBlogs.css';

const ShowAllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    

  useEffect(() => {
    axios
     .get(`http://localhost:8080/blogs/post/all`)
     .then((response) => {
      setBlogs(response.data);
      console.log(blogs)
     })
     .catch((error) => {
      console.log(error);
     })
  }, []);
  return (
    <>
    
    <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mt-3 maindiv">
      {blogs.map((blog) => (
        <div className='card' key={blog._id} style={{width: '17rem', height: '20rem'}}>
        <img src={blog.image} className='card-img-top' alt="..." style={{height: '50%'}} />
        <div className="card-body">
        <p className="card-title"><b>{blog.title}</b></p>
        <Link to={`/blogs/details/${blog._id}`} style={{color: 'black'}}><p className='read'><b>Read Now</b></p></Link>
      </div>
      </div>
      ))}
    </div>
    </>
  )
}

export default ShowAllBlogs
