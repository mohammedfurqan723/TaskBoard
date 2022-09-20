const {Schema, model, Types} = require('mongoose');

const userAuthSchema = new Schema({

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
    phoneNumber:{
        type:Number,
        required:[true,"Please Enter Your Mobile Number."],
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    conformPassword:{
        type:String,
        required:true,
        trim:true
    },
    isActive:{
        type:Boolean,
        default:false
    },
    userDetails:{
        type:Types.ObjectId,
        ref:'UserDetails'
    },
    personalTasks:{
        type:Types.ObjectId,
        ref:"PersonalTask"
    },
    activities:{
        type:Types.ObjectId,
        ref:"Activities"
    }
},
{
    timestamps:true
});

module.exports = model("UserAuth", userAuthSchema);