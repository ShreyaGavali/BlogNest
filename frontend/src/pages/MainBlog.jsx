import React,{useState, useEffect} from 'react';
import axios from 'axios';
import '../css/MainBlog.css';

const MainBlog = () => {
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        axios
         .get('http://localhost:8080/blogs/post/all')
         .then((response) => {
          setBlog(response.data[1]);
          console.log(blog);
         })
         .catch((error) => {
          console.log(error);
         })
      }, []);

  return (
    <div className='main-blog'>
    {/* <h3>Blog</h3> */}
    <div className='main'>
        <div className='text'>
            <h5>This is a featured artical - the most important piece of content</h5> 
            <p>Very short description of what's actually being discussed int the artical, maybe the first sentence to provide a preview</p>
            <button type="button" class="btn btn-secondary">Read Now</button>
        </div>
        <div className='img'>
            <img src='https://media.istockphoto.com/id/469852152/photo/arambol-beach-goa.jpg?s=612x612&w=0&k=20&c=PK7nClOmOvKi4JxDumL5-YI8lkX53b9vHF75nvExDX4=' />
        </div>
    </div>
    </div>
  )
}

export default MainBlog
