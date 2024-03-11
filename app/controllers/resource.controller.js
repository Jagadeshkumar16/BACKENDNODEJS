const db = require("../models");
const Resource = db.resource;

// Create and Save a new Resource
exports.create = (req, res) => {
  // Validate request
  if (!req.body.resource) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Resource
  const resource = new Resource({
    resource: req.body.resource,
    type:req.body.type,
    quantity:req.body.quantity
  });

  // Save Resource in the database
  resource
    .save(resource)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Resource."
      });
    });
};

// Retrieve all Resources from the database.
exports.findAll = (req, res) => {
  const resource = req.query.resource;
  var condition = resource ? { resource: { $regex: new RegExp(resource), $options: "i" } } : {};

  Resource.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving resources."
      });
    });
};

// Find a single Resource with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Resource.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Resource with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Resource with id=" + id });
    });
};

// Update a Resource by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Resource.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Resource with id=${id}. Maybe Resource was not found!`
        });
      } else res.send({ message: "Resource was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Resource with id=" + id
      });
    });
};

// Delete a Resource with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Resource.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Resource with id=${id}. Maybe Resource was not found!`
        });
      } else {
        res.send({
          message: "Resource was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Resource with id=" + id
      });
    });
};

// Delete all Resources from the database.
exports.deleteAll = (req, res) => {
  Resource.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Resources were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all resources."
      });
    });
};

// Find all published Resources
exports.findAllPublished = (req, res) => {
  Resource.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving resources."
      });
    });
};
