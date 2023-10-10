const { hotel } = require("../models/index.js");

module.exports = app => {
    const trip = require("../controllers/trip.controller.js");
  
    var router = require("express").Router();
  
    // Store a new destination
    router.post("/location", tour.create);

    app.use("/api/tour", router);
  };
  