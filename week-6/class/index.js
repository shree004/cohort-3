const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const users=[];
const JWT_SECRET = 'your_jwt_secret_key';

app.use(express.json());

// const generateToken = () =>{
//     let result           = '';
//     let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let charactersLength = characters.length;
//     for ( var i = 0; i < charactersLength; i++ ) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// };

function auth(req, res, next){
    const token  = req.headers.token;
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({message : " Invalid token"});
    }
}

app.get('/',(req,res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.post('/signup',(req,res)=>{
    const { user , pass } = req.body;
    users.push({user : user,
                pass  :pass
    });
    res.json({message : " You are signin in"});
});

app.post('/signin', (req,res) => {
    const { user , pass } = req.body;

    const username = users.find(u => u.user === user && u.pass === pass);

    if(username){
        const token = jwt.sign({user : user}, JWT_SECRET, {expiresIn : '1h'});
        username.token = token;
        res.json({message : " You are logged in",
                  token   : token
        });
    }else{
        res.status(401).json({message : " Invalid credentials"});
    }
});

app.get('/me',auth, (req,res) => {
    const user = users.find(u => u.user === req.user);
    res.json({user : user.user,
                pass : user.pass
    });
});

app.listen(3000);