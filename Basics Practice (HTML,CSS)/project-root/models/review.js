const mongoose=require("mongoose")

//Schema
const reviewSchema = new mongoose.Schema({
    name: String,
    review: String
  });
  //model
  const Review = mongoose.model('Review', reviewSchema);

  module.exports=Review;
  