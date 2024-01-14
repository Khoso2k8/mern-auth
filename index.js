const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = require('./app');
const dbConnect = require('./db/db');

dbConnect();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is connected on the port: ${port}`));
