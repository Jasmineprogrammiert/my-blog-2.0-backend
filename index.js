const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const cookieParser = require('cookie-parser');
// routes
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: '*',
}));

app.use('/blogs', blogRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes); 

mongoose
  .connect(process.env.dbURL)
  .then(() => app.listen(process.env.PORT))
  .catch(err => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  }, 
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  }
});

const upload = multer({ storage: storage });
app.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded')
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
});
