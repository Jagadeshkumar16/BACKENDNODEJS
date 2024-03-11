module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
     type:string
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Cell = mongoose.model("cell", schema);
  return Cell;
};
