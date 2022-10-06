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
app.use(cors({ origin: 'https://lieblingsjasmin.com' }));

app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 

mongoose
  .connect('mongodb+srv://Jasmine:y1Z8W8c0VdcF351m@myblog.3nkrtkq.mongodb.net/blog?retryWrites=true&w=majority')
  .then(() => app.listen(8000))
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
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded')
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
});