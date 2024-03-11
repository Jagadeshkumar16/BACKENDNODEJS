module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      huntsuccessrate: Number,
      
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Predator = mongoose.model("predator", schema);
  return Predator;
};
