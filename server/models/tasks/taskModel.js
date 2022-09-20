const {Schema, model} = require('mongoose');

const taskSchema = new Schema({
    taskName:String,
    taskDescription:String,
    taskCategory:String,
    taskCheckpoints:Array,
    taskCheckpointsCompleted:Array,
    taskTags:Array,
    taskDeadline:String,
    comments:Array,
    taskProgress:{
        type:Number,
        default:0
    },
    completedDate:String,
    completedTime:String
},
{
timestamps:true
});

module.exports = model("Task",taskSchema);