const express = require('express');
const{ UserModel, TodoModel } = require('./db');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const auth = require('./auth').auth;
const bcrypt = require('bcrypt');
const { z } = require('zod');
const cors = require('cors');

mongoose.connect("mongodb+srv://shreevarsaanramesh_db_user:shreevarsaan@cluster0.jzlrxxi.mongodb.net/todo-app-db");
app.use(express.json());
app.use(cors());

// function auth(req, res, next) {
//     next();

const JWT_SECRET = 'your_jwt_secret_key';

app.post('/signup',async (req,res)=>{

    const requestBody = z.object({
        email: z.string().min(6).max(100).email(),
        password: z.string().min(6),
        name: z.string().min(1)
    });

    // const parsedData = requestBody.parse(req.body);// throws error if invalid
    const parsedDataWithSuccess = requestBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success){
        return res.status(400).json({ message: 'Invalid input', errors: parsedDataWithSuccess.error.issues});
    }
    const { email, password, name } = parsedDataWithSuccess.data;
    //req.body
    //{
    // email: String,
    // password: String,
    // name: String
    //}
    //input validation
    // if(!email || !password || !name){
    //     return res.status(400).json({ message: 'All fields are required' });
    // }

    // if(typeof email !== 'string' || typeof password !== 'string' || typeof name !== 'string'){
    //     return res.status(400).json({ message: 'Invalid input types' });
    // }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({ 
        email : email,
        password : hashedPassword, 
        name  : name 
    });
    res.json({ message: 'User created successfully' });
})

app.post('/login',async (req,res)=>{
    const { email,password } =req.body;
    
    const user=await UserModel.findOne({ 
        email : email
    });

    if(!user){
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    else{
        const isPasswordValid =await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        else{
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ message: 'Login successful', token : token });
        }
    }
});

app.post('/todo', auth,async (req,res)=>{
    const UserId = req.userId;
    
    const { title } = req.body;

    await TodoModel.create({
        title : title,
        done  : false,
        userId: UserId
    });

    res.json({ message: 'Todo created successfully' });
})

app.put('/todo/:id',auth, async (req,res)=>{
    const todoId = req.params.id;
    const { done } = req.body;

    await TodoModel.findOneAndUpdate({_id: todoId, userId : req.userId}, { done : done });
    res.json({ message: 'Todo updated successfully' });
})

app.get('/todos',auth,  async (req,res)=>{
    const UserId = req.userId;
    
    const todos = await TodoModel.find({ userId : UserId });
    res.json({ message: 'Todos fetched successfully', todos : todos });
    
})

app.delete('/todo/:id',auth, async (req,res)=>{
    const todoId = req.params.id;

    await TodoModel.findOneAndDelete({_id: todoId, userId : req.userId});
    res.json({ message: 'Todo deleted successfully' });
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})