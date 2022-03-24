const Catagory = require("../models/catagory.model");

exports.createCatagory=async (req, res, next) => {
    try {
        
        console.log(req.body)
        const catagory=req.body.city;
        const isexist = await LocationPost.findOne({ where: {  catagory:catagory }})

        if (isexist.length === 0) {
            // save non exsting location
            const newcatagory = await Catagory.create({
                catagory: catagory,
            })

            return res.json(newcatagory)
        }
        else {
            const error = new Error("This location already exist")
            error.statusCode = 400
            throw error;
        }
    }

  catch(error) {
       next(error)
  }
}

//get city
exports.getCatgory=async(req,res,next)=>{
    try{
        const catagory = await Catagory.findAll()
        res.json(catagory)
    }
    catch(error){
  next(error)
    }
  }

//update location info
exports.updateCatagory=async(req,res,next)=>{
    try{
        const id=req.body.id;
        const catagory=req.body.catagory
        const newcat = await Catagory.update(
            {
                catagory: catagory,
            },
            { where: { _id: id } })
       
        res.json(newcat) 
    }

    catch(error){
        next(error)
          }
    }

// for admin delete
exports.deleteCatagory = async (req, res, next) => {
    try {
        const id=req.params.id;
        await Catagory.destroy({ where: { _id: id } });

        res.json("deleted succssfully")

    }
    catch(error) {
        next(error)
    }
}