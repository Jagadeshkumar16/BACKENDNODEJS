module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      mutationrate:float
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("mutagen", schema);
  return Tutorial;
};
