import React from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeletePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handelDeletePost = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : null;
    const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
    }
    axios
      .delete(`http://localhost:8080/blogs/post/${id}`, config)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        alert('An error occurd. Please Check Console');
        console.log(error);
      })
  }
  return (
    <div style={{textAlign: "center", minHeight: "100vh"}}>
      <h5>Are you shure , you want to delete this post?</h5>
      <button onClick={handelDeletePost} className='btn btn-primary'>Delete</button>
    </div>
  )
}

export default DeletePost
