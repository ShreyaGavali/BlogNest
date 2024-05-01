import React, { useState } from 'react';
import axios from 'axios';
import '../css/CommentForm.css'
import { toast } from 'react-toastify';

const CommentForm = ({ postId }) => {
    const [content, setContent] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const author = user ? user.name : 'null'

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        
        if (!content.trim()) {
          errors.content = 'Comment is required';
        }

        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          return;
        }

        try {
            const response = await axios.post('http://localhost:8080/blogs/comment/', {
                postId,
                author,
                content
            });
            console.log('Comment created:', response.data);
            window.location.reload();
            notifySuccess()
            // Reset form fields after successful submission
            setContent('');
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    const notifySuccess = () => {
        toast.success("Comment added successfully!");
    };

    return (
        <>
        <div className='comments row' style={{width: '100%'}}>
            <h2>Add a Comment</h2>
            <form onSubmit={handleSubmit} className='col-8 offset-2'>
                <div>
                    <input
                        className='form-control'
                        placeholder='Comment'
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    {errors.content && <span className="error">{errors.content}</span>}
                </div>  
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <button style={{width: "50%", backgroundColor: "black", color: "white"}} type="submit" class="btn btn-secondary">Submit</button>  
                </div>              
            </form>
        </div>
        </>
    );
};

export default CommentForm;
