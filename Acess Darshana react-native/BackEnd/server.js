import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import validator from 'validator';


const app = express();
const port = 4000;
app.use(cors());
const prefix = 'CMP';
const min = 1000;
const max = 9999;

function generateUniqueId() {
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return `${prefix}${randomNum}`;
}



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
  id: { type: String, required: true, unique: true },
  name: String,
  email: String,
  complainType: String,
  complain: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

// Define model for your collection
const MyModel = mongoose.model('MyModel', mySchema);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only jpeg and png files
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Routes
app.post('/api/data', upload.single('image'), async (req, res) => {
  try {
    const { name, email, complainType, complain } = req.body;
    const image = req.file ? req.file.filename : '';
    const id = generateUniqueId();

    // Validate the email field using the "validator" package
    if (!validator.isEmail(email)) {
      res.status(400).json({ message: 'Invalid email address.' });
      return;
    }
    
    const myData = new MyModel({
      id,
      name,
      email,
      complainType,
      complain,
      image,
      createdAt: new Date().toLocaleString(), // Set createdAt field to the current date and time on the server device in a formatted string
    });

    const savedData = await myData.save();
    console.log('Data saved successfully:', savedData);
    
    // Return saved data with generated ID
    res.json({ data: savedData, uniqueId:id });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while saving the complaint data.' });
  }
});



// Define the endpoint for getting all complaints
app.get('/api/data', async (req, res) => {
  try {
    const complaints = await MyModel.find();
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while getting the complaints.' });
  }
});

// Define the endpoint for getting a single complaint
app.get('/api/data/:id', async (req, res) => {
  try {
    const complaint = await MyModel.findById(req.params.id);
    if (complaint) {
      res.json(complaint);
    } else {
      res.status(404).json({ message: 'Complaint not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid complaint ID.' });
  }
});

// Define the endpoint for updating a complaint
app.put('/api/data/:id', upload.single('image'), async (req, res) => {
  try {
    const complaint = await MyModel.findById(req.params.id);
    if (!complaint) {
      res.status(404).json({ message: 'Complaint not found.' });
      return;
    }
    complaint.name = req.body.name;
    complaint.email = req.body.email;
    complaint.complainType = req.body.complainType;
    complaint.complain = req.body.complain;
    if (req.file) {
      complaint.image = req.file.filename;
    }
    await complaint.save();
    console.log('Complaint updated successfully:', complaint);
    res.json(complaint);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid complaint ID.' });
  }
});

// Define the endpoint for deleting a complaint
app.delete('/api/data/:id', async (req, res) => {
  try {
    const result = await MyModel.findOneAndDelete({ _id: req.params.id });
    console.log('Result:', result); // add this logging statement
    if (!result) {
      res.status(404).json({ message: 'Complaint not found.' });
      return;
    }
    console.log('Complaint deleted successfully:', result);
    res.json({ message: 'Complaint deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid complaint ID.' });
  }
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

