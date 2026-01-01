const mongo = require('mongoose');
const Schema = mongo.Schema;

const users = new Schema({
    name : String,
    email : { type : String , unique : true},
    password : String
});

const admin = new Schema({
    username : String,
    email : { type : String , unique : true},
    password : String
});

const courses = new Schema({
    title : String,
    description : String,
    price : Number,
    imageLink : String,
    creatorId : {
        type : Schema.Types.ObjectId,
        ref : 'admins'
    }
});

const purchases = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'users'
    },
    courseId : {
        type : Schema.Types.ObjectId,
        ref : 'courses'
    },
    purchaseDate : { type : Date , default : Date.now }
});

const UserModel = mongo.model('users',users);
const AdminModel = mongo.model('admins',admin);
const CourseModel = mongo.model('courses',courses);
const PurchaseModel = mongo.model('purchases',purchases);

module.exports = {
    UserModel : UserModel,
    AdminModel : AdminModel,
    CourseModel : CourseModel,
    PurchaseModel : PurchaseModel
};