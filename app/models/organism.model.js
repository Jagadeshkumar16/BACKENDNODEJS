module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      species: String,
      age: Number,
      health: String,
      environment: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Organism = mongoose.model("organism", schema);
  return Organism;
};
