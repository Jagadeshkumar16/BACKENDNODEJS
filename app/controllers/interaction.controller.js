const db = require("../models");
const Interaction = db.interactions;

// Create and Save a new Interaction
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Interaction
  const interaction = new Interaction({
    interactionmatrix: req.body.interactionmatrix
  });

  // Save Interaction in the database
  interaction
    .save(interaction)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Interaction."
      });
    });
};

// Retrieve all Interactions from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Interaction.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving interactions."
      });
    });
};

// Find a single Interaction with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Interaction.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Interaction with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Interaction with id=" + id });
    });
};

// Update a Interaction by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Interaction.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Interaction with id=${id}. Maybe Interaction was not found!`
        });
      } else res.send({ message: "Interaction was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Interaction with id=" + id
      });
    });
};

// Delete a Interaction with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Interaction.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Interaction with id=${id}. Maybe Interaction was not found!`
        });
      } else {
        res.send({
          message: "Interaction was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Interaction with id=" + id
      });
    });
};

// Delete all Interactions from the database.
exports.deleteAll = (req, res) => {
  Interaction.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Interactions were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all interactions."
      });
    });
};

// Find all published Interactions
exports.findAllPublished = (req, res) => {
  Interaction.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving interactions."
      });
    });
};
