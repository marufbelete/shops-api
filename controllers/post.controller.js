const Post = require("../models/post.model");
const Sequalize=require('sequelize')
const Location = require("../models/location.model");
const sharp=require("sharp")
const fs=require("fs");
//for more than one file req.file will be chnaged in to req.files
exports.createPost=async (req, res, next) => {
    try {
      const userid=req.user.user_id;
        if(!!req.mimetypeError)
        {
            const error = new Error(req.mimetypeError)
            error.statusCode = 400
            throw error;
        }
    const imgurl=[]
    if (req.files.length > 0)
    {
        if (!fs.existsSync("../images")){
            fs.mkdirSync("../images");
        }
console.log(req.files.length)
  for(let f=0;f<req.files.length;f++)
  {
    console.log(req.files[f])
    const imagetype=(req.files[f].mimetype).split("/")[1]
    const path=req.files[f].originalname
           sharp(req.files[f].buffer)
          .resize({ width:200, fit: 'contain', })
    .toFormat(imagetype)
    .toFile(`./images/${path}`);
    imgurl.push(path)
 }

 const isexist = await Location.findOne({
    city: req.body.city
})
if (isexist.length === 0) {
    // save non exsting location
    await Location.create({
        city: req.body.city,
    })
}
 const newpost = await Post.create({
    catagory:req.body.catagory,
    price:req.body.price,
    description:req.body.description,
    imageUrl:imgurl,
    brandName:req.body.brandname,
    city:req.body.city,
    userId:userid
    
  })
     res.json(newpost)
    }
  else{
    const error = new Error("you should have an attachment")
    error.statusCode = 400
    throw error;
  }
    }
  catch(error) {
    next(error)
  }
}
//get all post
exports.getAllPost = async (req, res, next) => {
    try {
      const Op=Sequalize.Op
        let conditions = [];
        let catagory = !!req.query.catagory ? req.query.catagory : '';
        let location = !!req.query.location ? req.query.location : '';
        let price = !!req.query.price ? req.query.price : !!req.query.price;
        let brandname = !!req.query.brandname ? req.query.brandname : !!req.query.brandname;
      if (catagory) {
          conditions.push({catagory:req.params.catagory});
        }
        if (location) {
            conditions.push({city: location });
        }
        if (price) {
            conditions.push({ price: {[Op.lte]: price } });
        }
        if (brandname) {
            conditions.push({ brandName: brandname });
        }
        let final_condition = { $and: conditions };
        
        const posts = await Post.findAll(final_condition)
        return res.json(posts)
    }
    catch(error) {
        next(error)
      }
}
//get my post
exports.getMyPost=async(req,res,next)=>{
  try{
    const userid=req.user.user_id
      const posts = await Post.findAll({where:{userId:userid}})
      res.json(posts)
  }
  catch(error){
next(error)
  }
}
// update post edit
exports.updatePost = async (req, res, next) => {
    try {
      if(!!req.mimetypeError)
      {
          const error = new Error(req.mimetypeError)
          error.statusCode = 400
          throw error;
      }
        const imgurl=[]
        const id =req.params.id
        if (req.files.length > 0)
       {
        if (!fs.existsSync("../images")){
            fs.mkdirSync("../images");
        }
  for(let f=0;f<req.files.length;f++)
  {
    console.log(req.files[f])
    const imagetype=(req.files[f].mimetype).split("/")[1]
    const path=req.files[f].originalname
           sharp(req.files[f].buffer)
          .resize({ width:200, fit: 'contain', })
    .toFormat(imagetype)
    .toFile(`./images/${path}`);
    imgurl.push(path)
 }

const isexist = await Location.findOne({
    city: req.body.city
})
if (isexist.length === 0) {
    // save non exsting location
    await Location.create({
        city: req.body.city
  })
}
const updated=await Post.update({ 
    catagory:req.body.catagory,
    price:req.body.price,
    description:req.body.description,
    imageUrl:imgurl,
    brandName:req.body.brandname,
    city:req.body.city
  },{ where: { _id: id } })
   return res.json(updated)
}

else
{
  const updated=await Post.update({ 
    catagory:req.body.catagory,
    price:req.body.price,
    description:req.body.description,
    brandName:req.body.brandname,
    city:req.body.city
  },{ where: { _id: id } })
  res.json(updated)
}     
    }
    catch(error) {
        next(error)
      }
}

exports.deletePost = async (req, res, next) => {
    try {
        const id = req.params.id
        await Post.destroy({ where: { _id: id } });
        res.json("deleted sucessfully")
    }
    catch(error) {
        next(error)
      }

}