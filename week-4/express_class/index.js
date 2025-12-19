const express = require("express");

const app = express();

app.use(express.json());

// function sum(n){
//     let ans=0;
//     for(let i=1;i<=n;i++){
//         ans+=i;
//     }
//     return ans;
// }

var users = [
    {
        name : "john",
        kidneys: [
            {
                healthy : false
            },
            {
                healthy : true
            }
        ]
    }
]

const list = (name) =>{
    for(let i=0;i<users.length;i++){
        if(name === users[i].name){
            const kidneysCount = users[i].kidneys.length;
            const healthyKidneysCount = users[i].kidneys.filter(kidney => kidney.healthy).length;
            return {
                kidneysCount: kidneysCount,
                healthyKidneysCount: healthyKidneysCount,
                unhealthyKidneysCount: kidneysCount - healthyKidneysCount
            };
        }
    }
    return {"message": "user not found"};
}

function addKidney(name, healthy) {
    let flag = true;
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {
            flag=false;
            users[i].kidneys.push({ healthy: healthy });
            return { message: "Kidney added successfully" };
        }
    }
    if(flag){
        users.push({
            name : name,
            kidneys : [{ healthy : healthy }]
        })
    }
}

function updateKidney(name){
    let flag = true;
    for(let i=0;i<users.length;i++){
        if(name === users[i].name){
            flag=false;
            for(let j=0;j<users[i].kidneys.length;j++){
                users[i].kidneys[j].healthy = true;
            }
        
        return {
            "message" : "kidneys replaced"
        }
        }
    }
    if(flag){
        return {"message" : "user not found"};
    }
}

function deleteKidney(name){
    // delete only if there is an unhealthy kidney
    let flag=true;
    for(let i=0;i<users.length;i++){
        if(name === users[i].name){
            flag=false;
            const initialCount = users[i].kidneys.length;
            users[i].kidneys = users[i].kidneys.filter(kidney => kidney.healthy);
            const deletedCount = initialCount - users[i].kidneys.length;
            if (deletedCount > 0) {
                return {"message" : `${deletedCount} unhealthy kidney(s) deleted`};
            } else {
                return {"message" : "no unhealthy kidneys to delete"};
            }
        }
    }
    if(flag) return {"message" : "user not found"};
}

app.get("/",(req,res)=>{
    // const n =req.query.n;
    // const ans = sum(n);
    // res.send("hi your ans is "+ ans);
    const name=req.query.name;
    const ans = list(name);
    res.json(ans);
})

app.post("/", (req, res) => {
    const { name, healthy } = req.body;
    const result = addKidney(name, healthy);
    res.json(result);
});

app.put("/", (req, res) => {
    const { name } = req.body;
    const result = updateKidney(name);
    res.json(result);
});

app.delete("/",(req,res)=>{
    const {name} = req.body;
    const result = deleteKidney(name);
    res.json(result);
})
app.listen(3000);