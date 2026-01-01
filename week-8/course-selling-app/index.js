const express = require('express');
const app = express();
const mongo = require('mongoose');
const {userRouter} = require('./routes/user');
const {courseRouter} = require('./routes/course');
const {adminRouter} = require('./routes/admin');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main(){
    await mongo.connect(process.env.MONGO_URL);
    console.log("connected to db");
    app.listen(Number(process.env.PORT),()=>{
        console.log(`server started at port ${process.env.PORT}`);
    });
}

main();