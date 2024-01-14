const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoute');

const app = express();

const corsOptions = {
  origin: 'https://mern-auth-wak.vercel.app',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/users', userRouter);

module.exports = app;
