const express = require('express');
const app=express();

function isOldEnoughMiddleware(req,res,next){
    const age=req.query.age;
    if(age>14) next();
    else{
        res.json({
            msg : "you are under the age of 14"
        })
    }
}

// app.use(isOldEnoughMiddleware);

app.get('/ride1',isOldEnoughMiddleware,(req,res)=>{
    res.json({
        msg : "enjoy ride1 "
    })
})

app.get('/ride1',isOldEnoughMiddleware,(req,res)=>{
    res.json({
        msg : "enjoy ride2"
    })
})

app.listen(3000);