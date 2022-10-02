const Blog = require('../models/blogModel');

// create: post
const createBlog = async (req, res) => {
  const newBlog = new Blog(req.body);
  try {
    await newBlog.save();
    res.status(201).json('New blog is created');
  } catch (err) {
    res.status(500).json(err);
  }
}

// read: get
const allBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json('Blog not found');
  }
}
const singleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
}

// update: put
const updateBlog = async (req, res) => {
  try {
    const updateBlog = await Blog.findByIdAndUpdate
    (
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateBlog);
  } catch (err) {
    res.status(500).json(err);
  }
}

// delete: delete
const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  try {
    await blog.delete();
    res.status(200).json('Blog is deleted');
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  createBlog,
  allBlogs,
  singleBlog,
  updateBlog,
  deleteBlog
}