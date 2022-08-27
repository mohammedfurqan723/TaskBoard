const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    tasks:{
        personalTasks:[
            {
                taskName:{
                    type:String,
                },
                taskDescription:{
                    type:String,
                },
                taskCategory:{
                    type:String,
                },
                taskCheckpoint:[
                    {
                        type:String,
                    }
                ],
                taskTags:[
                    {
                        type:String,
                    }
                ],
                taskDeadline:{
                    type:String,
                }
            }
        ],

        teamTasks:[],
        clientTasks:[]
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Tasks",personalTasksSchema);