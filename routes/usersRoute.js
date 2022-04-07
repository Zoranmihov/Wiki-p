const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Article = require("../models/articleModel");

// Get all users
router.get("/getallusers", (req, res) => {
  User.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.json({ message: "Something went wrong" });
    }
  });
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(async (user) => {
      if (user) {
        res.json({ message: "Email is already in use" });
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });
        newUser
          .save()
          .then((result) => {
            res.json({
              message: "Registration success, please login to continue",
            });
          })
          .catch((err) => {
            res.json({ message: "Registration failed" });
          });
      }
    })
    .catch((err) => {
      res.json({ message: "Server is not responding" });
    });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(async (user) => {
      let isTrue = await bcrypt.compare(req.body.password, user.password);
      if (isTrue) {
        foundUser = {
          name: user.name,
          id: user._id,
          email: user.email,
          role: user.role,
        };
        res.json({ message: `Welcome ${user.name}`, foundUser });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      res.json({ message: "User doesn't exist" });
    });
});

//Edit an user
router.put("/update", async (req, res) => {
  let updatedUser = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    updatedUser.password = hashedPassword;
  }
  console.log(updatedUser);
  User.findOneAndUpdate({ _id: req.body.id }, updatedUser, async (err, docs) => {
    if (!err) {
      await Article.findOneAndUpdate({authorId: req.body.id}, {author: updatedUser.name})
      res.json({ message: "User updated successfully" });
    } else {
      res.json({ message: `Something went wrong please try again => ${err} ` });
    }
  });
});

// Get user by id

router.post("/getuser", (req, res) => {
  User.findOne({ _id: req.body.id })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.json({ message: "Something went wrong" });
    });
});

// Delete user
router.put("/deleteuser", (req, res) => {
  User.findOneAndDelete({ _id: req.body.id }, (err) => {
    if(!err) {
      res.json({message: "Profile deleted"})
    } else {
      res.json({message: "Something wen't wrong please try again"})
    }
  })
    
});

module.exports = router;
