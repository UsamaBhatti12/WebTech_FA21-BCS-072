const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/clientreviews')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Failed to connect to MongoDB database', err));

const sampleProducts = [
    {
      "name": "Constitutional Law",
      "description": "An in-depth analysis of constitutional law principles and case studies.",
      "price": 45.99,
      "category": "Law Books",
      "isFeatured": true
    },
    {
      "name": "Criminal Law",
      "description": "Comprehensive coverage of criminal law, including major crimes and defenses.",
      "price": 39.99,
      "category": "Law Books",
      "isFeatured": false
    },
    {
      "name": "Corporate Law",
      "description": "Detailed guide to corporate law, covering key concepts and recent developments.",
      "price": 55.00,
      "category": "Law Books",
      "isFeatured": true
    },
    {
      "name": "Contract Law",
      "description": "An essential resource for understanding contract law and its applications.",
      "price": 34.95,
      "category": "Law Books",
      "isFeatured": false
    },
    {
      "name": "Intellectual Property Law",
      "description": "A thorough examination of intellectual property laws and regulations.",
      "price": 49.99,
      "category": "Law Books",
      "isFeatured": true
    },
    {
      "name": "Environmental Law",
      "description": "A comprehensive look at environmental laws and policies.",
      "price": 44.50,
      "category": "Law Books",
      "isFeatured": false
    },
    {
      "name": "Family Law",
      "description": "Guide to family law, including marriage, divorce, and child custody.",
      "price": 29.99,
      "category": "Law Books",
      "isFeatured": false
    },
    {
      "name": "Labor Law",
      "description": "Exploration of labor law topics such as employment rights and workplace safety.",
      "price": 42.00,
      "category": "Law Books",
      "isFeatured": true
    },
    {
      "name": "Tax Law",
      "description": "Understanding the intricacies of tax law and its impact on individuals and businesses.",
      "price": 37.50,
      "category": "Law Books",
      "isFeatured": false
    },
    {
      "name": "International Law",
      "description": "Comprehensive guide to international law and global legal practices.",
      "price": 60.00,
      "category": "Law Books",
      "isFeatured": true
    }
  ];

Product.insertMany(sampleProducts)
    .then(() => {
        console.log('Sample products added');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
        mongoose.connection.close();
    });
