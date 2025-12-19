const express =  require('express');
const fs = require('fs');
const path = require('path');
const app = express()

app.use(express.json()); 

const TODOS_FILE = path.join(__dirname, 'todos.json');

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