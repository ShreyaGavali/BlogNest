import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/ShowAllBlogs.css';

const GetBlogByCategory = ({category}) => {
    const [blogs, setBlogs] = useState([]);
    console.log(category);

  useEffect(() => {
    axios
     .get(`/blogs/post/${category}`)
     .then((response) => {
      setBlogs(response.data);
     })
     .catch((error) => {
      console.log(error);
     })
  }, []);
  return (
    <>
    <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mt-3 maindiv">
      {blogs.map((blog) => (
        <div className="card" style={{width: '17rem', height: '20rem'}} key={blog._id}>
        <img src={blog.image} className="card-img-top" alt="..." style={{height: '50%'}} />
        <div className="card-body">
          <p className="card-title"><b>{blog.title}</b></p>
          <Link to={`/blogs/details/${blog._id}`} style={{color: 'black'}}><p><b>Read Now</b></p></Link>
        </div>
      </div>
      ))}
    </div>
    </>
  )
}

export default GetBlogByCategory
