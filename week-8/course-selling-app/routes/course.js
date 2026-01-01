const { Router } = require('express');
const { PurchaseModel , CourseModel } = require('../db');

const courseRouter = Router();

courseRouter.post("/purchase",async (req,res)=>{
    const courseId = req.body.courseId;
    const userId = req.body.userId;

    await PurchaseModel.create({
        courseId : courseId,
        userId : userId
    });

    res.json({"message" : "course purchased successfully"});
});

courseRouter.get("/preview", (req,res)=>{

    const courses = CourseModel.find();

    res.json({ courses : courses });

});

module.exports = {
    courseRouter
}; 