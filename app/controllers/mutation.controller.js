const db = require("../models");
const Mutagen = db.mutagens;

// Create and Save a new Mutagen
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Mutagen
  const mutagen = new Mutagen({
    mutationrate:Float32Array
  });

  // Save Mutagen in the database
  mutagen
    .save(mutagen)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Mutagen."
      });
    });
};

// Retrieve all Mutagens from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Mutagen.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving mutagens."
      });
    });
};

// Find a single Mutagen with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Mutagen.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Mutagen with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Mutagen with id=" + id });
    });
};

// Update a Mutagen by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Mutagen.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Mutagen with id=${id}. Maybe Mutagen was not found!`
        });
      } else res.send({ message: "Mutagen was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Mutagen with id=" + id
      });
    });
};

// Delete a Mutagen with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Mutagen.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Mutagen with id=${id}. Maybe Mutagen was not found!`
        });
      } else {
        res.send({
          message: "Mutagen was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Mutagen with id=" + id
      });
    });
};

// Delete all Mutagens from the database.
exports.deleteAll = (req, res) => {
  Mutagen.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Mutagens were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all mutagens."
      });
    });
};

// Find all published Mutagens
exports.findAllPublished = (req, res) => {
  Mutagen.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving mutagens."
      });
    });
};
