const { Router } = require('express');
const { auth } = require('../auth');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel , PurchaseModel ,CourseModel } = require('../db');
require('dotenv').config();

const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

const userRouter = Router();

userRouter.post("/signup",async (req,res)=>{
    const requestBody = z.object({
        name : z.string().min(3).max(100),
        email : z.string().min(6).max(100).email(),
        password : z.string().min(6).max(100)
    })
    
    const parsedDataWithSuccess = requestBody.safeParse(req.body);
    
    if(!parsedDataWithSuccess.success){
        return res.status(401).json({"message" : "Invalid Input"});
    }

    const {name,email,password} = parsedDataWithSuccess.data;
    
    const hashedPassword = await bcrypt.hash(password,Number(process.env.BCRYPT_SALT_ROUNDS));

    await UserModel.create({
        name : name,
        email : email,
        password : hashedPassword
    });

    res.json({"message" : "user created"});

});

userRouter.post("/signin",async (req,res)=>{
    const requestBody = z.object({
        email : z.string().min(6).max(100).email(),
        password : z.string().min(6).max(100)
    })

    const parsedDataWithSuccess = requestBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success){
        return res.status(401).json({"message" : "Invalid Input Syntax"});
    }

    const { email , password } = parsedDataWithSuccess.data;

    const user = await UserModel.findOne({email : email});

    if(!user){
        return res.status(401).json({"message" : "user not found"});
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(401).json({
            "message" : "Incorrect Password"
        });
    }

    const token = jwt.sign({id:user._id,email:email},JWT_USER_SECRET);
    //cookie logic can be added here
    res.json({"token" : token});
});

userRouter.use(auth);

userRouter.get("/purchases", async(req,res)=>{
    const userId = req.userId;

    const purchases = await PurchaseModel.find({ userId : userId });

    const courseIds = purchases.map((purchase) => purchase.courseId);

    const courses = await CourseModel.find({ _id : { $in : courseIds } });

    res.json({ purchasedCourses : courses });

});

module.exports = {
    userRouter : userRouter
};