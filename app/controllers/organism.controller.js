const db = require("../models");
const Organism = db.organism;

// Create and Save a new Organism
exports.create = (req, res) => {
  // Validate request
  if (!req.body.species) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const organism = new Organism({
    species: req.body.species,
    age: req.body.age,
    health: req.body.health,
    environment: req.body.environment
  });

  organism
    .save(organism)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Organism."
      });
    });
};

// Retrieve all Organisms from the database.
exports.findAll = (req, res) => {
  console.log("testing");
  const species = req.query.species;
  var condition = species ? { species: { $regex: new RegExp(species), $options: "i" } } : {};

  Organism.find(condition)
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving organisms."
      });
    });
};

// Find a single Organism with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Organism.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Organism with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Organism with id=" + id });
    });
};

// Update a Organism by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Organism.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Oraganism with id=${id}. Maybe Organism was not found!`
        });
      } else res.send({ message: "Organism was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Organism with id=" + id
      });
    });
};

// Delete a Organism with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Organism.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Organism with id=${id}. Maybe Organism was not found!`
        });
      } else {
        res.send({
          message: "Organism was died successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Organism with id=" + id
      });
    });
};
 

exports.simulation = (req, res) => {
  console.log('Simulation');
  const action = req.query.action;

  if (action == 'hunting') {
    var condition = {};
    let st = new Set();
    let deadSpec = [];
    Organism.find(condition)
      .then(data => {
        console.log(data);
        let i = data.length;
        while (st.size < 10) {
          st.add(Math.floor(Math.random() * data.length));
        }
        st.forEach(index => {
          deadSpec.push(data[index].species);
          Organism.findByIdAndRemove(data[index]._id, { useFindAndModify: false })
            .then(deletedData => {
              if (!deletedData) {
                console.log(`Cannot delete Organism with id=${data[index]._id}. Maybe Organism was not found!`);
              } else {
                console.log("Organism was died successfully!");
              }
            })
            .catch(err => {
              console.log(`Could not delete Organism with id=${data[index]._id}`);
            });
        });
        Organism.find({})
          .then(data => {
            console.log(data);
            res.send({ "data": data, "simulated": deadSpec });
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || "Some error occurred while retrieving organisms."
            });
          });
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving organisms."
        });
      });
  } else if (action == 'reproduce') {
    let species = ['Human', 'Lion', 'Giraffee', 'Eagle', 'Pigeon', 'Cell'];
    let reprodSpecies = [];
    while (reprodSpecies.length < 5) {
      reprodSpecies.push(species[Math.floor(Math.random() * species.length)]);
    }
    reprodSpecies.forEach(spec => {
      const organism = new Organism({
        species: spec,
        age: undefined,
        health: undefined,
        environment: undefined
      });

      organism
        .save()
        .then(data => {
          console.log("Organism was created successfully!");
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Organism."
          });
        });
    });

    Organism.find({})
      .then(data => {
        console.log(data);
        res.send({ "data": data, "simulated": reprodSpecies });
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving organisms."
        });
      });
  



exports.simulation = (req, res) => {
  console.log('Simulation');
  const species = req.query.species;
  var condition = species ? { species: { $regex: new RegExp(species), $options: "i" } } : {};
  let recordsToDelete=new Map();
  Organism.find(condition)
    .then(data => {
      console.log(data);
      let i = data.length;
      data.forEach(record=>{
        if(!recordsToDelete.has(record.species)){
          recordsToDelete.set(record.species, record._id);
        }
        i--;
        console.log(i);
        if(i==0){
          console.log(recordsToDelete);
          let mCount = recordsToDelete.size;
          recordsToDelete.forEach((id, spec)=>{
            Organism.findByIdAndRemove(id, { useFindAndModify: false })
            .then(data => {
              if (!data) {
                console.log(`Cannot delete Organism with id=${id}. Maybe Organism was not found!`);
              } else {
                  console.log("Organism was deleted successfully!");
              }
            })
            .catch(err => {
              console.log("Could not delete Organism with id=" + id);
            });
            mCount--;
            if(mCount==0){
              Organism.find({})
              .then(data => {
                console.log(data);
                res.send(data);
              })
              .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while retrieving organisms."
                });
              });
            }
          })
        }
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving organisms."
      });
    });
};

// Delete all Organisms from the database.
exports.deleteAll = (req, res) => {
  Organism.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Organisms were died successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all organisms."
      });
    });
};

// Find all published Organisms
exports.findAllPublished = (req, res) => {
  Organism.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving organisms."
      });
    });
};
  };
};
