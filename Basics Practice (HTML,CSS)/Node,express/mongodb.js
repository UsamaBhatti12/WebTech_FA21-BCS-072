const express= require("express");
const app=express();
const mongoose=require("mongoose");

app.use(express.json());
app.listen(3000);

// Taskkill /IM node.exe /F   run this command on cmd if the there occurs an error like 
//node:events:497 throw er; // Unhandled 'error' event ^

//Connection to mongodb

mongoose.connect('mongodb://localhost:27017/users')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

  // now create a mongoose schema and its model
  // i have created it  in the folder models (model anme is user)

  const usermodel=require('./models/user');
  // model accquired


// Create a new user
app.post('/users', async (req, res) => {
    try {
      const user = new usermodel(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  // get all users

  app.get('/users', async (req, res) => {
    try {
      const users = await usermodel.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // update a user by id
  app.patch('/users/:id', async (req, res) => {
    try {
      const user = await usermodel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!user) {
        return res.status(404).send();
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Delete a user by ID
  app.delete('/users/:id', async (req, res) => {
    try {
      const user = await usermodel.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send();
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });









 
//   Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
//(Use `node --trace-warnings ...` to show where the warning was created)
//(node:11184) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
//MongoDB connected...