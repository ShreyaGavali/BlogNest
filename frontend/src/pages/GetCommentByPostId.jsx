import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/ShowComments.css';
import { toast } from 'react-toastify';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [showComponent, setShowComponent] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const name = user ? user.name : null;

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/blogs/comment/${postId}`);
                // console.log(response);
                setComments(response.data);
                // console.log(comments)
            } catch (error) {
                console.log('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [postId]);

    const handleDeleteComment = (commentId) => {
        // Delete comment from backend API
        axios.delete(`/blogs/comment/${commentId}`)
            .then(response => {
                // Remove the deleted comment from the state
                setComments(comments.filter(comment => comment._id !== commentId));
                notifySuccess()
            })
            .catch(error => {
                console.error('Error deleting comment:', error);
            });

    }
    const notifySuccess = () => {
        toast.success("Comment deleted successfully!");
    };
    return (
        <div style={{textAlign: "center"}}>
            <h2>Comments</h2>
            {comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                <div>
                    {comments.map(comment => (
                        <div key={comment._id} className='comment'>
                            <div className='user'>
                                <i className="fa-solid fa-user"></i>
                                <p>{comment.author}</p>
                            </div>
                            <hr />
                            <div className='content'>
                                <div>
                                    <p>{comment.content}</p>
                                </div>
                                <div>
                                    {comment.author === name ? <button onClick={() => handleDeleteComment(comment._id)}><i className="fa-solid fa-trash"></i></button> : ''}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentList;
