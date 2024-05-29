// products

const Product = require('./models/product'); 

app.get('/', async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });
    res.render('home', { title: 'Bhatti Law Chambers', products: featuredProducts });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the products.');
  }
});
// ----------------------------------------------------

app.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    // Adding  product ID to session---------
    if (!req.session.visitedProducts) {
      req.session.visitedProducts = [];
    }
    if (!req.session.visitedProducts.includes(productId)) {
      req.session.visitedProducts.push(productId);
    }

    res.render('product', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the product.');
  }
});

app.get('/visited-products', async (req, res) => {
  try {
    const visitedProductIds = req.session.visitedProducts || [];
    const visitedProducts = await Product.find({ _id: { $in: visitedProductIds } });

    res.render('visited-products', { visitedProducts });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the visited products.');
  }
});


