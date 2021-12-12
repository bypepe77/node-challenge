const mongoose = require("mongoose");
const { Schema } = mongoose;
const ListSchema = new Schema(
  {
    name: { type: String },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: "Movie"
    }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
const List = mongoose.model("List", ListSchema);

module.exports = List;
