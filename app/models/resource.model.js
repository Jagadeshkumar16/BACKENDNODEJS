module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      type: String,
      quantity: Number,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Resource = mongoose.model("resource", schema);
  return Resource;
};
