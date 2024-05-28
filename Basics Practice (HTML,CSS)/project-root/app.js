const express = require('express');
const path = require('path');
const { title } = require('process');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const session = require('express-session');
// npm install express-ejs-layouts
//With this setup, express-ejs-layouts will recognize the 
//layout directive in your EJS files and render them accordingly.

// const expressLayouts = require('express-ejs-layouts');
// app.use(expressLayouts);
// Set the default layout
// app.set('layout', 'layout');
// this will automatically use the layout.ejs template foe each view

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory (ejs will use know this is the views directory and will search for ech view in here)
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory(css, js etc)
app.use(express.static(path.join(__dirname, 'public')));

//server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// I will use the layout.ejs file as the main layout, and include the index.ejs( or each view.ejs etc) content within it.

// -------------------------------------------------------------------------------------------------------------------
//Mongodb 
mongoose.connect('mongodb://localhost:27017/clientreviews',)
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

  // Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// exporting  Review model
const Review=require('./models/review');

//Routes --------------------------------------------------------------------------------------------------------------

// Route for the home page
app.get('/', (req, res) => {
  res.render('home', { title: 'Bhatti Law Chambers' });
});


// Route to display the reviews page---------------------
// app.get('/reviews', async (req, res) => {
//   try {
//       const page= req.query.page || 1;
//       const limit1=req.query.limit1 || 7;
//     const reviews = await Review.find({}).skip((page-1)*limit1).limit(limit1);
//     res.render('reviews', { reviews });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('An error occurred while fetching the reviews.');
//   }
// });
app.get('/reviews', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    const totalReviews = await Review.countDocuments();
    const totalPages = Math.ceil(totalReviews / limit);
    const reviews = await Review.find({}).skip((page - 1) * limit).limit(limit);

    res.render('reviews', {
      reviews,
      currentPage: page,
      totalPages,
      limit
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the reviews.');
  }
});


// router handler for submitting reviews
app.post('/submit-review', async (req, res) => {
  const newReview = new Review({
    name: req.body.name,
    review: req.body.review
  });

  try {
    await newReview.save();
    res.redirect('/reviews'); // Redirect with success query parameter
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while saving the review.');
  }
});
//------------------------------
// appointment form
app.get('/appointment', (req, res) => {
  res.render('appointment', { title: 'Book an appointment' });
});

// -------------------session----------------/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));
const users = [
  { id: 1, username: 'user', password: 'password' } // Replace with actual user data
];

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// Route to render login page
app.get('/login', (req, res) => {
  res.render('login');
});

// Route to handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
    req.session.userId = user.id;
    res.redirect('/dashboard');
  } else {
    res.send('Invalid username or password');
  }
});

// Route to render a protected dashboard page
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.send('Welcome to the dashboard!');
});

// Route to handle logout
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/dashboard');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});