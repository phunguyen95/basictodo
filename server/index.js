const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');

const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const app = express();
//body parser middlewaer
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
//db config
const db = require('./config/keys').mongoURI;
//connect to mongoosedb
mongoose
  .connect(db)
  .then(() => {
    console.log('connected');
  })
  .catch(err => {
    console.log(err);
  });
//passport middleware;
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);
//use routes
app.use('/api/users', users);
//server static access if  in production
if(process.env.NODE_ENV==='production'){
  app.use(express.static('../client/dist'));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../client/dist/index.html'));
  })
}
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(port);
});
