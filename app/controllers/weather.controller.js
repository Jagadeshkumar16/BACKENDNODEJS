const db = require("../models");
const Weather = db.weathers;

// Create and Save a new Weather
exports.create = (req, res) => {
  // Validate request
  if (!req.body.weather) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Weather
  const weather = new Weather({
    type:String,
    humidity:Float32Array
  });

  // Save Weather in the database
  weather
    .save(weather)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Weather."
      });
    });
};

// Retrieve all Weathers from the database.
exports.findAll = (req, res) => {
  const weather = req.query.weather;
  var condition = weather ? { weather: { $regex: new RegExp(weather), $options: "i" } } : {};

  Weather.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving weathers."
      });
    });
};

// Find a single Weather with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Weather.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Weather with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Weather with id=" + id });
    });
};

// Update a Weather by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Weather.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Weather with id=${id}. Maybe Weather was not found!`
        });
      } else res.send({ message: "Weather was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Weather with id=" + id
      });
    });
};

// Delete a Weather with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Weather.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Weather with id=${id}. Maybe Weather was not found!`
        });
      } else {
        res.send({
          message: "Weather was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Weather with id=" + id
      });
    });
};

// Delete all Weathers from the database.
exports.deleteAll = (req, res) => {
  Weather.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Weathers were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all weathers."
      });
    });
};

// Find all published Weathers
exports.findAllPublished = (req, res) => {
  Weather.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving weathers."
      });
    });
};
