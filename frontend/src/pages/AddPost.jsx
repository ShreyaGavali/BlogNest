import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  

  console.log(image);

  const handleCreate = async (e) => {
    e.preventDefault()

    const errors = {};
    if (!title.trim()) {
      errors.title = 'Title is required';
    }
    if (!category.trim()) {
      errors.category = 'Category is required';
    }
    if (!image) {
      errors.image = 'Image is required';
    }
    if (!description.trim()) {
      errors.description = 'Description is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const post = {
      title,
      category,
      image,
      description,
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : null;
    const name = user ? user.name : null;

    const config = {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    }

    try {
      const res = await axios.post("/blogs/post/", post, config, name)
      navigate('/');
      notifySuccess();
    } catch (err) {
      console.log(err);
    }

  }

  const notifySuccess = () => {
    toast.success("Blog post added successfully!");
  };

  return (
    <div className='row mt-3' style={{ minHeight: "100vh", margin: "0", padding: "0" }}>
      <h3 style={{textAlign: "center"}}>Add a Blog Post</h3>
      <div className='col-8 offset-2'>
        <form action=" " onSubmit={handleCreate}>
          <div className='mb-3'>
            <label className='form-label'>Blog Title</label>
            <input className='form-control' placeholder='Title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            {errors.title && 
            <div style={{display: 'flex' , color: 'red', gap: '0.5rem'}}>
              <i className="fa-solid fa-circle-exclamation mt-1"></i>
              <p className='error'>{errors.title}</p>
            </div>}
          </div>
          <div className='mb-3'>
            <label className='form-label'>Blog Category</label>
            <select className='form-control' placeholder='Select' type="text" value={category} onChange={(e) => setCategory(e.target.value)} >
              <option>Select</option>
              <option>food</option>
              <option>travel</option>
              <option>health</option>
              <option>lifestyle</option>
              <option>fashion and beauty</option>
              <option>photogarphy</option>
              <option>economy</option>
              <option>politics</option>
              <option>animals</option>
            </select>
            {errors.category && <div style={{display: 'flex' , color: 'red', gap: '0.5rem'}}>
              <i className="fa-solid fa-circle-exclamation mt-1"></i>
              <p className='error'>{errors.category}</p>
            </div>}
          </div>
          {/* <div className='mb-3'>
            <label className='form-label'>Blog Image</label>
            <input className='form-control' placeholder='Image url' type="url" value={image} onChange={(e) => setImage(e.target.value)} />
          </div> */}
          <div className='mb-3'>
            <label className='form-label'>Upload Blog Image</label>
            <input className='form-control' type="file"  onChange={(e) => setImage(e.target.files[0])} />
            {errors.image && <div style={{display: 'flex' , color: 'red', gap: '0.5rem'}}>
              <i className="fa-solid fa-circle-exclamation mt-1"></i>
              <p className='error'>{errors.image}</p>
            </div>}
          </div>
          <div className='mb-3'>
            <label className='form-label'>Blog Description</label>
            <textarea className='form-control' placeholder='Description' type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            {errors.description && <div style={{display: 'flex' , color: 'red', gap: '0.5rem'}}>
              <i className="fa-solid fa-circle-exclamation mt-1"></i>
              <p className='error'>{errors.description}</p>
            </div>}
          </div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <button style={{backgroundColor: 'black', color: 'white', borderRadius: '1rem', border: 'none', width: '50%'}} className='btn btn-secondary' type="submit" value="Submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default AddPost
