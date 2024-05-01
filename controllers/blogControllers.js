import {Blog} from '../models/blogModel.js';
import {User} from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

export const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)
})

export const getOneBlog = asyncHandler(async (req, res) => {
    try{
        const {id} = req.params;
        const blog = await Blog.findById(id);
        return res.status(200).json(blog);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

export const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({ user: req.user.id })
    res.status(200).json(blogs)
})

export const setBlog = asyncHandler(async (req, res) => {
    // let url = req.file.path;
    // let filename = req.file.filename;
    // console.log(url, "..", filename);
    const blog = await Blog.create({
        title: req.body.title,
        subtitle: req.body.subtitle,
        category: req.body.category,
        image: req.file.path,
        description: req.body.description,
        author: req.user.name,
        user: req.user.id,
    })
    res.status(200).json(blog)
})

export const updateBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(!blog){
        res.status(400)
        throw new Error('Blog not found')
    }

    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the goal user
    if(blog.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorize')
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(typeof req.file !== 'undefined'){
        updatedBlog.image = req.file.path
        await updatedBlog.save();
    }
    
    res.status(200).json(updatedBlog)
})

export const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(!blog){
        res.status(400)
        throw new Error('Blog not found')
    }

    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the goal user
    if(blog.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorize')
    }

    const deleteBlog = await Blog.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })
})

export const getAllFoodBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({category: "food"})
    res.status(200).json(blogs)
})

export const getAllTravelBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({category: "travel"})
    res.status(200).json(blogs)
})

export const getAllHealthBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({category: "health"})
    res.status(200).json(blogs)
})

export const getAllLifestyleBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({category: "lifestyle"})
    res.status(200).json(blogs)
})

export const getAllPhotogarphyBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({category: "photogarphy"})
    res.status(200).json(blogs)
})

export const getAllAnimalBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({category: "animals"})
    res.status(200).json(blogs)
})

export const getAllEconomyBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({category: "economy"})
    res.status(200).json(blogs)
})

export const getAllPoliticsBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({category: "politics"})
    res.status(200).json(blogs)
})