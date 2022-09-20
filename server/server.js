require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

//Routes 
const authRoutes = require(path.join(__dirname,"routes","authRoutes","authRoutes.js"));
const taskRoutes = require(path.join(__dirname,"routes","taskRoutes","taskRoutes.js"));
const activitiesRoutes = require(path.join(__dirname,"routes","activityRoutes","activityRoutes.js"));

//Port
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes, taskRoutes, activitiesRoutes);

mongoose.connect(
    process.env.MONGODB_URI,
    {},
    (error) => {
        if (error) throw error;
        console.log("Successfully Connected To The TaskBoard MongoDB!");
    });

app.listen(PORT, () => {
    console.log("Server Successfully Running On Port", PORT);
});

