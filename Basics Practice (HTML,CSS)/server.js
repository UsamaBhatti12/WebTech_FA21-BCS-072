const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/reviews');

// Define Review Schema and Model
const reviewSchema = new mongoose.Schema({
  name: String,
  title: String,
  review: String,
  rating: Number,
  date: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Route to handle review form submission
app.post('/submit-review', (req, res) => {
  const newReview = new Review({
    name: req.body.name,
    title: req.body.title,
    review: req.body.review,
    rating: req.body.rating
  });

  newReview.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred while saving the review.');
    } else {
      res.redirect('/'); // Redirect to the homepage or reviews page after submission
    }
  });
});

// Route to display the reviews page
app.get('/', (req, res) => {
  Review.find({}, (err, reviews) => {
    if (err) {
      console.log(err);
    } else {
      res.render('reviews', { reviews: reviews }); // Pass reviews to your EJS template
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
