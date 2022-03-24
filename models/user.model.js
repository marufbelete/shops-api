
const Sequalize=require('sequelize');
const sequalize = require("../util/database");
 const User=sequalize.define('user',{
   _id:{
   type:Sequalize.INTEGER,
   autoincrement:true,
   allowNull:false,
   primaryKey:true
   },
   username:{
  type:Sequalize.STRING,
  allowNull:false,
   },
   password:{
    type:Sequalize.STRING,
    allowNull:false,
       }
 })

 module.exports = User;

 