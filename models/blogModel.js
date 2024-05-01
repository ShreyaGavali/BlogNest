import mongoose from 'mongoose';

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: ['food','travel','health and fitness','lifestyle','photogarphy','animals','economy','politics'],
            required: true,
        },
        image: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        author : {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

export const Blog = mongoose.model('Blog',blogSchema);