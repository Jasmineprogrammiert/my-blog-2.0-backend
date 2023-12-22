const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');

const app = express();
app.use(cors({origin: '*'}));
app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use('/blogs', blogRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes); 

mongoose
  .connect(process.env.dbURL)
  .then(() => app.listen(process.env.PORT))
  .catch(err => console.log(err));

app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
});