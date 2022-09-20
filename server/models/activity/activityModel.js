const {Schema, model} = require('mongoose');

const activitySchema = new Schema({
    activities:Array,
});

module.exports = model("Activities",activitySchema);