const mongoose=require("mongoose");

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    age:{
        type:Number,

    },
    post:{
        type:String,
        require:true
    }

},{timestamps:true});

//creating model
const User=mongoose.model('User',userSchema)
module.exports=User;