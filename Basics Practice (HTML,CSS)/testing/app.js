const express = require('express');
const app = express();
const path = require('path');  // For path manipulation

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ... other routes and logic ...
