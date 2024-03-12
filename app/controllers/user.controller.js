const db = require("../models");
const User = db.user;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const user = new User({
    username: req.body.username,
    password: 'Pass12!@',
    email: req.body.email,
    role: req.body.role
  });

  // Save Tutorial in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

exports.login = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).send({ message: "Invalid Credentials!" });
    return;
  }
  
  User.findOne({username: req.body.username})
    .then(data => {
      if (!data)
        res.status(401).send({ message: "Invalid user - " + req.body.username });
      else {
        data.password  == req.body.password ? 
        res.send({ message:'success' }) :
        res.status(401).send({ message: "Invalid password - " + req.body.username });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User" });
    });
};