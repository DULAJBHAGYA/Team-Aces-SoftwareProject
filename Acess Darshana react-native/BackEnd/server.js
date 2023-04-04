import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 4000;
app.use(cors());

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
  complainType: String,
  complain: String,
  image: String
});

// Define model for your collection
const MyModel = mongoose.model('MyModel', mySchema);

// Multer middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MB
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, PNG files are allowed'));
    }
  }
}).single('image');

// Routes
app.post('/api/data', (req, res) => {
  console.log("Backend Started");
  upload(req, res, (err) => {
    if (err) {
      console.log(err.message);
      res.status(400).json(`Error: ${err.message}`);
    } else {
      const { name, email, complainType, complain } = req.body;
      const image = req.file ? req.file.filename : '';
      const myData = new MyModel({
        name,
        email,
        complainType,
        complain,
        image
      });
      myData.save()
        .then(() => res.json('Data added successfully'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    }
  })
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
