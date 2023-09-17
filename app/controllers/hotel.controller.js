const db = require("../models");
const Hotel = db.hotel;

// Create and Save a new hotel
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.userID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const userID = req.body.userID;
  const hotel_id = req.body.hotel_id;

  try {
    // Check if a document with the same userID and hotel_id exists
    const existingHotel = await Hotel.findOne({
      userID: userID,
      hotel_id: hotel_id,
    });

    // res.status(200).send({ message: "Duplicate document found" });

    if (existingHotel) {
      res.status(200).send({ message: "Duplicate document found" });
      return;
    }
    // If no duplicate documents are found, create and save the new document
    const hotel = new Hotel({
      userID: userID,
      hotel_id: hotel_id,
      hotel_name: req.body.hotel_name,
      city: req.body.city,
      review_score: req.body.review_score,
      review_score_word: req.body.review_score_word,
      min_total_price: req.body.min_total_price,
      max_photo_url: req.body.max_photo_url,
    });

    const savedHotel = await hotel.save();
    res.status(201).send(savedHotel);
  } catch (err) {
    res.status(500).send({
      message: "Error creating or checking for duplicate documents: " + err.message,
    });
  }
};

//find all hotels with userID
exports.findAllWithUserID = (req, res) => {
  const userID = req.params.userID; // Get the city parameter from the request URL

  Hotel.find({ userID: userID })
    .then(data => {
      if (data.length === 0)
        res.status(404).send({ message: "No hotels found in the city " + city });
      else res.send(data); // Send the retrieved hotel data as a response
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving hotels in the city=" + city });
    });
};

// Retrieve all Hotels from the database.
exports.findAll = (req, res) => {
  const userID = req.query.userID;
  var condition = userID ? { userID: { $regex: new RegExp(userID), $options: "i" } } : {};

  Hotel.find(condition)
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

// Find a single Hotel with an id
exports.findOne = (req, res) => {
  const hotel_id = req.params.hotel_id;

  Hotel.find({ hotel_id: hotel_id})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Hotel with id " + hotel_id});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Hotel with id=" + hotel_id});
    });
};

// Update a Hotel by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Hotel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Hotel with id=${id}. Maybe Hotel was not found!`
        });
      } else res.send({ message: "Hotel was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Hotel with id=" + id
      });
    });
};
                  
// Delete a Hotel with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Hotel.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Hotel with id=${id}. Maybe Hotel was not found!`
        });
      } else {
        res.send({
          message: "Hotel was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Hotel with id=" + id
      });
    });
};

// Delete all Hotels from the database.
exports.deleteAll = (req, res) => {
  Hotel.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Hotels were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Hotels."
      });
    });
};


// {
//   "userID": 121354,
//   "hotel_id": "hotel123",
//   "hotel_name": "Test Hotel",
//   "city": "Test City",
//   "review_score": 4.5,
//   "review_score_word": "Excellent",
//   "min_total_price": 1000,
//   "max_photo_url":" req.body.max_photo_url" 
// }










