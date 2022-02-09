const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
 
  //our cata perfume bodymakeup and hairtreatment
  city: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  subCity: {
    type: String,
    trim: true,
    lowercase: true,
  },
  village: {
    type: String,
    trim: true,
    lowercase: true,
  },
},
  {
    timestamps: true,
  },
);


const LocationPost = mongoose.model("Location", LocationSchema);

module.exports = LocationPost;