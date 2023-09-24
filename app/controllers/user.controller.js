const db = require("../models");
const User = db.user;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    _id: req.body.userID,
    token: req.body.token,
    address: req.body.address,
    userFirstName: req.body.userFirstName,
    userSecondName: req.body.userSecondName,
    userPhoto: req.body.userPhoto,
    age: req.body.age,
    email : req.body.email,
    
  });

  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

  // check if the request comes from an adimin account

  //    
  const userID = req.query.userID;
  var condition = userID ? { userID: { $regex: new RegExp(userID), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {

  // check if the request comes from an adimin account or from the owner of the account
  const token = req.body.token;
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else {
        if(data.token != req.body.token){ 
          res.status(404).send({ message: "User with " + id + "does not have accecc to this" });
          return;
        } // check if the token is the same
        else{res.send(data);}
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {

  // check if the request comes from an adimin account or from the owner of the account


  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {

  // check if the request comes from an adimin account or from the owner of the account

  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {

  // check if the request comes from an adimin account

  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};


exports.updateToken = (req, res) => {
  
    // check if the request comes from an adimin account or from the owner of the account
  
    if (!req.body.userID) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    const userID = req.body.userID;
    const token = req.body.token;

    
  }