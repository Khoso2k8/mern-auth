const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoute');

const app = express();

app.use(cors());

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/users', userRouter);

module.exports = app;
