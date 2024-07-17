const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res) => {
  res.json({name:"Shayan Azeem"});
})

const PORT = process.env.PORT || 5000;

app.listen((PORT), () => {
  console.log('Server is running on port 5000...');
});

//Routes
app.use('/user',require('./routes/useRoutes'));
app.use('/api',require('./routes/categoryRouter'));
app.use('/api',require('./routes/productRouter'))



//connect mongoDB

const URI = process.env.MONGODB_URL;

mongoose.connect(URI,{
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
  console.log(err);
});


