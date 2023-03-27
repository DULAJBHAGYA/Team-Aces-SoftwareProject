const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://Darshana:uom12345@hbms.mn0sf7z.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.log(err));

// Define schema for your collection
const Schema = mongoose.Schema;
const mySchema = new Schema({
  name: String,
  email: String,
  complain: String,
});

// Define model for your collection
const MyModel = mongoose.model('MyModel', mySchema);

// Routes
app.post('/api/data', (req, res) => {
  const myData = new MyModel(req.body);
  myData.save()
    .then(() => res.json('Data added successfully'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
