import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CommentForm from './CommentForm.jsx';
import GetCommentByPostId from './GetCommentByPostId.jsx'
import '../css/ShowPost.css';
import { toast } from 'react-toastify';

const ShowOneBlog = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userid = user ? user._id : '0000000000';
  const token = user ? user.token : null;
    const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
    }
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/blogs/post/one/${id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const handelDeletePost = () => {
    axios
      .delete(`http://localhost:8080/blogs/post/${id}`, config)
      .then(() => {
        navigate('/');
        notifySuccess();
      })
      .catch((error) => {
        alert('An error occurd. Please Check Console');
        console.log(error);
      })
  }

  const notifySuccess = () => {
    toast.success("Blog deleted successfully!");
  };

  return (
    <>
      <div className='oneBlog' style={{ minHeight: "100vh" }}>
        <p><b>{blog.title}</b></p>
        <div className='image'>
          <img src={blog.image} />
        </div>
        <p className='subtitle'><b>{blog.subtitle}</b></p>
        <p>{blog.description}</p>
        <div className='author'>
          <p><b>Created By: {blog.author}</b></p>
          {blog.user === userid ? <Link to={`/blogs/edit/${blog._id}`}><i className="fa-regular fa-pen-to-square fa-lg" style={{ color: 'black', margin: '0.5rem' }}></i></Link> : ' '}
          {blog.user === userid ? <button style={{border: "none"}} onClick={handelDeletePost}><i className="fa-solid fa-trash fa-lg" style={{ color: 'black' }}></i></button> : ''}
        </div>
      </div>
      <hr />
      <CommentForm postId={id} />
      <hr />
      <GetCommentByPostId postId={id} />
    </>
  )
}


export default ShowOneBlog
