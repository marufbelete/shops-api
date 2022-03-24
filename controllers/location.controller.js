const Location = require("../models/location.model");

//for all
exports.createLocation=async (req, res, next) => {
    try {
        console.log(req.body)
        const isexist = await LocationPost.findOne({ where: {  city: req.body.city }})

        if (isexist.length === 0) {
            // save non exsting location
            const location = await Location.create({
                city: req.body.city,
                subCity: req.body.subcity,
                village: req.body.village
            })

            return res.json(location)
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
exports.getCity=async(req,res,next)=>{
    try{
        const location = await Location.findAll()
        res.json(location)
    }
    catch(error){
  next(error)
    }
  }

//update location info
exports.updateCity=async(req,res,next)=>{
    try{
        const id=req.body.id;
        const city=req.body.city
        const newcity = await Location.update(
            {
                city: city,
            },
            { where: { _id: id } })
       
        res.json(newcity) 
    }

    catch(error){
        next(error)
          }
    }

// for admin delete
exports.deleteCity = async (req, res, next) => {
    try {
        const id=req.params.id;
        await Location.destroy({ where: { _id: id } });

        res.json("deleted succssfully")

    }
    catch(error) {
        next(error)
    }
}