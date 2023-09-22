const { hotel } = require("../models/index.js");

module.exports = app => {
    const trip = require("../controllers/trip.controller.js");
  
    var router = require("express").Router();
  
    // Store a new trip
    router.post("/", trip.create);

    // Retrieve all trips
    router.get("/getAlltrips", trip.findAll);

    // Retrieve all trips with userID
    router.get("/getAlltrips/:userID", trip.findAllWithUserID);    
  
    // Retrieve a single trip with id
    router.get("/:trip_id", trip.findOne);
   
     // Update a trip with id
     router.put("/:id", trip.update);
   
     // Delete a trip with id
     router.delete("/delete/:id", trip.delete);
   
     // Create a new trip
     router.delete("/", trip.deleteAll);

 
  
  
    app.use("/api/trip", router);
  };
  