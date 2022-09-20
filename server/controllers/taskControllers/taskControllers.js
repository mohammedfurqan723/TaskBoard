const PersonalTask = require('../../models/tasks/personalTaskModel');
const Task = require('../../models/tasks/taskModel');
const Activities = require('../../models/activity/activityModel')

const personalTaskCtrls = {
    userPersonalTasks: async (req, res) => {
        try {
            const {id} = req.params;

            const resp = await PersonalTask.findById(id).populate([
                {path:'development', model:'Task'},
                {path:'design', model:'Task'},
                {path:'bugfix', model:'Task'},
                {path:'completed',model:'Task'}
            ]);

            res.status(200).json(resp);
            
        } catch (err) {
            res.status(500).json(err);
        };
    },
    getTask: async (req, res) => {
        try {
            const {id} = req.params;

            const resp = await Task.findById(id);

            res.status(200).json(resp);
            
        } catch (err) {
            res.status(500).json(err);
        };
    },
    addTask: async (req, res) => {
        try {

            const { taskName, taskDescription, taskCategory, taskCheckpoints, taskTags, taskDeadline, userPersonalTaskId, userActivitiesId } = req.body;

            const newTask = await Task.create({
                taskName: taskName,
                taskDescription: taskDescription,
                taskCategory: taskCategory,
                taskCheckpoints: taskCheckpoints,
                taskCheckpointsCompleted: [],
                taskTags: taskTags,
                taskDeadline: taskDeadline,
                comments: []

            });

            pushObjectId(taskCategory, newTask, userPersonalTaskId);

            let tc = taskCategory.toUpperCase();
            let tn = taskName.toUpperCase();

            let message = `Added New Task In Personal Workspace Named "${tn}" In ${tc} Category.`

            addActivity(userActivitiesId, message)

            res.status(200).json({ message: "Successfully Added New Task." });

        }
        catch (err) {
            res.status(500).json(err);
        };
    },
    editTask: async (req, res) => {
        try {
            const {taskName, 
                taskDescription, 
                taskCategory,
                taskCheckpoints, 
                taskTags, 
                taskDeadline, 
                personalTaskId, 
                prevCategory,
                taskProgress,
                userActivitiesId,
            taskId} = req.body;

            await Task.findByIdAndUpdate(taskId,{
                taskName:taskName,
                taskDescription:taskDescription,
                taskCategory:taskCategory,
                taskCheckpoints:taskCheckpoints,
                taskTags:taskTags,
                taskDeadline:taskDeadline,
                taskProgress:taskProgress
            });

            if(prevCategory !== taskCategory){
                //removing object id 
                pullObjectId(prevCategory, taskId, personalTaskId)

                //pushing object id to new category
                pushObjectId(taskCategory, taskId, personalTaskId);
            };

            let tc = taskCategory.toUpperCase();
            let tn = taskName.toUpperCase();

            let message = `Edited Task In Personal Workspace Named "${tn}" In ${tc} Category.`

            addActivity(userActivitiesId, message)

            res.status(200).json({ message: "Successfully Edited Task." });
            
        } catch (err) {
            res.status(500).json(err);
        };
    },
    updateTask: async (req, res) => {
        try {
            const {taskCheckpointsCompleted, taskId, taskProgress, userActivitiesId, taskName, taskCategory} = req.body;
            
            await Task.findByIdAndUpdate(taskId, {
                taskCheckpointsCompleted:taskCheckpointsCompleted,
                taskProgress:taskProgress
            });

            let tc = taskCategory.toUpperCase();
            let tn = taskName.toUpperCase();

            let message = `Updated Task Checkpoint(s) In Personal Workspace Named "${tn}" In ${tc} Category.`

            addActivity(userActivitiesId, message)

            res.status(200).json({message:"Successfully Updated."})

        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteTask: async (req, res) => {
        try{
            const {activitiesId, personalTaskId, taskCategory, taskId, taskName} = req.params;

            await Task.findByIdAndDelete(taskId);

            pullObjectId(taskCategory, taskId, personalTaskId);

            let tc = taskCategory.toUpperCase();
            let tn = taskName.toUpperCase();

            let message = `Task Deleted In Personal Workspace Named "${tn}" In ${tc} Category.`

            addActivity(activitiesId, message)

            res.status(200).json({message:"Successfully Deleted."})
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    updateCompleted: async(req, res) => {
        try {
            const {taskId, taskCategory, userPersonalTasksId} = req.body;

            const date = new Date();
            
            await Task.findByIdAndUpdate(taskId,{
                completedDate:date.toLocaleDateString(),
                completedTime:date.toLocaleTimeString()
            });

            pullObjectId(taskCategory, taskId, userPersonalTasksId);

            await PersonalTask.findByIdAndUpdate(userPersonalTasksId, {
                $push:{
                    completed:taskId
                }
            });

            res.status(200).json({message:"Successfully Moved To Completed."})
            
        } catch (err) {
          res.status(500).json(err);  
        };
    }
};

const pullObjectId = async (taskCategory, taskId, userPersonalTasksId) => {
    if(taskCategory === 'development'){
        await PersonalTask.findByIdAndUpdate(userPersonalTasksId, {
            $pull:{
                development:taskId
            }
        });
    }
    else if(taskCategory === 'design'){
        await PersonalTask.findByIdAndUpdate(userPersonalTasksId, {
            $pull:{
                design:taskId
            }
        });
    }
    else{
        await PersonalTask.findByIdAndUpdate(userPersonalTasksId, {
            $pull:{
                bugfix:taskId
            }
        });
    };
};

const pushObjectId = async (taskCategory, taskId, userPersonalTasksId) =>{
    if(taskCategory === 'development'){
        await PersonalTask.findByIdAndUpdate(userPersonalTasksId, {
            $push:{
                development:taskId
            }
        });
    }
    else if(taskCategory === 'design'){
        await PersonalTask.findByIdAndUpdate(userPersonalTasksId, {
            $push:{
                design:taskId
            }
        });
    }
    else{
        await PersonalTask.findByIdAndUpdate(userPersonalTasksId, {
            $push:{
                bugfix:taskId
            }
        });
    };
};

const addActivity = async(id, message) =>{
    try{
        let date = new Date();

        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        let data ={
            message:message,
            day:day,
            month:month,
            year:year
        }

        await Activities.findByIdAndUpdate(id, {
            $push:{
                activities:data
            }
        });
    }
    catch(err){
        console.log(err);
    };
};

module.exports = personalTaskCtrls;