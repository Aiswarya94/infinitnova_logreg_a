const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://0.0.0.0/logindata', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');

    // Define the UserSchema 
    const UserSchema = new mongoose.Schema({
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    
      email: {
        type: String,
        required: true,
        unique: true,
      },
      username: {
        type: String,
        required: true,
        unique: true,
        },
      password: {
        type: String,
        required: true,
      },
    });

    // Create the User model using the defined schema
    const User = mongoose.model('User', UserSchema);

    // Continue with setting up routes and starting the server
    app.use(express.json());
    app.use(cors());

    app.get('/', (req, resp) => {
      resp.send('App is Working');
    });

    app.post('/register', async (req, resp) => {
      try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
          delete result.password;
          resp.send(req.body);
          console.log(result);
        } else {
          console.log('User already registered');
        }
      } catch (e) {
        console.error(e);
        resp.status(500).send('Something Went Wrong');
      }
    });

    app.post('/login', async (req, res) => {
      const { username, password } = req.body;

      try {
          const user = await User.findOne({ username });

          if (!user) {
              return res.status(400).json({ message: 'User not found' });
          }

          if (password !== user.password) {
              return res.status(401).json({ message: 'Invalid Password' });
          }

          // res.status(200).json({ message: 'Login successful' });
         
           const token = jwt.sign({ user }, 'your-secret-key', { expiresIn: '1h' });
           res.status(200).json({messege: 'Login successful', token });

      } catch (error) {
          console.error(error);
          res.status(500).send('Something Went Wrong');
      }
  });

    app.listen(5000, () => {
      console.log('App is listening on port 5000');
    });
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

connectToDatabase();