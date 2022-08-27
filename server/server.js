require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// app.use("/api");

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

