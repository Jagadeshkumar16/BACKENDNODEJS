const db = require("../models");
const Predator = db.predators;

// Create and Save a new Predator
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Predator
  const predator = new Predator({
    huntsuccessrate:Number
  });

  // Save Predator in the database
  predator
    .save(predator)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Predator."
      });
    });
};

// Retrieve all Predators from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Predator.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving predators."
      });
    });
};

// Find a single Predator with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Predator.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Predator with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Predator with id=" + id });
    });
};

// Update a Predator by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Predator.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Predator with id=${id}. Maybe Predator was not found!`
        });
      } else res.send({ message: "Predator was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Predator with id=" + id
      });
    });
};

// Delete a Predator with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Predator.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Predator with id=${id}. Maybe Predator was not found!`
        });
      } else {
        res.send({
          message: "Predator was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Predator with id=" + id
      });
    });
};

// Delete all Predators from the database.
exports.deleteAll = (req, res) => {
  Predator.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Predators were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all predators."
      });
    });
};

// Find all published Predators
exports.findAllPublished = (req, res) => {
  Predator.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving predators."
      });
    });
};
