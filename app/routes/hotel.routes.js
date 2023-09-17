module.exports = app => {
    const hotel = require("../controllers/hotel.controller.js");
  
    var router = require("express").Router();
  
    // Store a new hotel
    router.post("/", hotel.create);

    // Retrieve all hotels
    router.get("/getAllhotels", hotel.findAll);

    // Retrieve all hotels with userID
    router.get("/getAllhotels/:userID", hotel.findAllWithUserID);    
  
    // Retrieve a single hotel with id
    router.get("/:hotel_id", hotel.findOne);
   
     // Update a hotel with id
     router.put("/:id", hotel.update);
   
     // Delete a hotel with id
     router.delete("/delete/:id", hotel.delete);
   
     // Create a new hotel
     router.delete("/", hotel.deleteAll);

 
  
  
    app.use("/api/hotel", router);
  };
  