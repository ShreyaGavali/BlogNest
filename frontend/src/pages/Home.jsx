import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../css/ShowPost.css';
import { Link } from 'react-router-dom';
import MainBlog from './MainBlog';
import Buttons from '../components/Buttons';
import '../css/Home.css';

const ShowPost = () => {
  const [blogs, setBlogs] = useState([]);

  const [button, setButton] = useState('false');
  const ButtonComponent = () => {
    setButton(!button);
  };

  useEffect(() => {
    axios
     .get('http://localhost:8080/blogs/post/all')
     .then((response) => {
      setBlogs(response.data);
     })
     .catch((error) => {
      console.log(error);
     })
  }, []);
  return (
    <>
    <Buttons />
    </>
  )
}

export default ShowPost
