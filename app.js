import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// import models
import Post from './models/post';

// import routes
import postRouter from './routes/posts';


const app = express();

mongoose.connect('mongodb://localhost:27017/projet4', (err) => {
  if (err)
    throw new Error('error: ', err);
  console.log('connected to db');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('/posts', postRouter);


app.listen(3000, () => {
  console.log('server working');
});