module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        userID: {type: String, required: true},
        hotel_id: {type: String, required: true},
        hotel_name: {type: String, required: true},
        city: {type: String, required: true},
        review_score: {type: Number, required: true},
        review_score_word: {type: String, required: true},
        min_total_price: {type: Number, required: true},
        max_photo_url: {type: String, required: true},
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
  