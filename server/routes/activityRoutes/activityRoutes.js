const {Router} = require('express');
const router = Router();
const getActivities = require('../../controllers/activityController/activityController');

router.get('/activity/:id', getActivities);

module.exports = router