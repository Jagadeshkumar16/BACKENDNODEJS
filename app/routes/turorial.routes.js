module.exports = app => {
  const weather = require("../controllers/weather.controller.js");
  const weather = require("../controllers/weather.controller.js");
  const weather = require("../controllers/weather.controller.js");
  const weather = require("../controllers/weather.controller.js");
  const weather = require("../controllers/weather.controller.js");
  const weather = require("../controllers/weather.controller.js");
  const weather = require("../controllers/weather.controller.js");
  const weather = require("../controllers/weather.controller.js");
  const weather = require("../controllers/weather.controller.js");
  const weather = require("../controllers/weather.controller.js");
  const weather = require("../controllers/weather.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/weather/", weather.create);

  // Retrieve all Tutorials
  router.get("/weather/", weather.findAll);

  // Retrieve all published Tutorials
  router.get("/weather/published", weather.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/weather/:id", weather.findOne);

  // Update a Tutorial with id
  router.put("/weather/:id", weather.update);

  // Delete a Tutorial with id
  router.delete("/weather/:id", weather.delete);

  // Create a new Tutorial
  router.delete("/weather/", weather.deleteAll);


  // Create a new Tutorial
  router.post("/weather/", weather.create);

  // Retrieve all Tutorials
  router.get("/weather/", weather.findAll);

  // Retrieve all published Tutorials
  router.get("/weather/published", weather.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/weather/:id", weather.findOne);

  // Update a Tutorial with id
  router.put("/weather/:id", weather.update);

  // Delete a Tutorial with id
  router.delete("/weather/:id", weather.delete);

  // Create a new Tutorial
  router.delete("/weather/", weather.deleteAll);

  app.use("/api", router);
};
