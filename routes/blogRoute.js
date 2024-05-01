import express from 'express';
import { getBlogs, setBlog, updateBlog, deleteBlog, getAllBlogs, getOneBlog, getAllFoodBlogs, getAllTravelBlogs, getAllHealthBlogs, getAllLifestyleBlogs, getAllPhotogarphyBlogs, getAllAnimalBlogs, getAllEconomyBlogs, getAllPoliticsBlogs} from '../controllers/blogControllers.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';
import {storage} from '../cloudConfig.js';

const upload = multer({storage});

const router = express.Router()

router.get('/all', getAllBlogs);
router.get('/one/:id', getOneBlog);
router.get('/',protect, getBlogs);
router.post('/', protect, upload.single('image'), setBlog);
router.put('/:id',protect, upload.single('image'), updateBlog);
router.delete('/:id',protect, deleteBlog);
router.get('/food', getAllFoodBlogs)
router.get('/travel', getAllTravelBlogs)
router.get('/health', getAllHealthBlogs)
router.get('/lifestyle', getAllLifestyleBlogs)
router.get('/photogarphy', getAllPhotogarphyBlogs)
router.get('/animals', getAllAnimalBlogs)
router.get('/economy', getAllEconomyBlogs)
router.get('/politics', getAllPoliticsBlogs)

export default router;