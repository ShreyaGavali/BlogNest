import express from 'express';
import{createComment, getCommentsByPostId, updateComment, deleteComment} from '../controllers/commentControllers.js'
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router()

// Create a new comment
router.post('/', createComment);

// Get all comments for a specific post
router.get('/:postId', getCommentsByPostId);

// Update a comment
router.put('/:id',updateComment);

// Delete a comment
router.delete('/:id',deleteComment);


export default router;