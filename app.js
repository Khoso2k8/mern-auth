const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoute');

const app = express();

app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  credentials: true,
  origin: ['https://mern-auth-wak.vercel.app/', 'http://localhost:5173'],
};
app.use(cors(corsOptions));

app.use('/api/v1/users', userRouter);

module.exports = app;
