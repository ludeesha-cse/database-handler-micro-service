module.exports = mongoose => {
    var schema = mongoose.Schema(
      { 
        userID: {type: String, required: true},
        hotel_id: {type: String, required: true},
        checkInOutDates: {type: Array, required: true},
        room_no: {type: Number, required: true},
        hotel_name: {type: String, required: false},
        review_score: {type: Number, required: false},
        min_total_price: {type: Number, required: false},
        
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Hotel = mongoose.model("Hotels", schema);
    return Hotel;
  };
  