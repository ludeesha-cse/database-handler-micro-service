const dbConfig = require("../config/db.config.js");  // imports the database configuration
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.trip = require("./trip.model.js")(mongoose);
db.hotel = require("./hotel.model.js")(mongoose);
// db.tour = require("./tour.model.js")(mongoose);

module.exports = db;
