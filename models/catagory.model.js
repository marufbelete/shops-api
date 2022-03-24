
const Sequalize=require('sequelize');
const sequalize = require("../util/database");
 const Catagory=sequalize.define('catagory',{
   _id:{
   type:Sequalize.INTEGER,
   autoincrement:true,
   allowNull:false,
   primaryKey:true
   },
   catagory:{
  type:Sequalize.STRING,
  allowNull:false,
  unique: true
   },
 })


module.exports = Catagory ;



