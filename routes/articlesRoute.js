const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Article = require("../models/articleModel");

// Get all articles
router.get("/getallarticles", (req, res) => {
  Article.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.json({ message: "Something went wrong" });
    }
  });
});

// Create a new article
router.post("/new", (req, res) => {
  Article.findOne({ title: req.body.title })
    .then((article) => {
      if (article) {
        res.json({ message: "Title already exists" });
      } else {
        let newArticle = new Article({
          title: req.body.title,
          content: req.body.content,
          author: req.body.author,
          authorId: req.body.authorId
        });
        newArticle
          .save()
          .then((result) => {
            res.json({ message: "Article successfully created" });
          })
          .catch((err) => {
            res.json({ message: "Failed to create article" });
          });
      }
    })
    .catch((err) => {
      res.json({ message: "Server is not responding" });
    });
});

// Get an article by id
router.post("/getarticle", (req, res) => {
  Article.findOne({ _id: req.body.id })
    .then((article) => {
      res.send(article);
    })
    .catch((err) => {
      res.json({ message: "Something went wrong" });
    });
});

// Edit an article
router.put("/updatearticle", (req, res) => {
  Article.findOneAndUpdate(
    { _id: req.body.id },
    {
      title: req.body.title,
      content: req.body.content,
      eddited: req.body.eddited
    },
    (err) => {
      if (err) {
        res.json({ message: "Something went wrong please try again" });
      } else {
        res.json({ message: "Article was eddited successfully" });
      }
    }
  );
});

// Delete an article
router.put("/deletearticle", (req, res) => {
  Article.findOneAndDelete({_id: req.body.id}, (err) => {
    if(err){
      res.json({message: "Something went wrong please try again"})
    } else {
      res.json({message: "Article deleted"})
    }
  })
})
module.exports = router;
