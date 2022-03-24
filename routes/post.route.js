const express = require('express');
const userauth = require("../middleware/auth.middleware")
const { createPost,getAllPost,getMyPost,deletePost,updatePost } = require('../controllers/post.controller')
const {createCatagory,getCatgory,updateCatagory,deleteCatagory} = require('../controllers/catagory.controller')
const {createLocation,getCity,updateCity,deleteCity} = require('../controllers/location.controller')
const {errorHandler} = require('../middleware/errohandling.middleware')
const multer=require("multer");
const router = express.Router();
const fileStorage = multer.memoryStorage()

// file compression
const filefilter = (req, file, cb) => {
    console.log("filter")
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true)
  }
  else {
    const type=file.mimetype.split("/")[1]
    req.mimetypeError=`${type} file is not allowed please attach only image file`;
    cb(null, false,new Error(`${type} file is not allowed please attach only image file`))
    
  } 
}
const upload=multer({ storage: fileStorage, fileFilter: filefilter })

//post
router.post('/createpost', userauth,upload.array('image',6),createPost,errorHandler)
router.get('/getallpost', userauth,getAllPost,errorHandler)
router.put('/updatepost/:id',upload.array('image',6), userauth,updatePost,errorHandler)
router.put('/getmypost', userauth,getMyPost,errorHandler)
router.delete('/deletepost/:id', userauth,deletePost,errorHandler)

//catagory
router.post('/createcatagory', userauth,upload.single('image'),createCatagory,errorHandler)
router.get('/getcatagory', userauth,getCatgory,errorHandler)
router.put('/updatecatagory/:id',upload.single('image'), userauth,updateCatagory,errorHandler)
router.delete('/deletecatagory/:id', userauth,deleteCatagory,errorHandler)

//location
router.post('/addcity', userauth,createLocation,errorHandler)
router.get('/getcity', userauth,getCity,errorHandler)
router.put('/updatecity/:id', userauth,updateCity,errorHandler)
router.delete('/deleteCity/:id', userauth,deleteCity,errorHandler)

module.exports = router

