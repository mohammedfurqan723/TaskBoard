const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:[true,"Please Enter Your First Name."],
        trim:true
    },
    lastName:{
        type:String,
        required:[true,"Please Enter Your Last Name."],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email Address."],
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:[true, "Please Enter Your Password."],
        trim:true
    },
    phoneNumber:{
        type:Number,
        required:[true,"Please Enter Your Mobile Number."],
        trim:true
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Users", usersSchema);