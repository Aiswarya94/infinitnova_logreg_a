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
        role: {
          type: String,
          required: true,
        },
      password: {
        type: String,
        required: true,
      },
     
    });

    
// Define the Mongoose schema for data
// const DataSchema = new mongoose.Schema({
//   city: String,
//   year: Number,
//   population: Number,
// });

// Create the Mongoose model for data
// const DataModel = mongoose.model('Data', DataSchema);

const populationSchema = new mongoose.Schema({
  city_name: {
    type: String,
    required: true,
  },
  population: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const Population = mongoose.model('Population', populationSchema);

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

          const userRole = user.role;

          // res.status(200).json({ message: 'Login successful' });
         
           const token = jwt.sign({ user }, 'your-secret-key', { expiresIn: '1h' });
           res.status(200).json({messege: 'Login successful', role: userRole ,token });

      } catch (error) {
          console.error(error);
          res.status(500).send('Something Went Wrong');
      }
  });
  app.post('/add-population', async (req, resp) => {
    try {
        const populationData = new Population(req.body);
        const result = await populationData.save();
        resp.status(201).json(result);
    } catch (e) {
        console.error(e);
        resp.status(500).send('Something Went Wrong');
    }
});

// Read Operation - Retrieve population data
app.get('/get-population', async (req, resp) => {
    try {
        const populationData = await Population.find();
        resp.status(200).json(populationData);
    } catch (e) {
        console.error(e);
        resp.status(500).send('Something Went Wrong');
    }
});


// Update Operation - Update population data by ID
app.put('/update-population/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const updatedPopulationData = await Population.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedPopulationData) {
            return resp.status(404).json({ message: 'Population data not found' });
        }

        resp.status(200).json(updatedPopulationData);
    } catch (e) {
        console.error(e);
        resp.status(500).send('Something Went Wrong');
    }
});

// Delete Operation - Delete population data by ID
app.delete('/delete-population/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const deletedPopulationData = await Population.findByIdAndRemove(id);

        if (!deletedPopulationData) {
            return resp.status(404).json({ message: 'Population data not found' });
        }

        resp.status(200).json({ message: 'Population data deleted successfully' });
    } catch (e) {
        console.error(e);
        resp.status(500).send('Something Went Wrong');
    }
});

  // const DataModel = mongoose.model('Data', {
  //   city: String,
  //   year: Number,
  //   population: Number,
  // });
  
  // API route to get data from MongoDB
  // app.get('/get-data-from-mongodb', async (req, res) => {
  //   try {
  //     const data = await DataModel.find();
  //     res.json(data);
  //   } catch (error) {
  //     console.error('Error fetching data from MongoDB:', error);
  //     res.status(500).send('Internal Server Error');
  //   }
  // });

  // app.post('/add-data-to-mongodb', async (req, res) => {
  //   try {
      
      // const { city, year, population } = req.body;
  
     
  //     const newData = new DataModel({
  //       city,
  //       year,
  //       population,
  //     });
  
     
  //     await newData.save();
  
  //     res.status(201).json({ message: 'Data added to MongoDB successfully' });
  //   } catch (error) {
  //     console.error('Error adding data to MongoDB:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });
  
  
    app.listen(5000, () => {
      console.log('App is listening on port 5000');
    });
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

connectToDatabase();