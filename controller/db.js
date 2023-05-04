const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/Candidates', { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true });
    console.log('connected to db');
  } catch (error) {
    console.log('error', error);
  }
};

module.exports = connectDB;
