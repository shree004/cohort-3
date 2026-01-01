const express = require('express');
const fs = require("fs");
const app = express();
const jwt = require('jsonwebtoken');
const path = require('path');
const cors =require('cors');

const TODOS_FILE = path.join(__dirname, 'todos.json');
const USER_FILE = path.join(__dirname, 'users.json');

const JWT_SECRET = "heyshreehere"
app.use(express.json());
app.use(cors());

function readTodo(){
  if(!fs.existsSync(TODOS_FILE)){
      return [];
  }
  try{
    const data = fs.readFileSync(TODOS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed)? parsed: [];
  }
  catch(error){
    console.error("Failed to parse JSON file", error);
    return [];
  }
}

function writeTodo(todos){
  fs.writeFileSync(TODOS_FILE,JSON.stringify(todos,null,2));
}

function auth(req,res,next){
  const token = req.headers.token;
  try{
            const decoded = jwt.verify(token,JWT_SECRET);
            req.user=decoded.user;
            next();
        }
        catch(err){
          res.status(401).json({"message" : `Invalid token or ${JSON.stringify(err)}`});
        }
      }

      app.get('/',(req,res)=>{
        res.sendFile(__dirname+"/public/index.html");
      })
      
      app.post('/signup',(req,res) => {
        const { user,pass } =req.body;
        
        
        users.push({
          user : user,
          pass : pass
        });
        res.json({
          "message" : "you have signed up"
        });
      })
      
      app.post("/signin",(req,res)=>{
        const { user , pass } = req.body;
        
    const username = users.find(u=>u.user===user && u.pass===pass);
    if(username){
        const token = jwt.sign({user : user}, JWT_SECRET);
        username.token = token;
        res.json({
            token : token
        });
    }
    else{
        res.status(400).json({"message" : "Invalid credentials"});
    }
})

app.get('/me',auth, (req,res) => {
    const user = users.find(u => u.user === req.user);
    res.json({user : user.user,
                pass : user.pass
    });
});

app.use(auth());

app.get('/todos',(req,res)=>{
  const todos = readTodo();
  res.json(todos);
});

app.post('/todos',(req,res) => {
  const { title , user } = req.body;

  if (!user || !title) {
    return res.status(400).json({
      error: 'user and title are required'
    });
  }

  const todos = readTodo();

  const existingUser = todos.find(t=>t.user===user);

  if(existingUser){
    existingUser.todo.push({ title : title , completed : false});
  }
  else{
      todos.push({
        user : user,
        todo : [{
          title : title,
          completed : false
        }]
      });
  }
  writeTodo(todos);
  return res.status(201).json(todos);
})

app.put('/todos',(req,res)=>{
  const { title,user} = req.body;

  if (!user || !title) {
    return res.status(400).json({
      error: 'user and title are required'
    });
  }
  const todos = readTodo();
  const existingUser = todos.find(t=>t.user===user);

  if(!existingUser){
    return res.status(400).json({
      error: 'user not added'
    });
  }
  else{
    const existingTitle =existingUser.todo.find(t=>t.title === title);
    if(!existingTitle){
      return res.status(400).json({
        error : " title not found"
      })
    }
    else{
      existingTitle.completed=true;
    }
  }

  writeTodo(todos);
  return res.status(201).json(todos);
})

app.delete('/todos',(req,res)=>{
  //complete delete code
  const { title,user} = req.body;

  if (!user || !title) {
    return res.status(400).json({
      error: 'user and title are required'
    });
  }
  const todos = readTodo();
  const existingUser = todos.find(t=>t.user===user);

  if(!existingUser){
    return res.status(400).json({
      error: 'user not added'
    });
  }
  else{
    const titleIndex =existingUser.todo.findIndex(t=>t.title === title);
    if(titleIndex === -1){
      return res.status(400).json({
        error : " title not found"
      })
    }
    else{
      existingUser.todo.splice(titleIndex,1);
    }
  }

  writeTodo(todos);
  return res.status(201).json(todos);
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})