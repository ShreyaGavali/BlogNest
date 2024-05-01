import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    axios.get(`/blogs/post/one/${id}`)
    .then((response) => {
      setTitle(response.data.title);
      setCategory(response.data.category);
      setImage(response.data.image);
      setDescription(response.data.description);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  const handelEditBlog = () => {
    const data = {
      title,
      category,
      image,
      description,
    };
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : null;
    const config = {
      headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
      }
    }
    axios
      .put(`/blogs/post/${id}`, data, config)
      navigate('/');
      notifySuccess()
      // .then(() => {
      //   // navigate('/')
      //   console.log(data);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
  };

  const notifySuccess = () => {
    toast.success("Blog post edited successfully!");
  };

  return (
    <div className='row mt-3' style={{minHeight: "100vh", margin: "0", padding: "0"}}>
      <h4 style={{textAlign: "center"}}>Edit Blog Post</h4>
    <div className='col-8 offset-2'>
      <form onSubmit={handelEditBlog}>
        <div className='mb-3'>
          <label className='form-label'>Blog Title</label>
          <input className='form-control' placeholder='Title' type="text" value={title} onChange={(e) => setTitle(e.target.value)}  />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Blog Category</label>
          <select className='form-control' placeholder='Select' type="text" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>food</option>
            <option>travel</option>
            <option>health and fitness</option>
            <option>lifestyle</option>
            <option>fashion and beauty</option>
            <option>photography</option>
            <option>animals</option>
          </select>
        </div>
        {/* <div className='mb-3'>
          <label className='form-label'>Blog Image</label>
          <input className='form-control' placeholder='Image url' type="url" value={image} onChange={(e) => setImage(e.target.value)} />
        </div> */}
        <div className='mb-3'>
          <label className='form-label'>Blog Image</label>
          <input className='form-control' type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Blog Description</label>
          <textarea className='form-control' placeholder='Description' type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <button style={{backgroundColor: 'black', color: 'white', borderRadius: '1rem', border: 'none', width: '50%'}} className='btn btn-primary button' type="submit" value="Submit">Submit</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default EditPost

