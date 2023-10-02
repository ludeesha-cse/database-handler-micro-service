module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        _id: {type: String, required: true},
        token: {type: String, required: true},
        userFirstName: {type: String, required: true},
        userSecondName: {type: String, required: true},
        age:{type:Number, required: true},
        email:{type: String, required: true, unique: true},
        address:{type: String, required: false},
        userPhoto:{type: String, required: false},

      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id,...object } = this.toObject();
      object.id = _id;
      return object;
    });

    const User = mongoose.model("user", schema);
    return User;
  };
  