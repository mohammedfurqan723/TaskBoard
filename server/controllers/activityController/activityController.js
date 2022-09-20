const Activities = require('../../models/activity/activityModel');

const getActivities = async (req, res) => {
    try {
        const {id} = req.params;

        const resp = await Activities.findById(id);

        res.status(200).json(resp);
        
    } catch(err) {
        res.status(500).json(err)
    };
};

module.exports = getActivities
