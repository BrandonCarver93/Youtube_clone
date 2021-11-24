const connectDB = require('./startup/db.js');
const mongoose = require('mongoose');
const express = require('express');
const comments = require('./routes/comments');

const app = express();

connectDB();

app.use(express.json());
app.use('/api/comments', comments);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server start on port: ${port}`);
});