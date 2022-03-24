const Sequlize=require('sequelize')
const sequalize=new Sequlize("database","user","password",{
    dialect:"mariadb",
    host:"localhost"
});
module.exports=sequalize;