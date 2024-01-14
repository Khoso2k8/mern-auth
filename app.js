const express = require('express');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoute');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/users', userRouter);

module.exports = app;
