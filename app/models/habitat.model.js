module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      type:String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Habitat = mongoose.model("habitat", schema);
  return Habitat;
};
