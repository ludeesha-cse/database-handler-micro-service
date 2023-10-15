const db = require("../models");
const Trip = db.trip;
const {createHotel} = require("./hotel.controller.js");

// Create and Save a new trip
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.userID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const userID = req.body.userID;
  const tripID = req.body.tripID;
  

  try {
    // Check if a document with the same userID and trip_id exists
    const existingTrip = await Trip.findOne({
      userID: userID,
      tripID: tripID,
    });

    // res.status(200).send({ message: "Duplicate document found" });

    if (existingTrip ) {
      res.status(200).send({ message: "This trip is already added" });
      return;
    }
    // If no duplicate documents are found, create and save the new document
    const trip = new Trip({
      userID: userID,
      collaborative_userID: req.body.collaborative_userID,
      tripID: tripID,
      hotel_id: Hotel_id,
    });

    const savedTrip = await trip.save();
    createHotel(req, res);
    res.status(201).send(savedTrip);
  } catch (err) {
    res.status(500).send({
      message: "Error creating or checking for duplicate documents: " + err.message,
    });
  }
};

//find all trips with userID
exports.findAllWithUserID = (req, res) => {
  const userID = req.params.userID; // Get the city parameter from the request URL

  Trip.find({ userID: userID })
    .then(data => {
      if (data.length === 0)
        res.status(404).send({ message: "No trips found in the city " + city });
      else res.send(data); // Send the retrieved trip data as a response
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving trips in the city=" + city });
    });
};

// Retrieve all Trip from the database.
exports.findAll = (req, res) => {
  const userID = req.query.userID;
  var condition = userID ? { userID: { $regex: new RegExp(userID), $options: "i" } } : {};

  Trip.find(condition)
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

// Find a single trip with an id
exports.findOne = (req, res) => {
  const tripID = req.params.tripID;

  Trip.find({ tripID: tripID})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found trip with id " + tripID});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving trip with id=" + tripID});
    });
};

// Update a trip by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Trip.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update trip with id=${id}. Maybe trip was not found!`
        });
      } else res.send({ message: "trip was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating trip with id=" + id
      });
    });
};
                  
// Delete a trip with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Trip.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete trip with id=${id}. Maybe trip was not found!`
        });
      } else {
        res.send({
          message: "trip was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete trip with id=" + id
      });
    });
};

// Delete all trips from the database.
exports.deleteAll = (req, res) => {
  Trip.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} trips were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all trips."
      });
    });
};


// {
//   "userID": 121354,
//   "tripID": 123456,
//   "collaborative_userID": 123456,
//   "hotel_id": ["hotel123","awnd"],
// }










