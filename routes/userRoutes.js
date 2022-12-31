const router = require('express').Router();
const bcrypt = require('bcrypt');
// const Blog = require('../models/blogModel');
const User = require('../models/userModel');

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  if (req.body._id === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate
      (
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json('Authorization failed')
  }
});

router.delete('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    await user.delete();
    res.status(200).json('User is deleted');
  } catch (err) {
    res.status(500).json(err);
  }

  // if (req.body._id === req.params.id) {
  //   try {
  //     const user = await User.findById(req.params.id);
  //     try {
  //       // await Blog.deleteMany({ username: user.username });
  //       await User.findByIdAndDelete(req.params.id);
  //       res.status(200).json('User is deleted.');
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   } catch (err) {
  //     res.status(404).json('User not found');
  //   }
  // } else {
  //   res.status(401).json('Authorization failed');
  // }
});

module.exports = router;