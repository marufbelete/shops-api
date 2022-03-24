const express = require("express");
const sequalize = require("./util/database");
const app = express();
const userroute = require('./routes/user.route');
const postroute = require('./routes/post.route');
const config=require('./config.json')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userroute)
app.use(postroute)

sequalize.sync().then(result=>{
  console.log(result)
  app.listen(6000)
}).catch(error=>{
  console.log(error)
})



