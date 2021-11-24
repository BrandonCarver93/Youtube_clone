const connectDB = require('./startup/db.js');
const mongoose = require('mongoose');
const express = require('express');

const app = express();

connectDB();

app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server start on port: ${port}`);
})