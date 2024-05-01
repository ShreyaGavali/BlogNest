import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
// import ShowPost from './pages/ShowPost';
import ShowOneBlog from './pages/ShowOneBlog';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import DeletePost from './pages/DeletePost';
import Footer from './components/Footer';
import SignUp from './pages/Signup';
import Login from './pages/LogIn';
import GetCommentByPostId from './pages/GetCommentByPostId';
// import MainBlog from './pages/MainBlog';
import Home from './pages/Home';
// import GetBlogByCategory from './pages/GetBlogByCategory';
import UserBlog from './pages/UserBlog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  // const isUserSignedIn = !!localStorage.getItem('token');
  return (
    <>
        <Navbar />
        <ToastContainer theme={'dark'} />
        <Routes>
            {/* <Route path='/main' element={<MainBlog />} /> */}
            {/* <Route path='/blogs/food' element={<GetBlogByCategory />} /> */}
            <Route path='/' element={<Home />} />
            <Route path='/userblog' element={<UserBlog />} />
            <Route path='/blogs/details/:id' element={<ShowOneBlog />} />
            <Route path='/blogs/create' element={<AddPost />} /> 
            <Route path='/blogs/edit/:id' element={<EditPost />} /> 
            {/* <Route path='/blogs/delete/:id' element={<DeletePost />} /> */}
            <Route path='/blogs/signup' element={<SignUp />} />
            <Route path='/blogs/login' element={<Login />} />
            <Route path='/blogs/details/:id' element={<GetCommentByPostId />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
