const {Schema, model, Types} = require('mongoose')

const userDetailsSchema = new Schema({
    displayName:{type:String},
    unicompi:{type:String},
    currentPosition:{type:String},
    location:{type:String},
    email:{
        type:String,
        trim:true
    },
    phoneNumber:{
        type:Number,
        trim:true
    },
    dob:{
        type:Date,
    },
    requiredData:{
        type:Boolean,
        default:false
    },
    aboutMe:String,
    workType:String,
    allExperience:Array,
    allEducation:Array,
    skills:Array,
    languages:Array,
    user:{
        type:Types.ObjectId,
        ref:'UserAuth'
    }
},
{
    timestamps:true
});

module.exports = model('UserDetails', userDetailsSchema);