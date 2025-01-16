const db = require("../models");
const Cell = db.cells;
const User = db.users;

// Create and Save a new Cell
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Cell
  const Cell = new Cell({
    type:string
  });

  // Save Cell in the database
  Cell
    .save(Cell)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cell."
      });
    });
};

// Retrieve all Cells from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Cell.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cells."
      });
    });
};

// Find a single Cell with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cell.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Cell with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Cell with id=" + id });
    });
};

// Update a Cell by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Cell.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Cell with id=${id}. Maybe Cell was not found!`
        });
      } else res.send({ message: "Cell was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Cell with id=" + id
      });
    });
};

// Delete a Cell with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cell.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Cell with id=${id}. Maybe Cell was not found!`
        });
      } else {
        res.send({
          message: "Cell was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cell with id=" + id
      });
    });
};

// Delete all Cells from the database.
exports.deleteAll = (req, res) => {
  Cell.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Cells were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cells."
      });
    });
};

// Find all published Cells
exports.findAllPublished = (req, res) => {
  Cell.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cells."
      });
    });
};
