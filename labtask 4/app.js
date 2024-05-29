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
  .catch((err) => console.error('Failed to connect to MongoDB database', err));

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

// -------------------session----------------------------/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

// no need to connect to multiple databases, just create the collections in the same database  and give connection to that database


// acquiring User model
const User=require('./models/users');

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

// Route to handle login form submission--------------
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      req.session.userId = user._id;
      res.redirect('/dashboard');
    } else {
      res.send('Invalid username or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Route to render dashboard page----------------
// Dashboard route with pagination and search
// updated dashboard page with appointments and contact messages

app.get('/dashboard', isAuthenticated, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const searchQuery = req.query.search || '';

  let query = {};
  if (searchQuery) {
    query = {
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
        { phone: { $regex: searchQuery, $options: 'i' } },
        { nature: { $regex: searchQuery, $options: 'i' } }
      ]
    };
  }

  try {
    const totalAppointments = await Appointment.countDocuments(query);
    const appointments = await Appointment.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalAppointmentPages = Math.ceil(totalAppointments / limit);

    const contactQuery = {};
    if (searchQuery) {
      contactQuery.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
        { message: { $regex: searchQuery, $options: 'i' } }
      ];
    }

    const totalContacts = await Contact.countDocuments(contactQuery);
    const contacts = await Contact.find(contactQuery)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalContactPages = Math.ceil(totalContacts / limit);

    res.render('dashboard', {
      appointments,
      contacts,
      totalAppointmentPages,
      totalContactPages,
      currentPage: page,
      searchQuery,
      totalAppointments,
      totalContacts
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching data.');
  }
});

// delete appointments route

app.post('/delete-appointments', isAuthenticated, async (req, res) => {
  const { appointmentIds } = req.body;

  try {
    if (Array.isArray(appointmentIds) && appointmentIds.length > 0) {
      await Appointment.deleteMany({ _id: { $in: appointmentIds } });
      res.redirect('/dashboard');
    } else {
      res.status(400).send('No appointments selected for deletion.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while deleting appointments.');
  }
});





// Route to handle logout---------------
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error logging out', err);
      return res.status(500).send('Internal Server Error');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});


// Submit appointment form ------------------------------/

const Appointment=require('./models/appointments');

app.use(bodyParser.urlencoded({ extended: true }));  //middleware

app.post('/book-appointment', async (req, res) => {
  const { name, email, phone, date, time, nature, comments } = req.body;
  
  try {
    const newAppointment = new Appointment({
      name,
      email,
      phone,
      date,
      time,
      nature,
      comments
    });

    await newAppointment.save();
    

    setTimeout(() => {
      res.redirect('/appointment?success=true');
    }, 200); 

    
  } catch (err) {
    console.error(err);
    res.status(500).send('Your appointment cannot be booked right now.');
  }
});

//--------cont us-----
app.get('/contact', (req, res) => {
  res.render('contact');
});

const Contact = require('./models/contact');

// Route to handle contact form submission
app.post('/submit-contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.render('contact', { success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while saving the contact message.');
  }
});



// Route to render a protected dashboard page


