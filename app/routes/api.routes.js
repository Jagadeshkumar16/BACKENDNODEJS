module.exports = app => {
  const cell = require("../controllers/cell.controller.js");
  const environment = require("../controllers/environment.controller.js");
  const habitat = require("../controllers/habitat.controller.js");
  const interaction = require("../controllers/interaction.controller.js");
  const mutation = require("../controllers/mutation.controller.js");
  const organism = require("../controllers/organism.controller.js");
  const population = require("../controllers/population.controller.js");
  const predator = require("../controllers/predator.controller.js");
  const resource = require("../controllers/resource.controller.js");
  const weather = require("../controllers/weather.controller.js");
  const user = require("../controllers/user.controller.js");
  

  var router = require("express").Router();

  //cell//
  router.post("/cell/", cell.create);

  router.get("/cell/", cell.findAll);
  
  router.get("/cell/published", cell.findAllPublished);
  
  router.get("/cell/:id", cell.findOne);

  router.put("/cell/:id", cell.update);

  router.delete("/cell/:id", cell.delete);

  router.delete("/cell/", cell.deleteAll);




  //environment//
  router.post("/environment/", environment.create);

  router.get("/environment/", environment.findAll);

  router.get("/environment/published", environment.findAllPublished);

  router.get("/environment/:id", environment.findOne);

  router.put("/environment/:id", environment.update);

  router.delete("/environment/:id", environment.delete);

  router.delete("/environment/", environment.deleteAll);



  
  // habitat
  router.post("/habitat/", habitat.create);

  router.get("/habitat/", habitat.findAll);

  router.get("/habitat/published", habitat.findAllPublished);

  router.get("/habitat/:id", habitat.findOne);

  router.put("/habitat/:id", habitat.update);

  router.delete("/habitat/:id", habitat.delete);

  router.delete("/habitat/", habitat.deleteAll);


  
  // interaction
  router.post("/interaction/", interaction.create);

  router.get("/interaction/", interaction.findAll);

  router.get("/interaction/published", interaction.findAllPublished);

  router.get("/interaction/:id", interaction.findOne);

  router.put("/interaction/:id", interaction.update);

  router.delete("/interaction/:id", interaction.delete);

  router.delete("/interaction/", interaction.deleteAll);


  // mutation
  router.post("/mutation/", mutation.create);

  router.get("/mutation/", mutation.findAll);

  router.get("/mutation/published", mutation.findAllPublished);

  router.get("/mutation/:id", mutation.findOne);

  router.put("/mutation/:id", mutation.update);

  router.delete("/mutation/:id", mutation.delete);

  router.delete("/mutation/", mutation.deleteAll);



    // population
    router.post("/population/", population.create);

    router.get("/population/", population.findAll);
  
    router.get("/population/published", population.findAllPublished);
  
    router.get("/population/:id", population.findOne);
  
    router.put("/population/:id", population.update);
  
    router.delete("/population/:id", population.delete);
  
    router.delete("/population/", population.deleteAll);


      // organism
  router.post("/organism/", organism.create);

  router.get("/organism/", organism.findAll);

  router.get("/organism/published", organism.findAllPublished);

  router.get("/organism/:id", organism.findOne);

  router.put("/organism/:id", organism.update);

  router.delete("/organism/:id", organism.delete);

  router.delete("/organism/", organism.deleteAll);

  router.get("/organismsimulation", organism.simulation);



  // predator
  router.post("/predator/", predator.create);

  router.get("/predator/", predator.findAll);

  router.get("/predator/published", predator.findAllPublished);

  router.get("/predator/:id", predator.findOne);

  router.put("/predator/:id", predator.update);

  router.delete("/predator/:id", predator.delete);

  router.delete("/predator/", predator.deleteAll);


  // weather
  router.post("/weather/", weather.create);

  router.get("/weather/", weather.findAll);

  router.get("/weather/published", weather.findAllPublished);

  router.get("/weather/:id", weather.findOne);

  router.put("/weather/:id", weather.update);

  router.delete("/weather/:id", weather.delete);

  router.delete("/weather/", weather.deleteAll);



  // resource
  router.post("/resource/", resource.create);

  router.get("/resource/", resource.findAll);

  router.get("/resource/published", resource.findAllPublished);

  router.get("/resource/:id", resource.findOne);

  router.put("/resource/:id", resource.update);

  router.delete("/resource/:id", resource.delete);

  router.delete("/resource/", resource.deleteAll);



  router.post("/user/", user.create);

  router.post("/login/", user.login);

  app.use("/api", router);
};
