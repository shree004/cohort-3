const { Router } = require('express');
const { a_auth } = require('../auth');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AdminModel, CourseModel } = require('../db');
require('dotenv').config();

const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

const adminRouter = Router();

adminRouter.post("/signup",async (req,res)=>{
    try{
        const requestBody = z.object({
            username : z.string().min(5).max(100),
            email : z.string().min(6).max(100).email(),
            password : z.string().min(6).max(100)
        })
        
        const parsedDataWithSuccess = requestBody.safeParse(req.body);
        
        if(!parsedDataWithSuccess.success){
            return res.status(401).json({"message" : "Invalid Input"});
        }

        const {username,email,password} = parsedDataWithSuccess.data;

        const hashedPassword = await bcrypt.hash(password,Number(process.env.BCRYPT_SALT_ROUNDS));

        await AdminModel.create({
            username : username,
            email : email,
            password : hashedPassword
        });

        res.json({"message" : "admin created"});
    }catch(err){
        res.status(500).json({"message" : "internal server error"});
    }
});

adminRouter.post("/signin",async (req,res)=>{
    try{
        const requestBody = z.object({
            username : z.string().min(5).max(100),
            email : z.string().min(6).max(100).email(),
            password : z.string().min(6).max(100)
        })

        const parsedDataWithSuccess = requestBody.safeParse(req.body);

        if(!parsedDataWithSuccess.success){
            return res.status(401).json({"message" : "Invalid Input Syntax"});
        }

        const { email , password } = parsedDataWithSuccess.data;

        const admin = await AdminModel.findOne({ email : email });

        if(!admin){
            return res.status(401).json({"message" : "admin not found"});
        }

        const isPasswordValid = await bcrypt.compare(password,admin.password);
        if(!isPasswordValid){
            return res.status(401).json({
                "message" : "Incorrect Password"
            });
        }

        const token = jwt.sign({id:admin._id,email:email},JWT_ADMIN_SECRET);
        res.json({"token" : token});
    }catch(err){
        res.status(500).json({"message" : "internal server error"});
    }
});

adminRouter.use(a_auth);

adminRouter.post("/course", async (req,res)=>{
    try{
        const { title, description, price, imageLink } = req.body;
        const creatorId = req.userId;

        const course = await CourseModel.create({
            title : title,
            creatorId : creatorId,
            description : description,
            price : price,
            imageLink : imageLink
        });

        res.json({"message" : "course created", "courseId" : course._id});
    }catch(err){
        res.status(500).json({"message" : "internal server error"});
    }
});

adminRouter.put("/course", async (req,res)=>{
    try{
        const { courseId, title, description, price, imageLink } = req.body;
        const course = await CourseModel.findById(courseId);

        if(!course){
            return  res.status(404).json({"message" : "course not found"});
        }

       const result = await CourseModel.updateOne(
            { _id : courseId , creatorId : req.userId },
            {
                title : title,
                description : description,
                price : price,
                imageLink : imageLink
            }
        );
        if(result.matchedCount === 0){
            return res.status(403).json({"message" : "not authorized to update this course"});
        }
        res.json({
            "message" : "course updated"
        });

    }   
    catch(err){
        res.status(500).json({"message" : "internal server error"});
    }
});

adminRouter.get('/course/bulk',async (req,res) =>{
    try{
        const courses = await CourseModel.find({ creatorId : req.userId });
        res.json({ courses : courses });
    }catch(err){
        res.status(500).json({"message" : "internal server error"});
    }
});

module.exports = {
    adminRouter: adminRouter
};