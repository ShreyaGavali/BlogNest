import express from "express";
import mongoose from "mongoose";
import blogRoute from './routes/blogRoute.js';
import authRoute from './routes/userRoute.js';
import commentRoute from './routes/commentRoute.js';
import cors from 'cors';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandeler } from "./middleware/errorMiddleware.js";
import path from ("path");


const app = express();

app.use(express.static(path.join(__dirname, "dist")));

// app.use(express.json());
dotenv.config()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// const mongoDBURL = 'mongodb://127.0.0.1:27017/blogs' ;
const dbUrl = process.env.ATLASDB_URL;

app.use("/blogs/auth", authRoute);
app.use("/blogs/post", blogRoute);
app.use("/blogs/comment", commentRoute);


app.use(errorHandeler)

mongoose.connect(dbUrl).then(() => {
    console.log("App connected to database");
    app.listen(8080, () => {
        console.log("Server is listing on port 8080")
    });
}).catch((error) => {
    console.log(error)
});
