const { Router } = require('express');
const path = require('path');
const router = Router();

const personalTaskCtrls = require(path.join(__dirname, "..", "..", "controllers", "taskControllers", "taskControllers.js"))

router.get("/personaltasks/:id", personalTaskCtrls.userPersonalTasks);
router.get("/task/:id", personalTaskCtrls.getTask);
router.post("/addtask", personalTaskCtrls.addTask);
router.patch("/edittask", personalTaskCtrls.editTask);
router.patch("/updatetask", personalTaskCtrls.updateTask);
router.delete("/deletetask/:activitiesId/:personalTaskId/:taskCategory/:taskId/:taskName", personalTaskCtrls.deleteTask);
router.patch("/update/completed", personalTaskCtrls.updateCompleted);

module.exports = router;