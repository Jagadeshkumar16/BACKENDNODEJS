const db = require("../models");
const Environment = db.environments;

// Create and Save a new Environment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.environment) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Environment
  const environment = new Environment({
    temperature: req.body.temperature,
    terraintype: req.body.terraintype,
    humidity: req.body.humidity ? req.body.humidity : false
  });

  // Save Environment in the database
  environment
    .save(environment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the environment."
      });
    });
};

// Retrieve all Environments from the database.
exports.findAll = (req, res) => {
  const environment = req.query.environment;
  var condition = environment ? { environment: { $regex: new RegExp(environment), $options: "i" } } : {};

  Environment.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving environments."
      });
    });
};

// Find a single Environment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Environment.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Environment with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Environment with id=" + id });
    });
};

// Update a Environment by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Environment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Environment with id=${id}. Maybe Environment was not found!`
        });
      } else res.send({ message: "Environment was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating environment with id=" + id
      });
    });
};

// Delete a Environment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Environment.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete environment with id=${id}. Maybe environment was not found!`
        });
      } else {
        res.send({
          message: "environment was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete environment with id=" + id
      });
    });
};

// Delete all Environments from the database.
exports.deleteAll = (req, res) => {
  Environment.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Environments were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all environments."
      });
    });
};

// Find all published environment
exports.findAllPublished = (req, res) => {
  Environment.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving environments."
      });
    });
};

