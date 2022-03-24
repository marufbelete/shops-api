
const Sequalize=require('sequelize');
const sequalize = require("../util/database");
 const Post=sequalize.define('post',{
   _id:{
   type:Sequalize.INTEGER,
   autoincrement:true,
   allowNull:false,
   primaryKey:true
   },
   catagory: {
    type:Sequalize.STRING,
    allowNull:false,
},
    price: {
        type:Sequalize.DOUBLE,
        allowNull:false,
    },
    description: {
        type:Sequalize.STRING,
        allowNull:false,
    },
    imageUrl: {
        type:Sequalize.STRING,
        allowNull:false,
    },
     brandName: {
        type:Sequalize.STRING,
        allowNull:false,
    },
    city: {
        type:Sequalize.STRING,
        allowNull:false,
    },
    userId:{
        type:Sequalize.INTEGER,
        allowNull:false,
    }
      
   
 })
 module.exports = Post;
