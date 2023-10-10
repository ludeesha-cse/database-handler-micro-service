module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        userID: {type: String, required: true},
        startDate: {type: Date, required: true},
        endDate: {type: Date, required: true},
        location: {type: String, required: true},
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Tour = mongoose.model("Tour", schema);
    return Tour;
  };
  