module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      interactionmatrix: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Interaction = mongoose.model("interaction", schema);
  return Interaction;
};
