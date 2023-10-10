const db = require("../models");
const Tour = db.tour;

// Create and Save a new hotel
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.userID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const userID = req.body.userID;
  const tripID = req.body.tripID;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const location = req.body.location;

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
    const hotel = new Tour({
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










