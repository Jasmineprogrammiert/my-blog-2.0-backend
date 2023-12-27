const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
    // images
    cover_img: {
      type: String,
      required: true,
    },
    banner_img: {
      type: String,
      required: true,
    },
    slider_img: {
      type: Array,
      required: true,
    },
    figcaption: {
      type: Array,
      required: true,
    },
    // blog-header
    title: {
      type: String,
      required: true,
    },
    url_title: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    preview: {
      type: String,
      required: true,
    },
    read_time: {
      type: String,
      required: true,
    },
    // blog-body
    description: {
      type: Array,
      required: true,
    },
    // hiking-info
    hiking_info: {
      type: Object,
      required: false,
    },
  }, { timestamps: true } // mongoose assigns createdAt and updatedAt fields to the schema automatically
);

module.exports = mongoose.model('Blog', BlogSchema);