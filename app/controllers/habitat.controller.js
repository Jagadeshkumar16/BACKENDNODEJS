const db = require("../models");
const Habitat = db.habitats;

// Create and Save a new Habitat
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Habitat
  const habitat = new Habitat({
    type:string
  });

  // Save Habitat in the database
  habitat
    .save(habitat)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Habitat."
      });
    });
};

// Retrieve all Habitats from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Habitat.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving habitats."
      });
    });
};

// Find a single Habitat with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Habitat.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Habitat with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Habitat with id=" + id });
    });
};

// Update a Habitat by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Habitat.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Habitat with id=${id}. Maybe Habitat was not found!`
        });
      } else res.send({ message: "Habitat was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Habitat with id=" + id
      });
    });
};

// Delete a Habitat with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Habitat.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Habitat with id=${id}. Maybe Habitat was not found!`
        });
      } else {
        res.send({
          message: "Habitat was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Habitat with id=" + id
      });
    });
};

// Delete all Habitats from the database.
exports.deleteAll = (req, res) => {
  Habitat.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Habitats were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all habitats."
      });
    });
};

// Find all published Habitats
exports.findAllPublished = (req, res) => {
  Habitat.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving habitats."
      });
    });
};
