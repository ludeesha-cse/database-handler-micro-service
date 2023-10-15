module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        userID: {type: String, required: true},
        collaborative_userID: {type: Array, required: false},
        tripID: {type: String, required: true},
        hotels: {type: Array, required: false}, // array {hotelID,CheckInDate,CheckOutDate,roomCount}
        tripDateRange: {type: Array, required: false},
        tripLocation: {type: String, required: false},
        tripName: {type: String, required: false},
        noOfAdultsAndChildren: {type: Array, required: false},
        ride: {type: Array, required: false}, // array of rides contains rideID,
        placesToVisit: {type: Array, required: false}, // array of places to visit contains locationID
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Trip = mongoose.model("Trips", schema);
    return Trip;
  };
  