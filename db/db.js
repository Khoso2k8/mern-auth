const mongoose = require('mongoose');
const dbConnect = () => {
  mongoose
    .connect(process.env.MOGOODB_URL)
    .then(() => console.log('DB is connected'))
    .catch(err => console.log(err));
};

module.exports = dbConnect;
