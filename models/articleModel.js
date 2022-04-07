const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
      title: {
        type: String,
        required: true,
        unique: true
      },
      content: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      authorId: {
        type: String,
        required: true,
      },
      eddited: {
        type: String,
        default: ""
      }
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("articles", articleSchema);

module.exports = Article;
