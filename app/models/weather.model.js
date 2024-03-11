module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
     type:String,
     humidity:Float32Array
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Weather = mongoose.model("weather", schema);
  return Weather;
};
