const db = require("../models");
const Population = db.populations;

// Create and Save a new Population
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Population
  const population = new Population({
    population: req.body.population,
  });

  // Save Population in the database
  population
    .save(population)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Population."
      });
    });
};

// Retrieve all Populations from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Population.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving populations."
      });
    });
};

// Find a single Population with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Population.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Population with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Population with id=" + id });
    });
};

// Update a Population by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Population.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Population with id=${id}. Maybe Population was not found!`
        });
      } else res.send({ message: "Population was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Population with id=" + id
      });
    });
};

// Delete a Population with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Population.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Population with id=${id}. Maybe Population was not found!`
        });
      } else {
        res.send({
          message: "Population was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Population with id=" + id
      });
    });
};

// Delete all Populations from the database.
exports.deleteAll = (req, res) => {
  Population.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Populations were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all populations."
      });
    });
};

// Find all published Populations
exports.findAllPublished = (req, res) => {
  Population.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving populations."
      });
    });
};
