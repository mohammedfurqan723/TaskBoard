const { Schema, model, Types } = require('mongoose');

const personalTaskSchema = new Schema({
    development: [
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ],
    design: [
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ],
    bugfix: [
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ],
    completed: [
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ],
    user: {
        type: Types.ObjectId,
        ref: "UserAuth"
    }

},
    {
        timestamps: true
    });

module.exports = model("PersonalTask", personalTaskSchema);