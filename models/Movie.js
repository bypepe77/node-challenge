const mongoose = require("mongoose");
const { Schema } = mongoose;
const MovieSchema = new Schema(
  {
    title: { type: String },
    director: { type: String },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
