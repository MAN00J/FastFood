import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import orderManage from './App/Routes/web/order.js';
import UserRoute from './App/Routes/web/UserAccount.Routes.js';
import SellerRoute from './App/Routes/web/SellerAccount.Routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// // CORS Setup
// const allowedOrigins = [
//   "http://127.0.0.1:5500"           
// ];

// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin (Postman, mobile apps)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.includes(origin)){
//       return callback(null, true);
//     } else {
//       return callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true
// }));

// Routes
app.use('/api/Order',orderManage)
app.use('/api/UserAccount',UserRoute)
app.use('/api/SellerAccount',SellerRoute)


// Connect to MongoDB
mongoose.connect(process.env.dburl)
    .then(() => {
        console.log("MongoDB connected");
        const port = process.env.PORT || 8060; 
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => console.error("MongoDB connection error:", err));
