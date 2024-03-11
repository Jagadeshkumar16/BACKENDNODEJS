module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      speciespopulation: Number,
      
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Population = mongoose.model("population", schema);
  return Population;
};
