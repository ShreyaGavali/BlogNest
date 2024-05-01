import { Comment } from "../models/CommentModel.js";
// import asyncHandler from 'express-async-handler';

// Create comment
 export const createComment = async (req, res) => {
    try {
        const { postId, author, content } = req.body;
        const newComment = new Comment({ postId, author, content });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all comments for a specific post
export const getCommentsByPostId = async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.find({ postId });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a comment
export const updateComment = async (req, res) => {
    try {
        const { author, content } = req.body;
        const commentId = req.params.id;
        const updatedComment = await Comment.findByIdAndUpdate(commentId, { author, content }, { new: true });
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        await Comment.findByIdAndDelete(commentId);
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};