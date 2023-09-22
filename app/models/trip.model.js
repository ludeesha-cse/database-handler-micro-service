module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        userID: {type: String, required: true},
        collaborative_userID: {type: Array, required: false},
        tripID: {type: String, required: true},
        hotel_id: {type: Array, required: true},
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
  